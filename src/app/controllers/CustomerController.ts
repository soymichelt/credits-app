import { Request, Response } from 'express'

import { CustomerService } from '@/bounded-contexts/customer-credits/customers/application/CustomerService'
import { Customer } from '@/bounded-contexts/customer-credits/customers/domain/Customer'
import { CustomerAvailableAmountOfCredit } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerAvailableAmountOfCredit'
import { CustomerId } from '@/bounded-contexts/customer-credits/customers/domain/value-objects/CustomerId'

import { ResponseCallback, ResponseFactory } from '../helpers/ResponseFactory'
import { BaseController } from './BaseController'

export class CustomerController implements BaseController {
  constructor(private service: CustomerService) {}

  async get(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const id: string = req.params.id
      const customer = await this.service.select(new CustomerId(id))

      if (!customer) {
        resCallback(404, {
          message: 'Customer not found'
        })
      }
      resCallback(200, {
        data: { customer: customer?.toPrimitive() ?? {} }
      })
    })
  }

  async getAll(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const customerToShow: number = Number.parseInt(req.query.customerToShow as string) || 0

      const customers = await this.service.all(customerToShow)
      const customersPrimitives = customers.map((customer) => customer.toPrimitive())

      resCallback(200, {
        data: { customers: customersPrimitives }
      })
    })
  }

  async post(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const customer = Customer.buildFromPrimitives({
        id: req.body.id,
        dni: req.body.dni,
        names: req.body.names,
        lastnames: req.body.lastnames,
        ageDate: new Date(req.body.ageDate),
        email: req.body.email,
        phone: req.body.phone,
        income: req.body.income
      })

      await this.service.create(customer)

      resCallback(200, {
        message: 'Customer created successfull 😎'
      })
    })
  }

  async put(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const customer = Customer.buildFromPrimitives({
        id: req.params.id,
        dni: req.body.dni,
        names: req.body.names,
        lastnames: req.body.lastnames,
        ageDate: new Date(req.body.ageDate),
        email: req.body.email,
        phone: req.body.phone,
        income: req.body.income
      })

      await this.service.update(customer)

      resCallback(200, {
        message: 'Customer updated successfull 😎'
      })
    })
  }

  async putAmountCredit(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const customerId = new CustomerId(req.params.id)
      const amount = new CustomerAvailableAmountOfCredit(req.body.amountAvailableOfCredit)

      await this.service.addAmountOfCredit(customerId, amount)

      resCallback(200, {
        message: 'Customer credit registered successfull 😎'
      })
    })
  }

  async delete(req: Request, res: Response) {
    ResponseFactory.build(res, async (resCallback: ResponseCallback) => {
      const customerId = new CustomerId(req.params.id)
      await this.service.remove(customerId)

      resCallback(200, {
        message: 'Customer removed successfull 😎'
      })
    })
  }
}
