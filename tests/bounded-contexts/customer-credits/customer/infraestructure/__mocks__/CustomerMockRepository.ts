import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { Customer } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/Customer'
import {
  CustomerRepository,
  CustomerToShow
} from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/CustomerRepository'
import { CustomerAvailableAmountOfCredit } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerAvailableAmountOfCredit'
import { CustomerDni } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDni'
import { CustomerId } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerId'

export class CustomerMockRepository implements CustomerRepository {
  private customers: Array<Customer> = []

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer)
  }

  async update(customerUpdated: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((customer) => {
      return customer.customerId.value === customerUpdated.customerId.value
    })

    this.customers[customerIndex] = customerUpdated
  }

  async addAmountOfCredit(customerId: CustomerId, amount: CustomerAvailableAmountOfCredit): Promise<void> {
    const customerIndex = this.customers.findIndex((customer) => {
      return customer.customerId.value === customerId.value
    })

    const customerUpdated: Customer = new Customer({
      ...this.customers[customerIndex],
      amountAvailableOfCredit: amount
    })

    this.customers[customerIndex] = customerUpdated
  }

  async remove(customerId: CustomerId): Promise<void> {
    this.customers = this.customers.filter((customer) => {
      return customer.customerId.value !== customerId.value
    })
  }

  async select(customerId: CustomerId): Promise<Nullable<Customer>> {
    const customer =
      this.customers.find((customer) => {
        return customer.customerId.value === customerId.value
      }) || null
    return customer
  }

  async selectByDni(customerDni: CustomerDni): Promise<Nullable<Customer>> {
    const customer =
      this.customers.find((customer) => {
        return customer.dni.value === customerDni.value
      }) || null
    return customer
  }

  async all(filter?: CustomerToShow): Promise<Customer[]> {
    switch (filter) {
      case CustomerToShow.all:
        return this.customers
      case CustomerToShow.onlyWithCredit: {
        return this.customers.filter((customer) => {
          return customer.amountAvailableOfCredit.value > 0
        })
      }
      case CustomerToShow.onlyWithoutCredit: {
        return this.customers.filter((customer) => {
          return customer.amountAvailableOfCredit.value === 0
        })
      }
      default:
        return this.customers
    }
  }
}
