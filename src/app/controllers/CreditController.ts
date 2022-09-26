import { Request, Response } from 'express'

import { CreditService } from '@/bounded-contexts/customer-credits/credits/application/CreditService'
import { Credit } from '@/bounded-contexts/customer-credits/credits/domain/Credit'
import { CreditAmount } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditAvailableAmountOfCredit'
import { CreditDate } from '@/bounded-contexts/customer-credits/credits/domain/value-objects/CreditDate'
import { CreditId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CreditId'
import { CustomerId } from '@/bounded-contexts/customer-credits/shared/domain/value-objects/CustomerId'

import { ResponseCallback, ResponseFactory } from '../helpers/ResponseFactory'
import { BaseController } from './BaseController'

export class CreditController implements BaseController {
  constructor(private service: CreditService) {}

  async get(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const id: string = req.params.id
      const credit = await this.service.select(new CreditId(id))

      if (!credit) {
        resCallback(404, {
          message: 'Credit not found'
        })
      }
      resCallback(200, {
        data: { credit: credit?.toPrimitive() ?? {} }
      })
    })
  }

  async getAll(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      let start = req.query.start as string
      let end = req.query.end as string
      if (!start) {
        const today = new Date()
        start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay() + 1}`
      }
      if (!end) {
        const today = new Date()
        end = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay() + 1} 23:59:59`
      }

      const creditStartDate = new CreditDate(new Date(start))
      const creditEndDate = new CreditDate(new Date(end))

      const credits = await this.service.allByDateRange(creditStartDate, creditEndDate)
      const creditsPrimitives = credits.map((customer) => customer.toPrimitive())

      resCallback(200, {
        data: { credits: creditsPrimitives }
      })
    })
  }

  async getAllByCustomer(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const id: string = req.params.id
      const customerId = new CustomerId(id)

      const credits = await this.service.all(customerId)
      const creditsPrimitives = credits.map((customer) => customer.toPrimitive())

      resCallback(200, {
        data: { credits: creditsPrimitives }
      })
    })
  }

  async post(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const credit = Credit.buildFromPrimitives({
        id: req.body.id,
        date: new Date(req.body.date),
        customerId: req.body.customerId,
        amount: req.body.amount
      })

      await this.service.create(credit)

      resCallback(200, {
        message: 'Credit created successfull 😎'
      })
    })
  }

  async put(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const creditId = new CreditId(req.params.id)
      const creditAmount = new CreditAmount(req.body.amount)

      await this.service.update(creditId, creditAmount)

      resCallback(200, {
        message: 'Credit updated successfull 😎'
      })
    })
  }

  async delete(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const creditId = new CreditId(req.params.id)
      await this.service.remove(creditId)

      resCallback(200, {
        message: 'Credit removed successfull 😎'
      })
    })
  }
}
