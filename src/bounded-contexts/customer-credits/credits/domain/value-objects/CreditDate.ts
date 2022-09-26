import { ArgumentIsRequired } from '@/bounded-contexts/shared/domain/exceptions/ArgumentIsRequired'
import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'
import { DateValueObject } from '@/bounded-contexts/shared/domain/value-objects/DateValueObject'

export class CreditDate extends DateValueObject {
  constructor(value: Date) {
    super(value)

    this.validate(value)
  }

  private validate(value: Date): void {
    if (!value) {
      throw new ArgumentIsRequired('Credit Date')
    }

    if (value < this.getToday()) {
      throw new InvalidArgumentError(
        `La fecha del crédito "${value.toISOString()}" debe ser mayor o igual a la actual.`
      )
    }
  }

  private getToday(): Date {
    const current = new Date()
    const dateText = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDay() + 1}`
    const today = new Date(dateText)
    return today
  }
}
