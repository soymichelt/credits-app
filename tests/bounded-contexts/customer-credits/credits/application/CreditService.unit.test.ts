import { CreditService } from '@/bounded-contexts/customer-credits/credits/application/CreditService'
import { CustomerService } from '@/bounded-contexts/customer-credits/customers/application/CustomerService'
import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'

import { CustomerMotherCreator } from '../../customer/domain/CustomerMotherCreator'
import { CreditAmountMotherCreator } from '../../shared/domain/CreditAmountMotherCreator'
import { UnitOfWorkMock } from '../../shared/infrastructure/__mocks__/UnitOfWorkMock'
import { CreditMotherCreator } from '../domain/CreditMotherCreator'

describe('Credit Service', () => {
  let customerService: CustomerService
  let creditService: CreditService

  let myCustomer: Customer

  beforeAll(() => {
    const unitOfWork = new UnitOfWorkMock()
    customerService = new CustomerService(unitOfWork)
    creditService = new CreditService(unitOfWork)

    myCustomer = CustomerMotherCreator.random()
    customerService.create(myCustomer)
  })

  it('Creando y buscando crédito de un cliente', async () => {
    const customerId = myCustomer.customerId
    const credit = CreditMotherCreator.random(customerId)

    await creditService.create(credit)

    const creditSelected = await creditService.select(credit.creditId)

    expect(creditSelected).toBeDefined()
    expect(creditSelected?.creditId.value).toBe(credit.creditId.value)
    expect(creditSelected?.date.value).toBe(credit.date.value)
    expect(creditSelected?.customerId.value).toBe(customerId.value)
    expect(creditSelected?.amount.value).toBe(credit.amount.value)
  })

  it('Creando crédito y actualizando monto', async () => {
    const customerId = myCustomer.customerId
    const credit = CreditMotherCreator.random(customerId)
    await creditService.create(credit)

    const newCreditAmount = CreditAmountMotherCreator.random()
    await creditService.update(credit.creditId, newCreditAmount)

    const creditSelected = await creditService.select(credit.creditId)

    expect(creditSelected?.amount.value).toBe(newCreditAmount.value)
  })

  it('Creando y removiendo  crédito', async () => {
    const customerId = myCustomer.customerId
    const credit = CreditMotherCreator.random(customerId)
    await creditService.create(credit)

    await creditService.remove(credit.creditId)

    const creditSelected = await creditService.select(credit.creditId)

    expect(creditSelected).toBeNull()
  })

  it('Buscando créditos de un cliente', async () => {
    const customerId = myCustomer.customerId

    const firstCredit = CreditMotherCreator.random(customerId)
    await creditService.create(firstCredit)

    const secondCredit = CreditMotherCreator.random(customerId)
    await creditService.create(secondCredit)

    const credits = await creditService.all(customerId)

    expect(credits.length).toBeGreaterThanOrEqual(2)
  })
})
