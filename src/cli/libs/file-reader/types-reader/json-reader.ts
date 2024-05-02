import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import type { ITypeReader } from '../../contracts/type-reader.interface.js';
import { FileTypes } from '../../types/enum/index.js';

const CHUNK_SIZE = 16384;

export class JSONReader extends EventEmitter implements ITypeReader {
  public type: FileTypes = FileTypes.json;

  public async read<T>(filePath: string): Promise<T | never> {
    const jsonStream = createReadStream(resolve(filePath), { highWaterMark: CHUNK_SIZE, encoding: 'utf-8' });

    let bufferData = '';

    jsonStream.on('data', (chunk) => (bufferData += chunk));

    try {
      await new Promise((resolve, reject) => {
        jsonStream.once('end', () => resolve(true));
        jsonStream.once('error', () => reject(false));
      });

      return JSON.parse(bufferData);
    } catch (error: unknown) {
      jsonStream.close();
      throw new Error(`Ошибка чтения файла: ${chalk.bold.greenBright(filePath)}`);
    }
  }
}
