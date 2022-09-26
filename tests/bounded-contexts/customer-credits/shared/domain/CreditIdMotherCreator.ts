import { CreditId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CreditId'

import { GuidMotherCreator } from '../../../shared/domain/GuidMotherCreator'

export class CreditIdMotherCreator {
  static random(): CreditId {
    const guidRandom = GuidMotherCreator.random()
    return new CreditId(guidRandom)
  }

  static invalid(): CreditId {
    const guidInvalid = GuidMotherCreator.invalid()
    return new CreditId(guidInvalid)
  }
}
