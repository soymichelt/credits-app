import { ObjectMotherCreator } from './ObjectMotherCreator'

export class PhoneMotherCreator {
  static random(): string {
    return ObjectMotherCreator.random().phone.phoneNumber('(505) ####-####')
  }

  static invalid(): string {
    return ObjectMotherCreator.random().phone.phoneNumber('###.###.###')
  }
}
