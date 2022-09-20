export class CustomerAlreadyExists extends Error {
  constructor(dni: string) {
    super(`El cliente ${dni} actualmente existe`)
  }
}
