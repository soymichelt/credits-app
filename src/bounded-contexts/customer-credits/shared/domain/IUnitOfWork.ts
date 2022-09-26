import { CreditRepository } from '../../credits/domain/CreditRepository'
import { CustomerRepository } from '../../customers/domain/CustomerRepository'

export interface IUnitOfWork {
  customerRepository: CustomerRepository
  creditRepository: CreditRepository
}
