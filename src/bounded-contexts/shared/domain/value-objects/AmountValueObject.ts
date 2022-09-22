import { InvalidArgumentError } from './BaseValueObject'
import { NumberValueObject } from './NumberValueObject'

export class AmountValueObject extends NumberValueObject {
  constructor(value: number) {
    super(value)

    this.validate(value)
  }

  validate(value: number) {
    if (value < 0) {
      throw new InvalidArgumentError(`El monto "${value}" no puede ser negativo`)
    }
  }
}
