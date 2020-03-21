import { CommandUtils } from './index';
import c from 'ansi-colors';

const DOB = '1999/10/08';

function getAge(): number {
	const dob = new Date(DOB).getTime();
	const diff = new Date().getTime() - dob;

	return Math.floor(diff / 31557600000);
}

export function neofetch(args: string, { printLine }: CommandUtils): Promise<void> {
	let letterJ, letterB;

	if(window.innerWidth < 800) {
		letterJ = [
			'       __ ',
			'      |  |',
			'      |  |',
			'.--.  |  |',
			'|  `--\'  |',
			' \\______/ ',
		];

		letterB = [
			'.______  ',
			'|   _  \\ ',
			'|  |_)  |',
			'|   _  < ',
			'|  |_)  |',
			'|______/ ',
		];
	} else {
		letterJ = [
			'          JJJJJJJJJJJ',
			'          J:::::::::J',
			'          J:::::::::J',
			'          JJ:::::::JJ',
			'            J:::::J  ',
			'            J:::::J  ',
			'            J:::::J  ',
			'            J:::::j  ',
			'            J:::::J  ',
			'JJJJJJJ     J:::::J  ',
			'J:::::J     J:::::J  ',
			'J::::::J   J::::::J  ',
			'J:::::::JJJ:::::::J  ',
			' JJ:::::::::::::JJ   ',
			'   JJ:::::::::JJ     ',
			'     JJJJJJJJJ       ',
		];

		letterB = [
			'BBBBBBBBBBBBBBBBB   ',
			'B::::::::::::::::B  ',
			'B::::::BBBBBB:::::B ',
			'BB:::::B     B:::::B',
			'  B::::B     B:::::B',
			'  B::::B     B:::::B',
			'  B::::BBBBBB:::::B ',
			'  B:::::::::::::BB  ',
			'  B::::BBBBBB:::::B ',
			'  B::::B     B:::::B',
			'  B::::B     B:::::B',
			'  B::::B     B:::::B',
			'BB:::::BBBBBB::::::B',
			'B:::::::::::::::::B ',
			'B::::::::::::::::B  ',
			'BBBBBBBBBBBBBBBBB   ',
		];
	}

	const info = [
		'',
		'',
		c.bold.red('OS: ') + c.reset('JADEN.BIO'),
		c.bold.red('Kernel: ') + c.reset('JavaScript'),
		c.bold.red('Shell: ') + c.reset('React'),
		c.bold.red('Resolution: ') + c.reset(window.innerWidth + 'x' + window.innerHeight),
		'',
		c.bold.red('Name: ') + c.reset('Jaden Buchan'),
		c.bold.red('Age: ') + c.reset(getAge() + ''),
		c.bold.red('Date of Birth: ') + c.reset('October 8th 1999'),
		c.bold.red('Likes: ') + c.reset('Rust, React, TypeScript...'),
		'',
		c.white('Wanna get in touch? Type: ') + c.yellow.underline.bold('contact'),
		c.magenta('Type ') + c.yellow.underline.bold('help') + c.magenta(' for more commands!'),
		'',
		'',
	];

	const lines: Array<string> = [];

	if(window.innerWidth < 800) {
		for(let i = 0; i < 6; i++) {
			lines.push(c.bold(c.blue(letterJ[i]) + ' ' + c.green(letterB[i])));
		}

		lines.push('\n');

		for(let i = 2; i < 14; i++) {
			lines.push(info[i]);
		}
	} else {
		for(let i = 0; i < 16; i++) {
			lines.push(c.bold(c.blue(letterJ[i]) + ' ' + c.green(letterB[i])) + '     ' + info[i]);
		}
	}

	return new Promise((resolve: () => void) => {
		let i = 0;
		const interval = setInterval(function() {
			printLine(lines[i++]);

			if(i >= lines.length) {
				clearInterval(interval);
				resolve();
			}
		}, 25);
	});
}