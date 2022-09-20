import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'

import { CustomerMotherCreator } from './CustomerMotherCreator'

describe('Customer Value Objects', () => {
  it('Creando Customer Id', () => {
    const customerId = CustomerMotherCreator.customerIdRandom()

    expect(customerId.value).toBeDefined()
  })

  it('Creando Customer DNI', () => {
    const customerDni = CustomerMotherCreator.customerDniRandom()

    expect(customerDni.value).toBeDefined()
  })

  it('Creando Customer Name & Lastname', () => {
    const customerName = CustomerMotherCreator.customerNameRandom()

    expect(customerName.value).toBeDefined()
  })

  it('Creando Customer Date of Birth', () => {
    const customerDateOfBirth = CustomerMotherCreator.customerAgeDateRandom()

    expect(customerDateOfBirth.value).toBeDefined()
  })

  it('Creando Customer Email', () => {
    const customerEmail = CustomerMotherCreator.customerEmailRandom()

    expect(customerEmail.value).toBeDefined()
  })

  it('Creando Customer Phone', () => {
    const customerPhone = CustomerMotherCreator.customerPhoneRandom()

    expect(customerPhone.value).toBeDefined()
  })

  it('Creando Customer Available Amount of Credit', () => {
    const customerAmount = CustomerMotherCreator.customerAmountRandom()

    expect(customerAmount.value).toBeDefined()
  })

  it('Creando Customer Id con 30 caracteres', () => {
    expect(() => {
      CustomerMotherCreator.customerIdInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer DNI sin codigo de ciudad', () => {
    expect(() => {
      CustomerMotherCreator.customerDniInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer Name & Lastname con menos de 3 caracteres', () => {
    expect(() => {
      CustomerMotherCreator.customerNameInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer Date of Birth menor de 18 años', () => {
    expect(() => {
      CustomerMotherCreator.customerAgeDateInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer Email sin arroba', () => {
    expect(() => {
      CustomerMotherCreator.customerEmailInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer Phone con formato de número extranjero', () => {
    expect(() => {
      CustomerMotherCreator.customerPhoneInvalid()
    }).toThrow(InvalidArgumentError)
  })

  it('Creando Customer Available Amount of Credit con valores negativos', () => {
    expect(() => {
      CustomerMotherCreator.customerAmountInvalid()
    }).toThrow(InvalidArgumentError)
  })
})
