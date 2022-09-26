import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'

import { GuidMotherCreator } from '../../../shared/domain/GuidMotherCreator'

export class CustomerIdMotherCreator {
  static random(): CustomerId {
    const guidRandom = GuidMotherCreator.random()
    return new CustomerId(guidRandom)
  }

  static invalid(): CustomerId {
    const guidInvalid = GuidMotherCreator.invalid()
    return new CustomerId(guidInvalid)
  }
}
