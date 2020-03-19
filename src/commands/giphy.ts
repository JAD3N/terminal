import { CommandUtils } from './index';
import axios, { AxiosResponse } from 'axios';

interface GiphyResponse {
	data: {
		type: string;
		url: string;
		embed_url: string;
	};
}

export async function giphy(tag: string, { printLine }: CommandUtils): Promise<void> {
	if(!tag || tag.length === 0) {
		tag = 'fail';
	}

	axios.get('https://api.giphy.com/v1/gifs/random', {
		params: {
			// eslint-disable-next-line @typescript-eslint/camelcase
			api_key: 'vw3qPqDfxllhPzBSrl6veNUiy08foPrY',
			rating: 'pg-13',
			tag,
		},
	}).then((res: AxiosResponse<GiphyResponse>) => {
		if(!res.data) {
			alert('UH OH!');
			return;
		}

		window.open(res.data.data.embed_url, '_new');
	});

	// console.log(res);
}