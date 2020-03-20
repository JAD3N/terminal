import axios, { AxiosResponse } from 'axios';
import c from 'ansi-colors';

import { CommandUtils } from './index';

interface GiphyResponse {
	data: {
		type: string;
		url: string;
		bitly_url: string;
		embed_url: string;
		images: {
			[key: string]: {
				width: string;
				height: string;
				mp4?: string;
				mp4_size: string;
				url?: string;
			};
		};
	};
}

export async function giphy(tag: string, { printLine }: CommandUtils): Promise<void> {
	if(!tag || tag.length === 0) {
		tag = 'fail';
	}

	printLine(c.reset('Searching for gif...\n'));

	await axios.get('https://api.giphy.com/v1/gifs/random', {
		params: {
			// eslint-disable-next-line @typescript-eslint/camelcase
			api_key: 'vw3qPqDfxllhPzBSrl6veNUiy08foPrY',
			rating: 'pg-13',
			tag,
		},
	}).then((res: AxiosResponse<GiphyResponse>) => {
		const url = res?.data?.data?.bitly_url;

		if(url !== undefined) {
			printLine(c.green.bold('Found a gif: ') + c.reset(url));

			window.open(url, '_new');
		} else {
			printLine(c.red.bold('Failed to find gif!'));
		}
	}).catch(() => printLine(c.red.bold('Failed to send request.')));
}