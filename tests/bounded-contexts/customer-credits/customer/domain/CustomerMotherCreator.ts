import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'
import { CustomerDateOfBirth } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDateOfBirth'
import { CustomerDni } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerDni'
import { CustomerEmail } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerEmail'
import { CustomerIncome } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerIncome'
import { CustomerName } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerName'
import { CustomerPhone } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerPhone'
import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'

import { EmailMotherCreator } from '../../../shared/domain/EmailMotherCreator'
import { GuidMotherCreator } from '../../../shared/domain/GuidMotherCreator'
import { ObjectMotherCreator } from '../../../shared/domain/ObjectMotherCreator'
import { PhoneMotherCreator } from '../../../shared/domain/PhoneMotherCreator'
import { CustomerCreditEnabledMotherCreator } from '../../shared/domain/CustomerCreditEnabledMotherCreator'

export class CustomerMotherCreator {
  static random(): Customer {
    return new Customer({
      customerId: this.customerIdRandom(),
      dni: this.customerDniRandom(),
      names: this.customerNameRandom(),
      lastnames: this.customerNameRandom(),
      ageDate: this.customerAgeDateRandom(),
      email: this.customerEmailRandom(),
      phone: this.customerPhoneRandom(),
      income: this.customerIncomeRandom(),
      creditEnabled: CustomerCreditEnabledMotherCreator.random()
    })
  }

  static invalid(): Customer {
    return new Customer({
      customerId: this.customerIdInvalid(),
      dni: this.customerDniInvalid(),
      names: this.customerNameInvalid(),
      lastnames: this.customerNameInvalid(),
      ageDate: this.customerAgeDateInvalid(),
      email: this.customerEmailInvalid(),
      phone: this.customerPhoneInvalid(),
      income: this.customerIncomeInvalid(),
      creditEnabled: CustomerCreditEnabledMotherCreator.random()
    })
  }

  static customerIdRandom(): CustomerId {
    const guidRandom = GuidMotherCreator.random()
    return new CustomerId(guidRandom)
  }

  static customerDniRandom(): CustomerDni {
    const city = ObjectMotherCreator.random().random.number({
      min: 100,
      max: 999
    })
    const body = ObjectMotherCreator.random().random.number({
      min: 100000,
      max: 999999
    })
    const code = ObjectMotherCreator.random().random.number({
      min: 1000,
      max: 9999
    })
    const letter = ObjectMotherCreator.random().lorem.word(1)

    return new CustomerDni(`${city}${body}${code}${letter.toUpperCase()}`)
  }

  static customerNameRandom(): CustomerName {
    const nameRandom = ObjectMotherCreator.random().name.firstName()
    return new CustomerName(nameRandom)
  }

  static customerAgeDateRandom(): CustomerDateOfBirth {
    const dateOfBirthRandom = ObjectMotherCreator.random().date.between('1960-01-01', '2002-01-01')
    return new CustomerDateOfBirth(dateOfBirthRandom)
  }

  static customerEmailRandom(): CustomerEmail {
    const emailRandom = EmailMotherCreator.random()
    return new CustomerEmail(emailRandom)
  }

  static customerPhoneRandom(): CustomerPhone {
    const phoneRandom = PhoneMotherCreator.random()
    return new CustomerPhone(phoneRandom)
  }

  static customerIncomeRandom(): CustomerIncome {
    const income = ObjectMotherCreator.random().random.float({
      min: 0,
      max: 500000,
      precision: 2
    })
    return new CustomerIncome(income)
  }

  static customerIdInvalid(): CustomerId {
    const guidRandom = GuidMotherCreator.random()
    const guidInvalid = guidRandom.substring(6)
    return new CustomerId(guidInvalid)
  }

  static customerDniInvalid(): CustomerDni {
    const body = ObjectMotherCreator.random().random.number({
      min: 100000,
      max: 999999
    })
    const code = ObjectMotherCreator.random().random.number({
      min: 1000,
      max: 9999
    })
    const letter = ObjectMotherCreator.random().lorem.word(1)

    return new CustomerDni(`${body}${code}${letter.toUpperCase()}`)
  }

  static customerNameInvalid(): CustomerName {
    const nameRandom = ObjectMotherCreator.random().name.firstName()
    const nameInvalid = nameRandom.substring(0, 2)
    return new CustomerName(nameInvalid)
  }

  static customerAgeDateInvalid(): CustomerDateOfBirth {
    const dateOfBirthRandom = ObjectMotherCreator.random().date.between('2010-01-01', '2020-01-01')
    return new CustomerDateOfBirth(dateOfBirthRandom)
  }

  static customerEmailInvalid(): CustomerEmail {
    const emailRandom = EmailMotherCreator.random()
    const emailInvalid = emailRandom.replace('@', '')
    return new CustomerEmail(emailInvalid)
  }

  static customerPhoneInvalid(): CustomerPhone {
    const phoneInvalid = PhoneMotherCreator.invalid()
    return new CustomerPhone(phoneInvalid)
  }

  static customerIncomeInvalid(): CustomerIncome {
    const income = ObjectMotherCreator.random().random.float({
      min: -500000,
      max: -1,
      precision: 2
    })
    return new CustomerIncome(income)
  }
}
