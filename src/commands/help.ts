import { CommandUtils } from './index';

export function help(args: string, { printLine }: CommandUtils): void {
	printLine(args.replace('\\\\n', '\n'));
}