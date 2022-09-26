import { CreditService } from '@/bounded-contexts/customer-credits/credits/application/CreditService'
import { CustomerService } from '@/bounded-contexts/customer-credits/customers/application/CustomerService'
import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'
import { CustomerToShow } from '@/bounded-contexts/customer-credits/customers/domain/CustomerRepository'
import { CustomerAlreadyExists } from '@/bounded-contexts/customer-credits/customers/domain/exceptions/CustomerAlreadyExists'

import { CreditMotherCreator } from '../../credits/domain/CreditMotherCreator'
import { CustomerCreditEnabledMotherCreator } from '../../shared/domain/CustomerCreditEnabledMotherCreator'
import { UnitOfWorkMock } from '../../shared/infrastructure/__mocks__/UnitOfWorkMock'
import { CustomerMotherCreator } from '../domain/CustomerMotherCreator'

describe('Customer Service', () => {
  let customerService: CustomerService
  let creditService: CreditService

  beforeAll(() => {
    const unitOfWork = new UnitOfWorkMock()
    customerService = new CustomerService(unitOfWork)
    creditService = new CreditService(unitOfWork)
  })

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
      income: customer.income.value
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

    const newCredit = CreditMotherCreator.random(customerId)
    await creditService.create(newCredit)

    const customerSelected = await customerService.select(customerId)

    expect(customerSelected?.creditEnabled.value).toBeTruthy()
  })

  it('Seleccionando todos los Customers', async () => {
    const customers = await customerService.all()

    expect(customers.length).toBeGreaterThan(0)
  })

  it('Creando customer sin crédito, habilitando crédito y seleccionando todos los Customers con crédito', async () => {
    const newCustomerWithoutCredit = CustomerMotherCreator.random()
    await customerService.create(newCustomerWithoutCredit)
    const creditForNewCustomer = CreditMotherCreator.random(newCustomerWithoutCredit.customerId)
    await creditService.create(creditForNewCustomer)

    const customers = await customerService.all(CustomerToShow.onlyWithCredit)

    expect(customers.length).toBeGreaterThanOrEqual(1)
  })

  it('Creando customer sin crédito y seleccionando todos los Customers sin crédito', async () => {
    const newCustomerWithoutCredit = CustomerMotherCreator.random()
    await customerService.create(newCustomerWithoutCredit)

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
      creditEnabled: CustomerCreditEnabledMotherCreator.random()
    })

    try {
      await customerService.create(newCustomerWithTheSameDNI)
      throw new Error('Se ha creado un Customer con DNI existente')
    } catch (error) {
      expect(error).toBeInstanceOf(CustomerAlreadyExists)
    }
  })
})
