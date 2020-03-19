import { CommandUtils } from './index';

export async function giphy(tag: string, { printLine }: CommandUtils): Promise<void> {
	if(!tag || tag.length === 0) {
		tag = 'fail';
	}

	const res = await fetch('https://api.giphy.com/v1/gifs/random', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			// eslint-disable-next-line @typescript-eslint/camelcase
			api_key: 'vw3qPqDfxllhPzBSrl6veNUiy08foPrY',
			rating: 'pg-13',
			tag,
		}),
	})
		.then((res) => res.json())
		.catch(() => null);

	console.log(res);
}