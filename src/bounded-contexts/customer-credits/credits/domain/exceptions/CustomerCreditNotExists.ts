export class CustomerCreditNotExists extends Error {
  constructor() {
    super(`No existe el cliente al que intenta habilitar un crédito`)
  }
}
