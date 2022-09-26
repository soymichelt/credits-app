import { Nullable } from '@/bounded-contexts/shared/domain/nullable'
import { MongoRepository } from '@/bounded-contexts/shared/infraestructure/BaseMongoRepository'

import { CreditId } from '../../shared/domain/value-objects/CreditId'
import { CustomerId } from '../../shared/domain/value-objects/CustomerId'
import { Credit } from '../domain/Credit'
import { CreditRepository } from '../domain/CreditRepository'
import { CreditDate } from '../domain/value-objects/CreditDate'

export class CreditMongoRepository extends MongoRepository<Credit> implements CreditRepository {
  async create(credit: Credit): Promise<void> {
    await this.save(credit.creditId.value, credit)
  }

  async update(credit: Credit): Promise<void> {
    const creditDoc = await this.select(credit.creditId)
    if (!creditDoc) return
    const creditWithChanges = Credit.buildFromPrimitives({
      ...(creditDoc?.toPrimitive() || {}),
      ...credit.toPrimitive()
    })

    await this.save(credit.creditId.value, creditWithChanges)
  }

  async remove(creditId: CreditId): Promise<void> {
    const collection = await this.collection()
    await collection.findOneAndDelete({ _id: creditId.value })
  }

  async select(creditId: CreditId): Promise<Nullable<Credit>> {
    const collection = await this.collection()
    const document = await collection.findOne({ _id: creditId.value })

    if (!document) {
      return null
    }

    return Credit.buildFromPrimitives({
      id: creditId.value,
      date: document.date,
      customerId: document.customerId,
      amount: document.amount ?? 0
    })
  }

  async all(customerId: CustomerId): Promise<Credit[]> {
    const collection = await this.collection()

    const filterExpression = { customerId: customerId.value }
    const creditsDocs = await collection.find(filterExpression).toArray()
    const credits: Credit[] = []

    creditsDocs.forEach((document) => {
      const credit = Credit.buildFromPrimitives({
        id: document._id.toString(),
        date: document.date,
        customerId: document.customerId,
        amount: document.amount ?? 0
      })
      credits.push(credit)
    })

    return credits
  }

  async allByDateRange(start: CreditDate, end: CreditDate): Promise<Credit[]> {
    const collection = await this.collection()

    const filterExpression = {
      date: {
        $gte: start.value,
        $lt: end.value
      }
    }

    const creditsDocs = await collection.find(filterExpression).toArray()
    const credits: Credit[] = []

    creditsDocs.forEach((document) => {
      const credit = Credit.buildFromPrimitives({
        id: document._id.toString(),
        date: document.date,
        customerId: document.customerId,
        amount: document.amount ?? 0
      })
      credits.push(credit)
    })

    return credits
  }

  protected moduleName(): string {
    return 'credtis'
  }
}
