import { FileTypes } from '../libs/types/enum/file-types.enum.js';
import { ICommand } from '../libs/contracts/command.interface.js';
import { FileReader } from '../libs/file-reader/file-reader.js';
import chalk from 'chalk';

type PackageJSONConfig = {
  version: string;
};

export class VersionCommand implements ICommand {
  constructor(private readonly filePath: string = 'package.json') {}

  private async _readVersion(): Promise<string> {
    const { version } = (await new FileReader().read<PackageJSONConfig>(
      this.filePath,
      FileTypes.json,
    )) as PackageJSONConfig;
    return version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = await this._readVersion();
      console.log(chalk.greenBright(`Версия: ${version}`));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(chalk.red(error.message));
      }
    }
  }
}
