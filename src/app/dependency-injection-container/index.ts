/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection'

import appDI from './app/application.json'
import application from './application.json'
import customerDI from './customer/application.json'

export class DependencyInjectionContainer {
  private container: ContainerBuilder
  private loader: JsonFileLoader

  private static instance: DependencyInjectionContainer

  private constructor() {
    this.container = new ContainerBuilder()
    this.loader = new JsonFileLoader(this.container)

    const applicationPath = `${__dirname}/application.json`
    this.loader.load(applicationPath)
  }

  getContainer(): ContainerBuilder {
    return this.container
  }

  static getInstance(): DependencyInjectionContainer {
    if (DependencyInjectionContainer.instance) {
      return DependencyInjectionContainer.instance
    }

    DependencyInjectionContainer.instance = new DependencyInjectionContainer()
    return DependencyInjectionContainer.instance
  }
}
