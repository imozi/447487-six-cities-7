import chalk from 'chalk';
import { ICommand } from '../libs/contracts/command.interface.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${chalk.bold.blueBright('Программа для подготовки данных для REST API сервера.')}

    ${chalk.bold.yellowBright('Пример:')}

        ${chalk.greenBright('cli.js --<command> [--arguments]')}

    ${chalk.bold.yellowBright('Команды:')}

        ${chalk.greenBright('--version:')}                   ${chalk.bold.blueBright('# выводит номер версии')}
        ${chalk.greenBright('--help:')}                      ${chalk.bold.blueBright('# печатает этот текст')}
        ${chalk.greenBright('--import <path>:')}             ${chalk.bold.blueBright('# импортирует данные из TSV')}
        ${chalk.greenBright('--generate <n> <path> <url>')}  ${chalk.bold.blueBright(
      '# генерирует произвольное количество тестовых данных',
    )}
    `);
  }
}
