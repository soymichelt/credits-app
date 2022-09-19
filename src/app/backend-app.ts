import { App } from './app'

export class BackendApp {
  private PORT_DEFAULT = '8900'
  app!: App

  private constructor() {}

  static build(): BackendApp {
    return new BackendApp()
  }

  async start(): Promise<void> {
    const port = process.env.PORT || this.PORT_DEFAULT
    this.app = new App(port)
    return this.app.listen()
  }

  async stop() {
    return this.app?.stop()
  }

  get httpServer() {
    return this.app?.getHTTPServer()
  }
}
