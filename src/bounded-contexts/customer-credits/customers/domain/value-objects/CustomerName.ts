import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'
import { StringValueObject } from '@/bounded-contexts/shared/domain/value-objects/StringValueObject'

const MINIMUM_LENGTH_NAME = 3
const MAXIMUN_LENGTH_NAME = 30

export class CustomerName extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.validate(value)
  }

  private validate(value: string): void {
    if (value.length < MINIMUM_LENGTH_NAME) {
      throw new InvalidArgumentError(
        `El nombre del cliente "${value}" tiene menos de ${MINIMUM_LENGTH_NAME} carácteres`
      )
    }

    if (value.length > MAXIMUN_LENGTH_NAME) {
      throw new InvalidArgumentError(`El nombre del cliente "${value}" tiene más de ${MINIMUM_LENGTH_NAME} carácteres`)
    }
  }
}
