import axios from 'axios';
import c from 'ansi-colors';

import { CommandUtils } from './index';

function isEmail(str: string): boolean {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(str);
}

function validate(value: string, required: boolean, type: 'string' | 'email'): string | false {
	if(!value.length && required) {
		return 'This field is required.';
	} else if(type === 'email' && !isEmail(value)) {
		return 'This is not a valid email address.';
	}

	return false;
}

async function readField(
	print: (str: string) => void,
	readLine: () => Promise<string>,
	label: string,
	required: boolean,
	type: 'string' | 'email' = 'string',
): Promise<string> {
	let value;

	while(true) {
		print(c.bold.green(label + ': '));

		value = await (await readLine()).trim();

		const isInvalid = validate(value, required, type);

		if(isInvalid) {
			print(c.bold.red(isInvalid + '\n\n'));
		} else {
			break;
		}
	}

	return value;
}

export async function contact(args: string, { print, printLine, readLine }: CommandUtils): Promise<void> {
	const name = await readField(print, readLine, 'Name', true);
	const email = await readField(print, readLine, 'Email', true, 'email');
	const phone = await readField(print, readLine, 'Phone', false);
	const message = await readField(print, readLine, 'Message', true);

	print('\n');

	async function submit(): Promise<void> {
		await axios.post('/contact', {
			name,
			email,
			phone,
			message,
		})
		.then(() => printLine(c.bold.green('Your enquiry has been submitted.')))
		.catch(async () => {
			print(c.bold.red('Failed to send submission. Do you want to retry (Y\\n)? '));

			const willRetry = (await readLine()).toLowerCase();

			// by default retry / only check for no
			if(willRetry !== 'n' && willRetry !== 'no') {
				await submit();
			}
		});
	}

	await submit();
}