import { Request, Response, Router } from 'express'

import { DependencyInjectionContainer as DIC } from './../dependency-injection-container'

export const register = (router: Router) => {
  const container = DIC.getInstance().getContainer()
  const creditController = container.get('App.controllers.CreditController')

  router.get('/credit/:id', (req: Request, res: Response) => {
    creditController.get(req, res)
  })
  router.get('/credit', (req: Request, res: Response) => {
    creditController.getAll(req, res)
  })
  router.get('/credit/customer/:id', (req: Request, res: Response) => {
    creditController.getAllByCustomer(req, res)
  })
  router.post('/credit', (req: Request, res: Response) => {
    creditController.post(req, res)
  })
  router.put('/credit/:id', (req: Request, res: Response) => {
    creditController.put(req, res)
  })
  router.delete('/credit/:id', (req: Request, res: Response) => {
    creditController.delete(req, res)
  })
}
