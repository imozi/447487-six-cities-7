import { FileTypes } from "../types/index.js";

export interface IFileWriter {
  write(filePath: string, row: string, fileType: FileTypes): Promise<void | never>;
}
