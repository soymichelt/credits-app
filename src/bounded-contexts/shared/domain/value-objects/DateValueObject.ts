export class DateValueObject {
  readonly value: Date

  constructor(value: Date) {
    this.value = value
  }

  static buildFromString(value: string): DateValueObject {
    const date = new Date(value)
    return new DateValueObject(date)
  }

  toString(): string {
    return this.value.toLocaleString()
  }
}
