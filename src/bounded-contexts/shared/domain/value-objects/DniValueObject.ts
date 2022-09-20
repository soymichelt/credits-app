import { ArgumentIsRequired } from '../exceptions/ArgumentIsRequired'
import { InvalidArgumentError } from './BaseValueObject'
import { StringValueObject } from './StringValueObject'

export class DniValueObject extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.validate(value)
  }

  private validate(value: string): void {
    if (!value) {
      throw new ArgumentIsRequired('DNI')
    }

    const regexDniValidator = /^[0-9]{13,13}[A-Za-z]$/
    if (!regexDniValidator.test(value)) {
      throw new InvalidArgumentError(`El DNI ${value} tiene formato incorrecto. Ejemplo: 1210209940004R`)
    }
  }
}
