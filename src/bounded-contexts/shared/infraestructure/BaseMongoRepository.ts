import { Collection, MongoClient } from 'mongodb'

import { AggregateRoot } from '../domain/aggregate-root'
import { MongoClientFactory } from './MongoClientFactory'

export abstract class MongoRepository<T extends AggregateRoot> {
  private async getAndStartClient(): Promise<MongoClient> {
    const client = await MongoClientFactory.getInstance()
    return client
  }

  protected databaseName(): string {
    return process.env.MONGO_DATABASE_NAME || 'creditsDb'
  }

  protected abstract moduleName(): string

  protected client(): Promise<MongoClient> {
    return this.getAndStartClient()
  }

  protected async collection(): Promise<Collection> {
    const client = await this.getAndStartClient()
    const dbName = this.databaseName()
    return client.db(dbName).collection(this.moduleName())
  }

  protected async save(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()
    const document = {
      ...aggregateRoot.toPrimitive(),
      _id: id,
      id: undefined
    }
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true })
  }
}
