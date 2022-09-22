import { CustomerService } from '@/bounded-contexts/customer-credits/customers/application/CustomerService'
import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'
import { CustomerToShow } from '@/bounded-contexts/customer-credits/customers/domain/CustomerRepository'
import { CustomerAlreadyExists } from '@/bounded-contexts/customer-credits/customers/domain/exceptions/CustomerAlreadyExists'
import { CustomerAvailableAmountOfCredit } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerAvailableAmountOfCredit'

import { CustomerMotherCreator } from '../domain/CustomerMotherCreator'
import { CustomerMockRepository } from '../infraestructure/__mocks__/CustomerMockRepository'

describe('Customer Service', () => {
  const repository = new CustomerMockRepository()
  const customerService = new CustomerService(repository)

  it('Agregando un Customer', async () => {
    const customer = CustomerMotherCreator.random()
    await customerService.create(customer)

    const customerCount = (await customerService.all()).length

    expect(customerCount).toBe(1)
  })

  it('Agregando un Customer y posteriormente actualizarlo', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    const newCustomerName = CustomerMotherCreator.customerNameRandom()
    const customerWithUpdates = Customer.buildFromPrimitives({
      id: customer.customerId.value,
      dni: customer.dni.value,
      names: newCustomerName.value,
      lastnames: customer.lastnames.value,
      ageDate: customer.ageDate.value,
      email: customer.email.value,
      phone: customer.phone.value,
      income: customer.income.value,
      amountAvailableOfCredit: customer.amountAvailableOfCredit.value
    })

    await customerService.update(customerWithUpdates)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected?.names.value).toBe(newCustomerName.value)
  })

  it('Agregando un Customer y posteriormente seleccionarlo', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected).toBeDefined()
  })

  it('Agregando un Customer y posteriormente eliminándolo', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    await customerService.remove(customerId)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected).toBeNull()
  })

  it('Agregando un Customer y posteriormente habilitar un monto de crédito', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    const newAmount = CustomerMotherCreator.customerAmountRandom()

    await customerService.addAmountOfCredit(customerId, newAmount)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected?.amountAvailableOfCredit.value).toBe(newAmount.value)
  })

  it('Seleccionando todos los Customers', async () => {
    const customers = await customerService.all()

    expect(customers.length).toBeGreaterThan(0)
  })

  it('Agregando Customer y habilitar crédito de 10, 000', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    const newAmount = new CustomerAvailableAmountOfCredit(10000)

    await customerService.addAmountOfCredit(customerId, newAmount)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected?.amountAvailableOfCredit.value).toBe(newAmount.value)
  })

  it('Agregando Customer y actualizar crédito a 0', async () => {
    const customer = CustomerMotherCreator.random()
    const customerId = customer.customerId
    await customerService.create(customer)

    const newAmount = new CustomerAvailableAmountOfCredit(0)

    await customerService.addAmountOfCredit(customerId, newAmount)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected?.amountAvailableOfCredit.value).toBe(newAmount.value)
  })

  it('Seleccionando todos los Customers con crédito', async () => {
    const customers = await customerService.all(CustomerToShow.onlyWithCredit)

    expect(customers.length).toBeGreaterThanOrEqual(1)
  })

  it('Seleccionando todos los Customers sin crédito', async () => {
    const customers = await customerService.all(CustomerToShow.onlyWithoutCredit)

    expect(customers.length).toBeGreaterThanOrEqual(1)
  })

  it('Validar que un Customer con DNI ya existente no pueda ser creado', async () => {
    const customer = CustomerMotherCreator.random()
    const customerDni = customer.dni
    await customerService.create(customer)

    const newCustomerWithTheSameDNI = new Customer({
      customerId: CustomerMotherCreator.customerIdRandom(),
      dni: customerDni,
      names: CustomerMotherCreator.customerNameRandom(),
      lastnames: CustomerMotherCreator.customerNameRandom(),
      ageDate: CustomerMotherCreator.customerAgeDateRandom(),
      email: CustomerMotherCreator.customerEmailRandom(),
      phone: CustomerMotherCreator.customerPhoneRandom(),
      income: CustomerMotherCreator.customerIncomeRandom(),
      amountAvailableOfCredit: CustomerMotherCreator.customerAmountRandom()
    })

    try {
      await customerService.create(newCustomerWithTheSameDNI)
      throw new Error('Se ha creado un Customer con DNI existente')
    } catch (error) {
      expect(error).toBeInstanceOf(CustomerAlreadyExists)
    }
  })
})
