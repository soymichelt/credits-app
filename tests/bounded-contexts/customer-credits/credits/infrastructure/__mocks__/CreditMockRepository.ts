import { Credit } from '@/bounded-contexts/customer-credits/credits/domain/Credit'
import { CreditRepository } from '@/bounded-contexts/customer-credits/credits/domain/CreditRepository'
import { CreditDate } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditDate'
import { CreditId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CreditId'
import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'
import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

export class CreditMockRepository implements CreditRepository {
  private credits: Array<Credit> = []

  async create(credit: Credit): Promise<void> {
    this.credits.push(credit)
  }

  async update(creditUpdated: Credit): Promise<void> {
    const creditIndex = this.credits.findIndex((credit) => credit.creditId.equalTo(creditUpdated.creditId))

    this.credits[creditIndex] = creditUpdated
  }

  async remove(creditId: CreditId): Promise<void> {
    this.credits = this.credits.filter((credit) => {
      return !credit.creditId.equalTo(creditId)
    })
  }

  async select(creditId: CreditId): Promise<Nullable<Credit>> {
    const credit =
      this.credits.find((credit) => {
        return credit.creditId.equalTo(creditId)
      }) || null
    return credit
  }

  async all(customerId: CustomerId): Promise<Credit[]> {
    const creditsByCustomerId = this.credits.filter((credit) => {
      return credit.customerId.equalTo(customerId)
    })

    return creditsByCustomerId
  }

  async allByDateRange(start: CreditDate, end: CreditDate): Promise<Credit[]> {
    const creditsFiltered = this.credits.filter((credit) => {
      const dateValue = credit.date.value
      return dateValue >= start.value && dateValue <= end.value
    })

    return creditsFiltered
  }
}
