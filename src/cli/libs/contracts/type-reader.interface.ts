import { FileTypes } from "../../../shared/enums/file-types.enum.js";

export interface ITypeReader {
  type: FileTypes
  read<T>(filePath: string): T | never;
}
