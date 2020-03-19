import { echo } from './echo';
import { help } from './help';
import { contact } from './contact';
import { neofetch } from './neofetch';
import { clear } from './clear';
import { github } from './github';
import { repo } from './repo';
import { giphy } from './giphy';

export interface CommandUtils {
	clear: () => void;
	print: (...strArr: Array<string>) => void;
	printLine: (...strArr: Array<string>) => void;
	readLine: () => Promise<string>;
}

const commands: {
	[key: string]: (args: string, utils: CommandUtils) => boolean | void | Promise<boolean | void>;
} = {
	echo,
	help,
	contact,
	neofetch,
	clear,
	github,
	repo,
	giphy,
}

export default commands;