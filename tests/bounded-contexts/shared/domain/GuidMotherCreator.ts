import { ObjectMotherCreator } from './ObjectMotherCreator'

export class GuidMotherCreator {
  static random(): string {
    return ObjectMotherCreator.random().random.uuid()
  }

  static invalid(): string {
    const guidRandom = GuidMotherCreator.random()
    const guidInvalid = guidRandom.substring(6)
    return guidInvalid
  }
}
