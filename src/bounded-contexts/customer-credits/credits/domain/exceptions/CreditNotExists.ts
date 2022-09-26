export class CreditNotExists extends Error {
  constructor() {
    super(`No existe el crédito que intenta seleccionar`)
  }
}
