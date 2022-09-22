import { AggregateRoot } from '@/bounded-contexts/shared/domain/aggregate-root'

import { CustomerAvailableAmountOfCredit } from './value-objects/CustomerAvailableAmountOfCredit'
import { CustomerDateOfBirth } from './value-objects/CustomerDateOfBirth'
import { CustomerDni } from './value-objects/CustomerDni'
import { CustomerEmail } from './value-objects/CustomerEmail'
import { CustomerId } from './value-objects/CustomerId'
import { CustomerIncome } from './value-objects/CustomerIncome'
import { CustomerName } from './value-objects/CustomerName'
import { CustomerPhone } from './value-objects/CustomerPhone'

interface CustomerProps {
  customerId: CustomerId
  dni: CustomerDni
  names: CustomerName
  lastnames: CustomerName
  ageDate: CustomerDateOfBirth
  email: CustomerEmail
  phone: CustomerPhone
  income: CustomerIncome
  amountAvailableOfCredit: CustomerAvailableAmountOfCredit
}

interface CustomerPrimitivesProps {
  id: string
  dni: string
  names: string
  lastnames: string
  ageDate: Date
  email: string
  phone: string
  income: number
  amountAvailableOfCredit?: number
}

export class Customer extends AggregateRoot {
  readonly customerId: CustomerId
  readonly dni: CustomerDni
  readonly names: CustomerName
  readonly lastnames: CustomerName
  readonly ageDate: CustomerDateOfBirth
  readonly email: CustomerEmail
  readonly phone: CustomerPhone
  readonly income: CustomerIncome
  readonly amountAvailableOfCredit: CustomerAvailableAmountOfCredit

  constructor({
    customerId,
    dni,
    names,
    lastnames,
    ageDate,
    email,
    phone,
    income,
    amountAvailableOfCredit
  }: CustomerProps) {
    super()

    this.customerId = customerId
    this.dni = dni
    this.names = names
    this.lastnames = lastnames
    this.ageDate = ageDate
    this.email = email
    this.phone = phone
    this.income = income
    this.amountAvailableOfCredit = amountAvailableOfCredit
  }

  // updateValues({
  //   dni,
  //   names,
  //   lastnames,
  //   ageDate,
  //   email,
  //   phone,
  //   amountAvailableOfCredit
  // }: CustomerPrimitivesProps): void {
  //   if (dni !== this.dni.value) {
  //     this.dni = new CustomerDni(dni)
  //   }
  // }

  static buildFromPrimitives({
    id: customerId,
    dni,
    names,
    lastnames,
    ageDate,
    email,
    phone,
    income,
    amountAvailableOfCredit
  }: CustomerPrimitivesProps): Customer {
    return new Customer({
      customerId: new CustomerId(customerId),
      dni: new CustomerDni(dni),
      names: new CustomerName(names),
      lastnames: new CustomerName(lastnames),
      ageDate: new CustomerDateOfBirth(ageDate),
      email: new CustomerEmail(email),
      phone: new CustomerPhone(phone),
      income: new CustomerIncome(income),
      amountAvailableOfCredit: new CustomerAvailableAmountOfCredit(amountAvailableOfCredit || 0)
    })
  }

  toPrimitive() {
    return {
      id: this.customerId.value,
      dni: this.dni.value,
      names: this.names.value,
      lastnames: this.lastnames.value,
      ageDate: this.ageDate.value,
      email: this.email.value,
      phone: this.phone.value,
      income: this.income.value,
      amountAvailableOfCredit: this.amountAvailableOfCredit.value || 0
    }
  }
}
