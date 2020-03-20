import axios, { AxiosResponse } from 'axios';
import c from 'ansi-colors';

import { CommandUtils } from './index';

interface Joke {
	id: string;
	joke: string;
}

interface JokeSearchResponse {
	results?: Array<Joke>;
	status: number;
}

interface JokeResponse extends Joke {
	status: number;
}

export async function dadjoke(search: string, { printLine }: CommandUtils): Promise<void> {
	// filter the search terms
	search = search.trim().replace(/[^\w\s]/gi, '');

	if(search.length) {
		printLine(c.reset(`Searching for some jokes using query: "${search}"\n`));

		await axios.get('https://icanhazdadjoke.com/search', {
			headers: { 'Accept': 'application/json' },
			params: { term: search },
		}).then((res: AxiosResponse<JokeSearchResponse>) => {
			if(res.data.status === 200) {
				const results = res.data.results || [];

				if(results.length) {
					printLine(c.blue('We found these for you:'));

					for(let i = 0; i < results.length; i++) {
						printLine(c.reset.bold(`${i + 1}. `) + c.white(results[i]?.joke));
					}
				} else {
					printLine(c.bold.magenta('Couldn\'t find any jokes! (⌣́_⌣̀)'));
				}
			} else {
				printLine(c.bold.red('There was an error! ¯\\_(ツ)_/¯'));
			}
		}).catch(() => printLine(c.bold.red('Failed to send request.')));
	} else {
		printLine(c.reset('Searching for a random joke...\n'));

		await axios.get('https://icanhazdadjoke.com/', {
			headers: { 'Accept': 'application/json' },
		}).then((res: AxiosResponse<JokeResponse>) => {
			if(res.data.status === 200 && res.data.joke) {
				printLine(c.white(res.data.joke));
			} else {
				printLine(c.bold.red('There was an error! ¯\\_(ツ)_/¯'));
			}
		}).catch(() => printLine(c.bold.red('Failed to send request.')));
	}
}