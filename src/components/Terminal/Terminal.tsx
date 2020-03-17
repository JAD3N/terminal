import React from 'react';
import c from 'ansi-colors';

import * as ANSI from '../../utils/ansi';

(window as any).c = c;

function Terminal(): JSX.Element {
	return (
		<div>
			{ANSI.format(c.underline('this is a test'))}
		</div>
	);
}

export default Terminal;