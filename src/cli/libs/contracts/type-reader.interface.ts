import EventEmitter from 'node:events';
import { FileTypes } from '../types/enum/file-types.enum.js';

export interface ITypeReader extends EventEmitter {
  type: FileTypes;
  read<T>(filePath: string): Promise<T | never | void>;
}
