import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { CreditId } from '../../shared/domain/value-objects/CreditId'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Credit } from './Credit'
import { CreditDate } from './value-objects/CreditDate'

export interface CreditRepository {
  create(credit: Credit): Promise<void>

  update(credit: Credit): Promise<void>

  remove(creditId: CreditId): Promise<void>

  select(creditId: CreditId): Promise<Nullable<Credit>>

  all(customerId: CustomerId): Promise<Array<Credit>>

  allByDateRange(start: CreditDate, end: CreditDate): Promise<Array<Credit>>
}
