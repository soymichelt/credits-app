import { CustomerCreditEnabled } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerCreditEnabled'

import { ObjectMotherCreator } from '../../../shared/domain/ObjectMotherCreator'

export class CustomerCreditEnabledMotherCreator {
  static random(): CustomerCreditEnabled {
    const boolRandom = ObjectMotherCreator.random().random.boolean()
    return new CustomerCreditEnabled(boolRandom)
  }
}
