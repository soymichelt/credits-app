import { Credit } from '@/bounded-contexts/customer-credits/credits/domain/Credit'
import { CreditDate } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditDate'
import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'

import { ObjectMotherCreator } from '../../../shared/domain/ObjectMotherCreator'
import { CreditAmountMotherCreator } from '../../shared/domain/CreditAmountMotherCreator'
import { CreditIdMotherCreator } from '../../shared/domain/CreditIdMotherCreator'
import { CustomerIdMotherCreator } from '../../shared/domain/CustomerIdMotherCreator'

export class CreditMotherCreator {
  static random(customerId?: CustomerId): Credit {
    return new Credit({
      id: CreditIdMotherCreator.random(),
      date: this.creditDateRandom(),
      customerId: customerId ?? CustomerIdMotherCreator.random(),
      amount: CreditAmountMotherCreator.random()
    })
  }

  static invalid(): Credit {
    return new Credit({
      id: CreditIdMotherCreator.invalid(),
      date: this.creditDateInvalid(),
      customerId: CustomerIdMotherCreator.invalid(),
      amount: CreditAmountMotherCreator.invalid()
    })
  }

  static creditDateRandom(): CreditDate {
    const creditDateRandom = ObjectMotherCreator.random().date.future()
    return new CreditDate(creditDateRandom)
  }

  static creditDateInvalid(): CreditDate {
    const creditDateInvalid = ObjectMotherCreator.random().date.between('2010-01-01', '2020-01-01')
    return new CreditDate(creditDateInvalid)
  }
}
