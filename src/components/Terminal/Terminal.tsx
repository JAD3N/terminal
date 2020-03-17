import React from 'react';
import c from 'ansi-colors';

import * as ANSI from '../../utils/ansi';

(window as any).c = c;

function Terminal(): JSX.Element {
	return (
		<div>
			{ANSI.format(c.inverse(c.red(c.bgBlue('test')) + c.italic(c.magenta(' this is a test'))))}
		</div>
	);
}

export default Terminal;