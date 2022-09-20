import { InvalidArgumentError } from './BaseValueObject'
import { StringValueObject } from './StringValueObject'

export class PhoneValueObject extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.validate(value)
  }

  private validate(value: string): void {
    const regexPhoneValidator = /^\(?(\d{3})\)?[- ]?(\d{4})[- ]?(\d{4})$/
    if (!regexPhoneValidator.test(value)) {
      throw new InvalidArgumentError(`El teléfono ${value} tiene formato incorrecto. Ejemplo: (505) 8367-1719`)
    }
  }
}
