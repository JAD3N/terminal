import echo from './echo';
import help from './help';

const commands: { [key: string]: (output: Array<string | null>, args: string) => boolean | void } = {
	'echo': echo,
	'help': help,
}

export default commands;