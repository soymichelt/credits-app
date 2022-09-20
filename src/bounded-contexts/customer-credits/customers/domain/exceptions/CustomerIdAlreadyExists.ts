export class CustomerIdAlreadyExists extends Error {
  constructor(id: string) {
    super(`El CustomerID ${id} actualmente existe. Por favor elige otro`)
  }
}
