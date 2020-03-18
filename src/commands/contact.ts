import { CommandUtils } from './index';
import c from 'ansi-colors';

async function readField(
	print: (str: string) => void,
	readLine: () => Promise<string>,
	label: string,
	required: boolean,
	type: 'string' | 'email' = 'string'
): Promise<string> {
	let value;

	while(value === undefined || (value.length === 0 && required)) {
		print(c.bold.green(label + ': '));

		value = await (await readLine()).trim();

		if(value.length === 0 && required) {
			print(c.bold.red('This field is required.\n\n'));
		}
	}

	return value;
}

export async function contact(args: string, { print, readLine }: CommandUtils): Promise<void> {
	const fullName = await readField(print, readLine, 'Full Name', true);
	const email = await readField(print, readLine, 'Email', true, 'email');
	const phone = await readField(print, readLine, 'Phone', false);
	const message = await readField(print, readLine, 'Message', true);
}