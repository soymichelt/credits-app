import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { Customer } from '../domain/Customer'
import { CustomerRepository, CustomerToShow } from '../domain/CustomerRepository'
import { CustomerAlreadyExists } from '../domain/exceptions/CustomerAlreadyExists'
import { CustomerNotExists } from '../domain/exceptions/CustomerNotExists'
import { CustomerAvailableAmountOfCredit } from '../domain/value-objects/CustomerAvailableAmountOfCredit'
import { CustomerId } from '../domain/value-objects/CustomerId'

export class CustomerService {
  private repository: CustomerRepository

  constructor(repository: CustomerRepository) {
    this.repository = repository
  }

  async create(customer: Customer): Promise<void> {
    const customerByDni = await this.repository.selectByDni(customer.dni)
    if (customerByDni) {
      throw new CustomerAlreadyExists(customer.dni.value)
    }
    await this.repository.create(customer)
  }

  async update(customer: Customer): Promise<void> {
    const customerById = await this.repository.select(customer.customerId)
    if (!customerById) {
      throw new CustomerNotExists(customer.customerId.value)
    }

    await this.repository.update(customer)
  }

  async addAmountOfCredit(customerId: CustomerId, amount: CustomerAvailableAmountOfCredit) {
    const customerById = await this.select(customerId)
    if (!customerById) {
      throw new CustomerNotExists(customerId.value)
    }

    await this.repository.addAmountOfCredit(customerId, amount)
  }

  async remove(customerId: CustomerId): Promise<void> {
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
