import { v4 } from 'uuid'
import validate from 'uuid-validate'

import { InvalidArgumentError } from './BaseValueObject'

export class GuidValueObject {
  readonly value: string

  constructor(value: string) {
    if (!validate(value)) {
      throw new InvalidArgumentError(`"${this.constructor.name}" no permite el valor "${value}"`)
    }

    this.value = value
  }

  static NewGuid(): GuidValueObject {
    return new GuidValueObject(v4())
  }

  toString(): string {
    return this.value
  }
}
