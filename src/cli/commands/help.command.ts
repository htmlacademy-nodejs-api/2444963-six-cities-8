import { Command } from './command.interface.js';
import chalk from 'chalk';
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(..._parameters: string[]): void {
    console.info(`
        ${ chalk.bold('Программа для подготовки данных для REST API сервера.')}
        ${chalk.dim.red('Пример:')}
            ${chalk.green('cli.js --<command> [--arguments]')}
        ${chalk.dim.red('Комманды:')}
            ${chalk.green('--version')}:                        ${chalk.italic.yellow('# выводит номер версии')}
            ${chalk.green('--help')}:                           ${chalk.italic.yellow('# выводит текст с описанием cli')}
            ${chalk.green('--import <path>')}:                  ${chalk.italic.yellow('# импортирует данные из TSV')}
            ${chalk.green('--generate <n> <path> <url> ')}:     ${chalk.italic.yellow('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
