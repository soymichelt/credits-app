import { Request, Response } from 'express'

import { BaseController } from './BaseController'

export class HealthCheckController implements BaseController {
  async get(req: Request, res: Response) {
    res.status(200).send('Backend is running 😇😇😇')
  }
}
