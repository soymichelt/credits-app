import { AggregateRoot } from '@/bounded-contexts/shared/domain/aggregate-root'

import { CreditId } from '../../shared/domain/value-objects/CreditId'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { CreditAmount } from './value-objects/CreditAvailableAmountOfCredit'
import { CreditDate } from './value-objects/CreditDate'

interface CreditProps {
  id: CreditId
  date: CreditDate
  customerId: CustomerId
  amount: CreditAmount
}

interface CreditPrimitivesProps {
  id: string
  date: Date
  customerId: string
  amount: number
}

export class Credit extends AggregateRoot {
  creditId: CreditId
  date: CreditDate
  customerId: CustomerId
  amount: CreditAmount

  constructor({ id, date, customerId, amount }: CreditProps) {
    super()

    this.creditId = id
    this.date = date
    this.customerId = customerId
    this.amount = amount
  }

  static buildFromPrimitives({ id, date, customerId, amount }: CreditPrimitivesProps): Credit {
    return new Credit({
      id: new CreditId(id),
      date: new CreditDate(date),
      customerId: new CustomerId(customerId),
      amount: new CreditAmount(amount)
    })
  }

  toPrimitive() {
    return {
      id: this.creditId.value,
      date: this.date.value,
      customerId: this.customerId.value,
      amount: this.amount.value
    }
  }
}
