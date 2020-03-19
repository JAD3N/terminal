import { CommandUtils } from './index';
import c from 'ansi-colors';

export function help(_: string, { printLine }: CommandUtils): void {
	printLine(
		c.bold.white('Commands:'),
		c.reset('  help\t\tDisplay commands and usage.'),
		c.reset('  contact\tGet in touch.'),
		c.reset('  clear\t\tClear the terminal output.'),
		c.reset('  neofetch\tDisplay information about the system.'),
		c.reset('  echo\t\tPrint to the terminal the arguments.'),
		c.reset('  github\tOpen a new tab to my GitHub.'),
		c.reset('  repo\t\tOpen a new tab to the Git repository.'),
	);
}