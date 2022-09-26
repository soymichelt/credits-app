import { CreditRepository } from '@/bounded-contexts/customer-credits/credits/domain/CreditRepository'
import { CustomerRepository } from '@/bounded-contexts/customer-credits/customers/domain/CustomerRepository'
import { IUnitOfWork } from '@/bounded-contexts/customer-credits/shared/domain/IUnitOfWork'

import { CreditMockRepository } from '../../../credits/infrastructure/__mocks__/CreditMockRepository'
import { CustomerMockRepository } from '../../../customer/infraestructure/__mocks__/CustomerMockRepository'

export class UnitOfWorkMock implements IUnitOfWork {
  customerRepository: CustomerRepository
  creditRepository: CreditRepository

  constructor() {
    this.customerRepository = new CustomerMockRepository()
    this.creditRepository = new CreditMockRepository()
  }
}
