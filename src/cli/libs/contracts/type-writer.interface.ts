import { FileTypes } from '../types/enum/file-types.enum.js';

export interface ITypeWriter {
  type: FileTypes;
  write(filePath: string, row: string): Promise<void | never>;
}
