import { ObjectMotherCreator } from './ObjectMotherCreator'

export class EmailMotherCreator {
  static random(): string {
    return ObjectMotherCreator.random().internet.email()
  }
}
