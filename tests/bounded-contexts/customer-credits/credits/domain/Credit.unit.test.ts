import { Credit } from '@/bounded-contexts/customer-credits/credits/domain/Credit'
import { CreditAmount } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditAvailableAmountOfCredit'
import { CreditDate } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditDate'
import { CreditId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CreditId'
import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'
import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'

import { CreditMotherCreator } from './CreditMotherCreator'

describe('Credit', () => {
  it('Creando crédito', () => {
    const today = new Date()
    const creditDate = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay() + 2}`)
    const credit = new Credit({
      id: new CreditId('82682a1b-40a9-4419-a901-3bbeaef0d73b'),
      date: new CreditDate(creditDate),
      customerId: new CustomerId('82682a1b-40a9-4419-a901-3bbeaef0d72b'),
      amount: new CreditAmount(10000)
    })

    expect(credit.creditId.value).toBe('82682a1b-40a9-4419-a901-3bbeaef0d73b')
    expect(credit.date.value).toBe(creditDate)
    expect(credit.customerId.value).toBe('82682a1b-40a9-4419-a901-3bbeaef0d72b')
    expect(credit.amount.value).toBe(10000)
  })

  it('Creando crédito random', () => {
    const credit = CreditMotherCreator.random()
    const creditPrimitives = credit.toPrimitive()

    expect(credit.creditId.value).toBe(creditPrimitives.id)
    expect(credit.date.value).toBe(creditPrimitives.date)
    expect(credit.customerId.value).toBe(creditPrimitives.customerId)
    expect(credit.amount.value).toBe(creditPrimitives.amount)
  })

  it('Creando crédit', () => {
    expect(() => {
      CreditMotherCreator.invalid()
    }).toThrow(InvalidArgumentError)
  })
})
