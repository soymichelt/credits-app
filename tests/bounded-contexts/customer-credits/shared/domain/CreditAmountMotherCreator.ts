import { CreditAmount } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditAvailableAmountOfCredit'

import { ObjectMotherCreator } from '../../../shared/domain/ObjectMotherCreator'

export class CreditAmountMotherCreator {
  static random(): CreditAmount {
    const availableAmount = ObjectMotherCreator.random().random.float({
      min: 0,
      max: 500000,
      precision: 2
    })
    return new CreditAmount(availableAmount)
  }

  static invalid(): CreditAmount {
    const availableAmount = ObjectMotherCreator.random().random.float({
      min: -500000,
      max: -1,
      precision: 2
    })
    return new CreditAmount(availableAmount)
  }
}
