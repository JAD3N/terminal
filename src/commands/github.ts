import { CommandUtils } from './index';

export function github(_: string, { printLine }: CommandUtils): void {
	printLine('Opening a new tab to GitHub...');
	window.open('https://github.com/JAD3N/', '_new');
}