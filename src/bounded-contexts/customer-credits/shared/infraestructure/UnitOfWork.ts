import { CreditRepository } from '../../credits/domain/CreditRepository'
import { CreditMongoRepository } from '../../credits/infraestructure/CreditMongoRepository'
import { CustomerRepository } from '../../customers/domain/CustomerRepository'
import { CustomerMongoRepository } from '../../customers/infraestructure/CustomerMongoRepository'
import { IUnitOfWork } from '../domain/IUnitOfWork'

export class UnitOfWork implements IUnitOfWork {
  customerRepository: CustomerRepository
  creditRepository: CreditRepository

  constructor() {
    this.customerRepository = new CustomerMongoRepository()
    this.creditRepository = new CreditMongoRepository()
  }
}
