import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { IUnitOfWork } from '../../shared/domain/IUnitOfWork'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Customer } from '../domain/Customer'
import { CustomerRepository, CustomerToShow } from '../domain/CustomerRepository'
import { CustomerAlreadyExists } from '../domain/exceptions/CustomerAlreadyExists'
import { CustomerIdAlreadyExists } from '../domain/exceptions/CustomerIdAlreadyExists'
import { CustomerNotExists } from '../domain/exceptions/CustomerNotExists'
import { CustomerToDeleteContainsCredits } from '../domain/exceptions/CustomerToDeleteContainsCredits'

export class CustomerService {
  private unitOfWork: IUnitOfWork
  private repository: CustomerRepository

  constructor(unitOfWork: IUnitOfWork) {
    this.unitOfWork = unitOfWork
    this.repository = this.unitOfWork.customerRepository
  }

  async create(customer: Customer): Promise<void> {
    const customerById = await this.repository.select(customer.customerId)
    if (customerById) {
      throw new CustomerIdAlreadyExists(customer.customerId.value)
    }
    const customerByDni = await this.repository.selectByDni(customer.dni)
    if (customerByDni) {
      throw new CustomerAlreadyExists(customer.dni.value)
    }
    const customerWithoutCreditEnabled = Customer.buildFromPrimitives({
      ...customer.toPrimitive(),
      creditEnabled: false
    })
    await this.repository.create(customerWithoutCreditEnabled)
  }

  async update(customer: Customer): Promise<void> {
    const customerById = await this.repository.select(customer.customerId)
    if (!customerById) {
      throw new CustomerNotExists(customer.customerId.value)
    }

    const customerWithoutCreditEnabled = Customer.buildFromPrimitives({
      ...customer.toPrimitive(),
      creditEnabled: customerById.creditEnabled.value
    })

    await this.repository.update(customerWithoutCreditEnabled)
  }

  async remove(customerId: CustomerId): Promise<void> {
    const credits = await this.unitOfWork.creditRepository.all(customerId)
    if (credits.length > 0) {
      throw new CustomerToDeleteContainsCredits(customerId.value)
    }

    await this.repository.remove(customerId)
  }

  async select(customerId: CustomerId): Promise<Nullable<Customer>> {
    const customer = await this.repository.select(customerId)
    return customer
  }

  async all(filter: CustomerToShow = CustomerToShow.all): Promise<Array<Customer>> {
    const customers = await this.repository.all(filter)
    return customers
  }
}
