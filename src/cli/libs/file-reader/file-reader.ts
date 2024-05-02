import { FileTypes } from '../types/enum/file-types.enum.js';
import { IFileReader } from '../contracts/file-reader.interface.js';
import { ITypeReader } from '../contracts/type-reader.interface.js';
import * as readers from './types-reader/index.js';
import chalk from 'chalk';
import { Callbacks } from '../types/index.js';

type Readers = Map<FileTypes, ITypeReader>;

export class FileReader implements IFileReader {
  private _readers: Readers = this._registrationReaders();

  private _registrationReaders(): Readers {
    const readersMap = new Map();

    for (const Reader of Object.values(readers)) {
      const instans = new Reader();
      readersMap.set(instans.type, instans);
    }

    return readersMap;
  }

  public async read<T>(filePath: string, fileType: FileTypes, callbacks?: Callbacks): Promise<T | never | void> {
    const hasReader = this._readers.has(fileType);

    if (!hasReader) {
      throw new Error(`Чтение файлов с расширением ${chalk.bold.greenBright(fileType)} не реализованна!`);
    }

    const reader = this._readers.get(fileType) as ITypeReader;

    if (callbacks) {
      reader.on('part', callbacks.part);
      reader.once('end', callbacks.end);
    }

    try {
      return await reader.read<T>(filePath);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }
}
