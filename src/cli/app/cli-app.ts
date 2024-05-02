import { ICommand } from '../libs/contracts/index.js';
import { isEmpty } from '../../shared/utils/isEmpty.js';
import * as commands from '../commands/index.js';

type CommandCollection = Map<string, ICommand>;
type ParsedCommand = Record<string, string[]>;

export class CLIApplication {
  private _commands: CommandCollection = this._registrationCommand();

  constructor(private readonly _defaultCommand: string = '--help') {}

  private _registrationCommand(): CommandCollection {
    const commandsMap = new Map();

    for (const Command of Object.values(commands)) {
      const instans = new Command();

      commandsMap.set(instans.getName(), instans);
    }

    return commandsMap;
  }

  private _commandsParser(argv: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const arg of argv) {
      if (arg.startsWith('--')) {
        parsedCommand[arg] = [];
        currentCommand = arg;
      } else if (currentCommand && arg) {
        parsedCommand[currentCommand].push(arg);
      }
    }

    return parsedCommand;
  }

  private _runDefaultCommand() {
    this._commands.get(this._defaultCommand)!.execute();
  }

  private _hasCommand(command: string) {
    const hasCommand = this._commands.has(command);

    if (!hasCommand) {
      this._runDefaultCommand();
    }
  }

  public async runCommands(argv: string[]): Promise<void> {
    const commands = this._commandsParser(argv);

    if (isEmpty(commands)) {
      this._runDefaultCommand();
      return;
    }

    for (const [key, args] of Object.entries(commands)) {
      this._hasCommand(key);
      await this._commands.get(key)?.execute(...args);
    }
  }
}
