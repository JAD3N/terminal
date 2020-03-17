import React from 'react';
import SimpleBar from 'simplebar-react';

import Input from './Input/Input';

interface TerminalState {
	history: Array<string>;
}

class Terminal extends React.Component<{}, TerminalState> {
	outputRef: React.RefObject<HTMLDivElement>;

	interval: number;
	isVisible: boolean;

	constructor(props: {}) {
		super(props);

		this.outputRef = React.createRef();
		this.interval = -1;
		this.isVisible = true;
	}

	componentDidMount(): void {
		// add blinking
		this.interval = window.setInterval(() => {
			if(this.outputRef.current !== null) {
				const blinkers = this.outputRef.current.querySelectorAll<HTMLSpanElement>('.app-terminal--blink:not([data-skip-blink="true"])');
				blinkers.forEach((el: HTMLSpanElement): void => {
					if(this.isVisible) {
						el.style.visibility = '';
					} else {
						el.style.visibility = 'hidden';
					}
				});

				const skipBlinkers = this.outputRef.current.querySelectorAll<HTMLSpanElement>('.app-terminal--blink[data-skip-blink="true"]');
				skipBlinkers.forEach((el: HTMLSpanElement): void => el.removeAttribute('data-skip-blink'));

				this.isVisible = !this.isVisible;
			}
		}, 600);
	}

	componentWillUnmount(): void {
		window.clearInterval(this.interval);
	}

	render(): JSX.Element {
		return (
			<div className="app-terminal">
				<SimpleBar className="app-terminal__scroll-bar">
					<div ref={this.outputRef} className="app-terminal__output">
						<Input isFocused={true} isLocked={false} onExecute={(value: string): void => console.log(value)}/>
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default Terminal;