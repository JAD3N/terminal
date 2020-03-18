import React from 'react';
import SimpleBar from 'simplebar-react';
import c from 'ansi-colors';

import Input from './Input/Input';
import * as ANSI from '../../utils/ansi';
import escape from '../../utils/escape';
import commands from '../../commands';

interface TerminalState {
	isError: boolean;
	output: Array<string | null>;
}

class Terminal extends React.Component<{}, TerminalState> {
	outputRef: React.RefObject<HTMLDivElement>;

	interval: number;
	isVisible: boolean;

	constructor(props: {}) {
		super(props);

		this.state = {
			isError: false,
			output: [],
		};

		this.outputRef = React.createRef();

		this.interval = -1;
		this.isVisible = true;

		this.onExecute = this.onExecute.bind(this);
	}

	onExecute(value: string, line: string): void {
		const output: Array<string | null> = [ ...this.state.output, line ];
		let isError = true;

		if(value.length) {
			value = value.trim();

			const spaceIndex = value.indexOf(' ');
			let command, args;

			if(spaceIndex > -1) {
				command = value.substring(0, spaceIndex).toLowerCase();
				args = value.substring(spaceIndex + 1);
			} else {
				command = value.toLowerCase();
				args = '';
			}

			console.log(`command: ${command} args: ${args}`);

			if(command in commands) {
				const exitStatus = commands[command](output, args);
				isError = exitStatus === false;
			} else {
				output.push(c.bold.red(`Command not found: ${command}`));
			}
		}

		// add new line after
		output.push(null);

		this.setState({ output, isError });
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
						{this.state.output.map((line: string | null, index: number) =>
							<div key={index}>
								{line === null ? ' ' : ANSI.format(escape(line))}
							</div>
						)}
						<Input isError={this.state.isError} isFocused={true} isLocked={false} onExecute={this.onExecute}/>
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default Terminal;