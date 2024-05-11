import 'reflect-metadata';
import { Container } from 'inversify';
import { RestSchema, RestConfig, PinoLogger } from './shared/libs/index.js';
import { Config, Logger } from './shared/contracts/index.js';
import { Component } from './shared/enums/index.js';
import { RestApplication } from './app/rest-app.js';
import chalk from 'chalk';

const bootstrap = async () => {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  try {
    const application = container.get<RestApplication>(Component.RestApplication);
    await application.init();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${chalk.bold.red(error.message)}`);
    }
  }
};

bootstrap();
