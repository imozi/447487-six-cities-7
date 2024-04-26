import { FileTypes } from '../../../shared/enums/file-types.enum.js';
import { ITypeReader } from './type-reader.interface.js';

export interface IFileReader extends Omit<ITypeReader, 'read'| 'type'> {
  read<T>(filePath: string, fileType: FileTypes): T | never;
}
