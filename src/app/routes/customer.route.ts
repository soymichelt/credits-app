import { Request, Response, Router } from 'express'

import { DependencyInjectionContainer as DIC } from './../dependency-injection-container'

export const register = (router: Router) => {
  const container = DIC.getInstance().getContainer()
  const customerController = container.get('App.controllers.CustomerController')

  router.get('/customer/:id', (req: Request, res: Response) => {
    customerController.get(req, res)
  })
  router.get('/customer', (req: Request, res: Response) => {
    customerController.getAll(req, res)
  })
  router.post('/customer', (req: Request, res: Response) => {
    customerController.post(req, res)
  })
  router.put('/customer/:id', (req: Request, res: Response) => {
    customerController.put(req, res)
  })
  router.put('/customer/:id/available-credit', (req: Request, res: Response) => {
    customerController.putAmountCredit(req, res)
  })
  router.delete('/customer/:id', (req: Request, res: Response) => {
    customerController.delete(req, res)
  })
}
