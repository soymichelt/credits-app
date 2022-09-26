import { Nullable } from '@/bounded-contexts/shared/domain/nullable'
import { MongoRepository } from '@/bounded-contexts/shared/infraestructure/BaseMongoRepository'

import { CustomerCreditEnabled } from '../../shared/domain/value-objects/CustomerCreditEnabled'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Customer } from '../domain/Customer'
import { CustomerRepository, CustomerToShow } from '../domain/CustomerRepository'
import { CustomerDni } from '../domain/value-objects/CustomerDni'

export class CustomerMongoRepository extends MongoRepository<Customer> implements CustomerRepository {
  async create(customer: Customer): Promise<void> {
    await this.save(customer.customerId.value, customer)
  }

  async update(customer: Customer): Promise<void> {
    const customerDoc = await this.select(customer.customerId)
    if (!customerDoc) return
    const customerToUpdate = Customer.buildFromPrimitives({
      ...(customerDoc?.toPrimitive() || {}),
      ...customer.toPrimitive()
    })

    await this.save(customer.customerId.value, customerToUpdate)
  }

  async remove(customerId: CustomerId): Promise<void> {
    const collection = await this.collection()
    await collection.findOneAndDelete({ _id: customerId.value })
  }

  async select(customerId: CustomerId): Promise<Nullable<Customer>> {
    const collection = await this.collection()
    const document = await collection.findOne({ _id: customerId.value })

    if (!document) {
      return null
    }

    return Customer.buildFromPrimitives({
      id: customerId.value,
      dni: document.dni,
      names: document.names,
      lastnames: document.lastnames,
      ageDate: document.ageDate,
      email: document.email,
      phone: document.phone,
      income: document.income ?? 0,
      creditEnabled: document.creditEnabled
    })
  }

  async selectByDni(dni: CustomerDni): Promise<Nullable<Customer>> {
    const collection = await this.collection()
    const document = await collection.findOne({ dni: dni.value })

    if (!document) {
      return null
    }

    return Customer.buildFromPrimitives({
      id: document._id.toString(),
      dni: dni.value,
      names: document.names,
      lastnames: document.lastnames,
      ageDate: document.ageDate,
      email: document.email,
      phone: document.phone,
      income: document.income ?? 0,
      creditEnabled: document.creditEnabled
    })
  }

  async all(filter?: CustomerToShow): Promise<Customer[]> {
    const collection = await this.collection()

    let filterExpression = {}
    switch (filter) {
      case CustomerToShow.onlyWithCredit: {
        filterExpression = { creditEnabled: true }
        break
      }
      case CustomerToShow.onlyWithoutCredit: {
        filterExpression = { creditEnabled: false }
        break
      }
    }
    const customersDocs = await collection.find(filterExpression).toArray()

    const customers: Customer[] = []

    customersDocs.forEach((document) => {
      const customer = Customer.buildFromPrimitives({
        id: document._id.toString(),
        dni: document.dni,
        names: document.names,
        lastnames: document.lastnames,
        ageDate: document.ageDate,
        email: document.email,
        phone: document.phone,
        income: document.income ?? 0,
        creditEnabled: document.creditEnabled
      })
      customers.push(customer)
    })

    return customers
  }

  async enableCreditToCustomer(customerId: CustomerId, enabled: CustomerCreditEnabled): Promise<void> {
    const collection = await this.collection()
    await collection.updateOne({ _id: customerId.value }, { $set: { creditEnabled: enabled.value } })
  }

  protected moduleName(): string {
    return 'customers'
  }
}
