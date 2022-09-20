import { Request, Response } from 'express'

import { ResponseCallback, ResponseFactory } from '../helpers/ResponseFactory'
import { BaseController } from './BaseController'

export class HealthCheckController implements BaseController {
  async get(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      resCallback(200, {
        message: 'Backend is running 😇😇😇'
      })
    })
  }
}
