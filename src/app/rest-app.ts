import { inject, injectable } from 'inversify';
import { Component } from '../shared/enums/index.js';
import { Config, Logger } from '../shared/contracts/index.js';
import { RestSchema } from '../shared/libs/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}
  public async init() {
    this.logger.info(`🚀 Приложение инициализировано на порту: ${this.config.get('PORT')}!`);
    this.logger.info(`💾 Подключение к базе по адресу: ${this.config.get('DB_HOST')}!`);
  }
}
