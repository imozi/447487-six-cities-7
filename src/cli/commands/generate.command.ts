import chalk from 'chalk';
import got from 'got';
import { MockServerData } from '../../shared/types/index.js';
import { ICommand } from '../libs/contracts/command.interface.js';
import { TSVDataGenerator } from '../libs/tsv-data-generator/tsv-data-generator.js';
import { DataGenerateType } from '../libs/types/enum/data-generate-type.enum.js';
import { FileWriter } from '../libs/file-writer/file-writer.js';
import { FileTypes } from '../libs/types/index.js';

export class GenerateCommand implements ICommand {
  private initialMockData: MockServerData;

  getName(): string {
    return '--generate';
  }

  private async _loadMockData(url: string) {
    try {
      return await got.get(url).json<MockServerData>();
    } catch (error) {
      throw new Error(`Не удалось загрузить данные по url: ${chalk.greenBright(url)}`);
    }
  }

  private async _write(count: number, filePath: string) {
    const tsvGenerator = new TSVDataGenerator(this.initialMockData);
    const fileWriter = new FileWriter();

    for (let i = 0; i < count; i++) {
      const data = tsvGenerator.generate(DataGenerateType.offer);

      try {
        await fileWriter.write(filePath, data, FileTypes.tsv);
      } catch (error) {
        if (error instanceof Error) {
          console.log(chalk.bold.redBright(error.message));
        }
        break;
      }
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;

    try {
      this.initialMockData = await this._loadMockData(url);
      this._write(+count, filePath);
      console.log(
        chalk.green(`Файл ${chalk.yellowBright(filePath.substring(filePath.lastIndexOf('/') + 1))} успешно создан!`),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.bold.redBright(error.message));
      }
    }
  }
}
