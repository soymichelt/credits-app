import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'

import { CreditAmountMotherCreator } from '../../shared/domain/CreditAmountMotherCreator'
import { CreditIdMotherCreator } from '../../shared/domain/CreditIdMotherCreator'
import { CreditMotherCreator } from './CreditMotherCreator'

describe('Credit Value Objects', () => {
  it('Creando Credit Id', () => {
    const creditId = CreditIdMotherCreator.random()

    expect(creditId.value).toBeDefined()
  })

  it('Creando Credit Date', () => {
    const creditDate = CreditMotherCreator.creditDateRandom()

    expect(creditDate).toBeDefined()
  })

  it('Creando Credit Amount', () => {
    const creditAmount = CreditAmountMotherCreator.random()

    expect(creditAmount.value).toBeDefined()
  })

  it('Creando Credit Id con 30 carácteres', () => {
    expect(() => {
      const creditId = CreditIdMotherCreator.invalid()
      console.log('Credit Id >>> ', creditId)
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Credit Date con fecha anterior a hoy', () => {
    expect(() => {
      CreditMotherCreator.creditDateInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Credit Amount con monto en negativo', () => {
    expect(() => {
      CreditAmountMotherCreator.invalid()
    }).toThrow(InvalidArgumentError)
  })
})
