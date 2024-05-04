import chalk from 'chalk';
import { IFileWriter, ITypeWriter } from '../contracts/index.js';
import { FileTypes } from '../types/index.js';
import * as writers from './type-writer/index.js';

type Writers = Map<FileTypes, ITypeWriter>;

export class FileWriter implements IFileWriter {
  private _writers: Writers = this._registrationWriters();

  private _registrationWriters(): Writers {
    const writersMap = new Map();

    for (const Writer of Object.values(writers)) {
      const instans = new Writer();
      writersMap.set(instans.type, instans);
    }

    return writersMap;
  }

  public async write(filePath: string, row: string, fileType: FileTypes): Promise<void> {
    const hasWriter = this._writers.has(fileType);

    if (!hasWriter) {
      throw new Error(`Запись файлов с расширением ${chalk.bold.greenBright(fileType)} не реализованна!`);
    }

    try {
      const reader = this._writers.get(fileType) as ITypeWriter;
      await reader.write(filePath, row);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }
}
