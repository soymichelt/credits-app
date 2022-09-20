import { CustomerName } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerName'

import { ObjectMotherCreator } from '../../shared/domain/ObjectMotherCreator'

export class CustomerNameMotherCreator {
  static random(): CustomerName {
    const nameRandom = ObjectMotherCreator.random().name.firstName()
    return new CustomerName(nameRandom)
  }
}
