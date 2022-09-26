import { Nullable } from '@/bounded-contexts/shared/domain/nullable'

import { CustomerCreditEnabled } from '../../shared/domain/value-objects/CustomerCreditEnabled'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Customer } from './Customer'
import { CustomerDni } from './value-objects/CustomerDni'

export enum CustomerToShow {
  all,
  onlyWithCredit,
  onlyWithoutCredit
}

export interface CustomerRepository {
  create(customer: Customer): Promise<void>

  update(customer: Customer): Promise<void>

  remove(customerId: CustomerId): Promise<void>

  select(customerId: CustomerId): Promise<Nullable<Customer>>

  selectByDni(customerDni: CustomerDni): Promise<Nullable<Customer>>

  all(filter?: CustomerToShow): Promise<Array<Customer>>

  enableCreditToCustomer(customerId: CustomerId, enabled: CustomerCreditEnabled): Promise<void>
}
