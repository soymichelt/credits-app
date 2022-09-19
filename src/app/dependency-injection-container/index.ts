import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'

export class DependencyInjectionContainer {
  private container: ContainerBuilder
  private loader: YamlFileLoader

  private static instance: DependencyInjectionContainer

  private constructor() {
    this.container = new ContainerBuilder()
    this.loader = new YamlFileLoader(this.container)

    const applicationPath = `${__dirname}/application.yaml`
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
