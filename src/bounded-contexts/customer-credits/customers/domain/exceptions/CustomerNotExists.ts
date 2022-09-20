export class CustomerNotExists extends Error {
  constructor(dni: string) {
    super(`No existe ningún cliente con el DNI ${dni}`)
  }
}
