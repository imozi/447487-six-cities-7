import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { ITypeReader } from '../../contracts/index.js';
import { FileTypes } from '../../types/enum/index.js';

const CHUNK_SIZE = 16384;

export class TSVReader extends EventEmitter implements ITypeReader {
  public type: FileTypes = FileTypes.tsv;

  public async read<T>(filePath: string): Promise<T | never | void> {
    const tsvStream = createReadStream(resolve(filePath), { highWaterMark: CHUNK_SIZE, encoding: 'utf-8' });

    let bufferData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    tsvStream.on('data', (chunk) => {
      bufferData += chunk;

      while ((nextLinePosition = bufferData.indexOf('\n')) >= 0) {
        const completeRow = bufferData.slice(0, nextLinePosition + 1);
        bufferData = bufferData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('part', completeRow);
      }
    });

    try {
      await new Promise((resolve, reject) => {
        tsvStream.once('end', () => {
          resolve(true);
          this.emit('end');
        });
        tsvStream.once('error', () => reject(false));
      });
    } catch (error: unknown) {
      tsvStream.close();
      throw new Error(`Ошибка чтения файла: ${chalk.bold.greenBright(filePath)}`);
    }
  }
}
