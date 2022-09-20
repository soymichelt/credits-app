import { ArgumentIsRequired } from '../exceptions/ArgumentIsRequired'

export class DateValueObject {
  readonly value: Date

  constructor(value: Date) {
    if (!value) {
      throw new ArgumentIsRequired('Date')
    }

    this.value = value
  }

  static buildFromString(value: string): DateValueObject {
    if (!value) {
      throw new ArgumentIsRequired('Date')
    }

    const date = new Date(value)
    return new DateValueObject(date)
  }

  toString(): string {
    return this.value.toLocaleString()
  }
}
