import { Response } from 'express'
import httpStatus from 'http-status'

export interface ResponseJson {
  message?: string
  error?: Error
  data?: unknown
}

export interface WrapperCallback {
  (resCallback: ResponseCallback): Promise<void>
}

export interface ResponseCallback {
  (statusCode: number, responseJson: ResponseJson): void
}

export class ResponseFactory {
  private constructor() {}

  static async build(res: Response, callback: WrapperCallback): Promise<void> {
    try {
      await callback((statusCode: number, resJson: ResponseJson) => {
        res.status(statusCode).send({ ...resJson })
      })
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: (error as Error).message
      })
    }
  }
}
