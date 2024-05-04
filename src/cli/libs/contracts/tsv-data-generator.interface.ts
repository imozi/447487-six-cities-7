import { DataGenerateType } from '../types/enum/index.js';

export interface IDataGenerator {
  generate(type: DataGenerateType): string;
}
