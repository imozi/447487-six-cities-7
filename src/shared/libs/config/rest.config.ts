import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Config, Logger } from '../../contracts/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../enums/index.js';

const parsedOutput = config();
@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    if (parsedOutput.error) {
      throw new Error('Ошибка чтения файла .env. Файла не существует!');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('👌 Чтение .env прошло успешно!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
