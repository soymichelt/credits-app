import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'
import { NumberValueObject } from '@/bounded-contexts/shared/domain/value-objects/NumberValueObject'

const MINIMUM_AMOUNT_OF_CREDIT = 0

export class CustomerAvailableAmountOfCredit extends NumberValueObject {
  constructor(value: number) {
    super(value)

    this.validate(value)
  }

  validate(value: number) {
    if (value < MINIMUM_AMOUNT_OF_CREDIT) {
      throw new InvalidArgumentError(`El monto "${value}" no puede ser menor que el mínimo ${MINIMUM_AMOUNT_OF_CREDIT}`)
    }
  }
}
