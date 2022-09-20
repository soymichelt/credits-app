import { InvalidArgumentError } from './BaseValueObject'
import { StringValueObject } from './StringValueObject'

export class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.validate(value)
  }

  private validate(value: string): void {
    const regexEmailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!regexEmailValidator.test(value)) {
      throw new InvalidArgumentError(`El email ${value} tiene formato incorrecto. Ejemplo: mtraatabladaa94@gmail.com`)
    }
  }
}
