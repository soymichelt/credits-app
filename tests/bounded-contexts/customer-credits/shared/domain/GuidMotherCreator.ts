import { ObjectMotherCreator } from './ObjectMotherCreator'

export class GuidMotherCreator {
  static random(): string {
    return ObjectMotherCreator.random().random.uuid()
  }
}
