import { resolve } from 'node:path';
import { injectable } from 'inversify';
import { Logger as PinoInstans, pino, transport } from 'pino';
import { Logger } from '../../contracts/index.js';
import { getCurrentModuleDirectoryPath } from '../../utils/index.js';

const MODULE_PATH = getCurrentModuleDirectoryPath();
const LOG_FILE_PATH = 'logs/rest.log';
const destination = resolve(MODULE_PATH, '../../../', LOG_FILE_PATH);

const multiTransport = transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination },
      level: 'debug',
    },
    {
      target: 'pino/file',
      level: 'info',
      options: {},
    },
  ],
});

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstans = pino({}, multiTransport);

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }
  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }
  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
