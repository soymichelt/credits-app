import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { IUnitOfWork } from '../../shared/domain/IUnitOfWork'
import { CreditId } from '../../shared/domain/value-objects/CreditId'
import { CustomerCreditEnabled } from '../../shared/domain/value-objects/CustomerCreditEnabled'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Credit } from '../domain/Credit'
import { CreditRepository } from '../domain/CreditRepository'
import { CustomerCreditNotExists } from '../domain/exceptions/CustomerCreditNotExists'
import { CreditAmount } from '../domain/value-objects/CreditAvailableAmountOfCredit'
import { CreditDate } from '../domain/value-objects/CreditDate'

export class CreditService {
  private unitOfWork: IUnitOfWork
  private repository: CreditRepository

  constructor(unitOfWork: IUnitOfWork) {
    this.unitOfWork = unitOfWork
    this.repository = unitOfWork.creditRepository
  }

  async create(credit: Credit): Promise<void> {
    const customer = await this.unitOfWork.customerRepository.select(credit.customerId)
    if (!customer) {
      throw new CustomerCreditNotExists()
    }

    const customerEnabled = new CustomerCreditEnabled(true)

    await this.unitOfWork.customerRepository.enableCreditToCustomer(credit.customerId, customerEnabled)

    await this.repository.create(credit)
  }

  async remove(creditId: CreditId): Promise<void> {
    const credit = await this.repository.select(creditId)
    if (!credit) return

    const creditsForThisCustomer = await this.repository.all(credit.customerId)
    if (creditsForThisCustomer.length <= 1) {
      const creditDisabled = new CustomerCreditEnabled(false)
      await this.unitOfWork.customerRepository.enableCreditToCustomer(credit.customerId, creditDisabled)
    }

    await this.repository.remove(creditId)
  }

  async update(creditId: CreditId, amount: CreditAmount): Promise<void> {
    const credit = await this.repository.select(creditId)
    if (!credit) {
      throw new Error('')
    }

    const creditWithChanges = Credit.buildFromPrimitives({
      ...credit?.toPrimitive(),
      amount: amount.value
    })
    await this.repository.update(creditWithChanges)
  }

  async select(creditId: CreditId): Promise<Nullable<Credit>> {
    const credit = await this.repository.select(creditId)
    return credit
  }

  async all(customerId: CustomerId): Promise<Array<Credit>> {
    const credits = await this.repository.all(customerId)
    return credits
  }

  async allByDateRange(start: CreditDate, end: CreditDate): Promise<Array<Credit>> {
    const credits = await this.repository.allByDateRange(start, end)
    return credits
  }
}
