export class CustomerToDeleteContainsCredits extends Error {
  constructor(customer: string) {
    super(`El Customer "${customer}" que intenta eliminar tiene créditos asociados`)
  }
}
