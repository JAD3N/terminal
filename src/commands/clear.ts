import { CommandUtils } from './index';

export function clear(_: string, { clear }: CommandUtils): void {
	clear();
}