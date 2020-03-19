import { CommandUtils } from './index';

export function repo(_: string, { printLine }: CommandUtils): void {
	printLine('Opening a new tab to the repository...');
	window.open('https://github.com/JAD3N/terminal', '_new');
}