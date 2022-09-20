import { ObjectMotherCreator } from './ObjectMotherCreator'

export class StringMotherCreator {
  static random(): string {
    return ObjectMotherCreator.random().lorem.word()
  }
}
