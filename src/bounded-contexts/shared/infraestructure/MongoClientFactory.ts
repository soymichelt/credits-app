import { MongoClient } from 'mongodb'

export class MongoClientFactory {
  private static mongoClientInstance: MongoClient

  private constructor() {}

  static async getInstance(): Promise<MongoClient> {
    if (MongoClientFactory.mongoClientInstance) {
      return MongoClientFactory.mongoClientInstance
    }

    const mongoUrl = process.env.MONGO_URL
    if (!mongoUrl) {
      throw new Error('Configurar MONGO_URL en las variables de entorno')
    }

    MongoClientFactory.mongoClientInstance = new MongoClient(mongoUrl, {
      ignoreUndefined: true
    })

    await MongoClientFactory.mongoClientInstance.connect()
    return MongoClientFactory.mongoClientInstance
  }
}
