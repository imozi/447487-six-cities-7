import { createWriteStream, WriteStream } from 'node:fs';
import { ITypeWriter } from '../../contracts/type-writer.interface.js';
import { FileTypes } from '../../types/index.js';

export class TSVWriter implements ITypeWriter {
  public type: FileTypes = FileTypes.tsv;

  private stream: WriteStream;

  public async write(filePath: string, row: string): Promise<void | never> {
    if (!this.stream) {
      this.stream = createWriteStream(filePath, {
        flags: 'w',
        encoding: 'utf-8',
        autoClose: true,
      });
    }

    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}
