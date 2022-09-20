import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { Customer } from './Customer'
import { CustomerAvailableAmountOfCredit } from './value-objects/CustomerAvailableAmountOfCredit'
import { CustomerDni } from './value-objects/CustomerDni'
import { CustomerId } from './value-objects/CustomerId'

export enum CustomerToShow {
  all,
  onlyWithCredit,
  onlyWithoutCredit
}

export interface CustomerRepository {
  create(customer: Customer): Promise<void>

  update(customer: Customer): Promise<void>

  addAmountOfCredit(customerId: CustomerId, amount: CustomerAvailableAmountOfCredit): Promise<void>

  remove(customerId: CustomerId): Promise<void>

  select(customerId: CustomerId): Promise<Nullable<Customer>>

  selectByDni(customerDni: CustomerDni): Promise<Nullable<Customer>>

  all(filter?: CustomerToShow): Promise<Array<Customer>>
}
