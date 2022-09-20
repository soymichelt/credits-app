import { InvalidArgumentError } from '@/bounded-contexts/shared/domain/value-objects/BaseValueObject'
import { DateValueObject } from '@/bounded-contexts/shared/domain/value-objects/DateValueObject'

const MINIMUN_AGE_ALLOWED = 18

export class CustomerDateOfBirth extends DateValueObject {
  constructor(value: Date) {
    super(value)

    this.validate(value)
  }

  private validate(value: Date): void {
    const customerAge = this.calculateAge(value)
    if (customerAge < MINIMUN_AGE_ALLOWED) {
      throw new InvalidArgumentError(
        `El cliente con fecha "${value.toLocaleDateString()}" tiene menos de ${MINIMUN_AGE_ALLOWED}`
      )
    }
  }

  private calculateAge(dateOfBirth: Date): number {
    const diff_ms = Date.now() - dateOfBirth.getTime()
    const age_dt = new Date(diff_ms)

    return Math.abs(age_dt.getUTCFullYear() - 1970)
  }
}
