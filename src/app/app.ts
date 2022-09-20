import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import Router from 'express-promise-router'
import helmet from 'helmet'
import * as http from 'http'
import httpStatus from 'http-status'
import swaggerUi from 'swagger-ui-express'

import { registerRoutes } from './routes'
import swaggerDocument from './swagger.json'

export class App {
  private express: express.Express
  private port: string
  private httpServer?: http.Server

  constructor(port: string) {
    this.port = port

    this.express = express()
    this.configSentry()
    this.configSwagger()
    this.configExpress()
    this.registerErrorHandlers()
  }

  async listen(): Promise<void> {
    const listenPromise = new Promise<void>((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`App running on port ${this.port}. MODE ${this.express.get('env')}`)
        resolve()
      })
    })

    return listenPromise
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }

  getHTTPServer(): http.Server | undefined {
    return this.httpServer
  }

  private configExpress(): void {
    this.express.use(bodyParser.json())
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'sameorigin' }))

    const router = Router()
    this.express.use(router)
    registerRoutes(router)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    router.use((err: Error, req: Request, res: Response, _next: unknown) => {
      // TODO: register errors on any logger
      console.log(`Credits App Error: ${err.message}`)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Credits App Error: ${err.message}`)
    })
  }

  private configSwagger(): void {
    this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }

  private configSentry(): void {
    const sentryDsn = process.env.SENTRY_DSN
    if (sentryDsn) {
      return
    }

    Sentry.init({
      dsn: sentryDsn,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.express })
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0
    })

    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(Sentry.Handlers.tracingHandler())
  }

  private registerErrorHandlers(): void {
    this.express.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError: (error) => {
          return error.status === 404 || error.status === 500
        }
      })
    )
  }
}
