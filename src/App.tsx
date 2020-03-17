import React from 'react';
import Window from './components/Window/Window';
import Terminal from './components/Terminal/Terminal';

function App(): JSX.Element {
	return (
		<div className="app">
			<Window>
				<Terminal/>
			</Window>
		</div>
	);
}

export default App;
