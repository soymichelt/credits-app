// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class BaseValueObject<T extends Object> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  public equals(otherValue: BaseValueObject<T>): boolean {
    return this.getValue() === otherValue.getValue()
  }

  getValue(): T {
    return this.value
  }

  toString() {
    return this.value ? this.value.toString() : this.value
  }
}

export class InvalidArgumentError extends Error {}
