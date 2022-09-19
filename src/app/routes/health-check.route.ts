import { Request, Response, Router } from 'express'

import { DependencyInjectionContainer as DIC } from './../dependency-injection-container'
// import container from './../dependency-injection-container'

export const register = (router: Router) => {
  const container = DIC.getInstance().getContainer()
  const healthCheckController = container.get('App.controllers.HealthCheckController')

  router.get('/health-check', (req: Request, res: Response) => {
    healthCheckController.get(req, res)
  })
}
