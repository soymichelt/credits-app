export class ArgumentIsRequired extends Error {
  constructor(argument: string) {
    super(`El argumento '${argument}' es requerido. Por favor añádalo.`)
  }
}
