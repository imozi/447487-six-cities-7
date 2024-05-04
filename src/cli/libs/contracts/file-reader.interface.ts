import { Callbacks, FileTypes } from '../types/index.js';

export interface IFileReader {
  read<T>(filePath: string, fileType: FileTypes, callbacks?: Callbacks): Promise<T | never | void>;
}
