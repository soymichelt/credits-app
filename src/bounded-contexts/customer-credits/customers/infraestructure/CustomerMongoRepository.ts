import { Nullable } from '@/bounded-contexts/shared/domain/nullable'
import { MongoRepository } from '@/bounded-contexts/shared/infraestructure/BaseMongoRepository'

import { Customer } from '../domain/Customer'
import { CustomerRepository, CustomerToShow } from '../domain/CustomerRepository'
import { CustomerAvailableAmountOfCredit } from '../domain/value-objects/CustomerAvailableAmountOfCredit'
import { CustomerDni } from '../domain/value-objects/CustomerDni'
import { CustomerId } from '../domain/value-objects/CustomerId'

export class CustomerMongoRepository extends MongoRepository<Customer> implements CustomerRepository {
  protected moduleName(): string {
    return 'customers'
  }

  async create(customer: Customer): Promise<void> {
    await this.save(customer.customerId.value, customer)
  }

  async update(customer: Customer): Promise<void> {
    const customerDoc = await this.select(customer.customerId)
    if (!customerDoc) return
    const customerToUpdate = Customer.buildFromPrimitives({
      ...(customerDoc?.toPrimitive() || {}),
      ...customer.toPrimitive(),
      amountAvailableOfCredit: customerDoc?.amountAvailableOfCredit.value || 0
    })

    await this.save(customer.customerId.value, customerToUpdate)
  }

  async addAmountOfCredit(customerId: CustomerId, amount: CustomerAvailableAmountOfCredit): Promise<void> {
    const customerDoc = await this.select(customerId)
    if (!customerDoc) return
    const customerToUpdate = Customer.buildFromPrimitives({
      ...customerDoc.toPrimitive(),
      amountAvailableOfCredit: amount.value
    })

    await this.save(customerId.value, customerToUpdate)
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
      amountAvailableOfCredit: document.amountAvailableOfCredit ?? 0
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
      amountAvailableOfCredit: document.amountAvailableOfCredit ?? 0
    })
  }

  async all(filter?: CustomerToShow): Promise<Customer[]> {
    const collection = await this.collection()

    let filterExpression = {}
    switch (filter) {
      case CustomerToShow.onlyWithCredit: {
        filterExpression = { amountAvailableOfCredit: { $gt: 0 } }
        break
      }
      case CustomerToShow.onlyWithoutCredit: {
        filterExpression = { amountAvailableOfCredit: { $eq: 0 } }
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
        amountAvailableOfCredit: document.amountAvailableOfCredit ?? 0
      })
      customers.push(customer)
    })

    return customers
  }
}
