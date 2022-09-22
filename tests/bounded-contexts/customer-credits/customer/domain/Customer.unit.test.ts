import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'
import { CustomerAvailableAmountOfCredit } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerAvailableAmountOfCredit'
import { CustomerDateOfBirth } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDateOfBirth'
import { CustomerDni } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDni'
import { CustomerEmail } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerEmail'
import { CustomerId } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerId'
import { CustomerIncome } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerIncome'
import { CustomerName } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerName'
import { CustomerPhone } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerPhone'
import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'

import { CustomerMotherCreator } from './CustomerMotherCreator'

describe('Customer', () => {
  it('Creando customer', () => {
    const dateOfBirth = new Date('1994-09-02')
    const customer = new Customer({
      customerId: new CustomerId('82682a1b-40a9-4419-a901-3bbeaef0d74b'),
      dni: new CustomerDni('1210209940004R'),
      names: new CustomerName('Michel Roberto'),
      lastnames: new CustomerName('Trana Tablada'),
      ageDate: new CustomerDateOfBirth(dateOfBirth),
      phone: new CustomerPhone('(505) 8367-1719'),
      email: new CustomerEmail('mtraatabladaa94@gmail.com'),
      income: new CustomerIncome(4000),
      amountAvailableOfCredit: new CustomerAvailableAmountOfCredit(0)
    })

    expect(customer.customerId.value).toBe('82682a1b-40a9-4419-a901-3bbeaef0d74b')
    expect(customer.dni.value).toBe('1210209940004R')
    expect(customer.names.value).toBe('Michel Roberto')
    expect(customer.lastnames.value).toBe('Trana Tablada')
    expect(customer.ageDate.value).toBe(dateOfBirth)
    expect(customer.phone.value).toBe('(505) 8367-1719')
    expect(customer.email.value).toBe('mtraatabladaa94@gmail.com')
    expect(customer.income.value).toBe(4000)
    expect(customer.amountAvailableOfCredit.value).toBe(0)
  })

  it('Creando customer random', () => {
    const customer = CustomerMotherCreator.random()
    const customerPrimitives = customer.toPrimitive()

    expect(customer.customerId.value).toBe(customerPrimitives.id)
    expect(customer.dni.value).toBe(customerPrimitives.dni)
    expect(customer.names.value).toBe(customerPrimitives.names)
    expect(customer.lastnames.value).toBe(customerPrimitives.lastnames)
    expect(customer.ageDate.value).toBe(customerPrimitives.ageDate)
    expect(customer.phone.value).toBe(customerPrimitives.phone)
    expect(customer.email.value).toBe(customerPrimitives.email)
    expect(customer.income.value).toBe(customerPrimitives.income)
    expect(customer.amountAvailableOfCredit.value).toBe(customerPrimitives.amountAvailableOfCredit)
  })

  it('Creando customer inválido', () => {
    expect(() => {
      CustomerMotherCreator.invalid()
    }).toThrow(InvalidArgumentError)
  })
})
