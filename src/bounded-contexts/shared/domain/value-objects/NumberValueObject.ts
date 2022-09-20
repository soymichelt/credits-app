export abstract class NumberValueObject {
  readonly value: number

  constructor(value: number) {
    this.value = value
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.getValue() === other.getValue()
  }

  getValue(): number {
    return this.value
  }

  isGreaterThan(otherValue: NumberValueObject): boolean {
    return this.getValue() > otherValue.getValue()
  }

  isLessThan(otherValue: NumberValueObject): boolean {
    return this.getValue() < otherValue.getValue()
  }
}
