import { CustomerCreditEnabled } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerCreditEnabled'
import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { Customer } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/Customer'
import {
  CustomerRepository,
  CustomerToShow
} from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/CustomerRepository'
import { CustomerDni } from '../../../../../../src/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDni'
import { CustomerId } from '../../../../../../src/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'

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
      case CustomerToShow.onlyWithCredit: {
        const customersWithCredit = this.customers.filter((customer) => customer.creditEnabled.value)
        return customersWithCredit
      }
      case CustomerToShow.onlyWithoutCredit: {
        const customersWithoutCredit = this.customers.filter((customer) => !customer.creditEnabled.value)
        return customersWithoutCredit
      }
      case CustomerToShow.all:
      default:
        return this.customers
    }
  }

  async enableCreditToCustomer(customerId: CustomerId, enabled: CustomerCreditEnabled): Promise<void> {
    const customerIndex = this.customers.findIndex((customer) => customer.customerId.equalTo(customerId))
    if (customerIndex < 0) return

    const customerUpdated = new Customer({
      ...this.customers[customerIndex],
      creditEnabled: enabled
    })

    this.customers[customerIndex] = customerUpdated
  }
}
