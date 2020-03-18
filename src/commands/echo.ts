import { CommandUtils } from './index';

export function echo(args: string, { printLine }: CommandUtils): void {
	printLine(args.replace('\\\\n', '\n'));
}