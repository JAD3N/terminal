import React from 'react';
import SimpleBar from 'simplebar-react';
import c from 'ansi-colors';

import Input from './Input/Input';
import * as ANSI from '../../utils/ansi';
import escape from '../../utils/escape';
import commands from '../../commands';

interface TerminalState {
	output: Array<string>;
}

const PREFIX = '\n→';

class Terminal extends React.PureComponent<{}, TerminalState> {
	outputRef: React.RefObject<HTMLDivElement>;
	scrollableRef: React.RefObject<HTMLDivElement>;

	interval: number;
	isScrolling: boolean;
	isVisible: boolean;
	isLocked: boolean;
	listeners: Array<(str: string) => void>;

	constructor(props: {}) {
		super(props);

		this.state = { output: [] };

		// do after assigning state
		this.state.output.push(this.getPrefix());

		this.outputRef = React.createRef();
		this.scrollableRef = React.createRef();

		this.interval = -1;
		this.isScrolling = false;
		this.isVisible = true;
		this.isLocked = false;
		this.listeners = [];

		// used for command utils
		this.clear = this.clear.bind(this);
		this.print = this.print.bind(this);
		this.printLine = this.printLine.bind(this);
		this.readLine = this.readLine.bind(this);

		// used for components
		this.execute = this.execute.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);

		// used for listeners
		this.onScroll = this.onScroll.bind(this);
	}

	onScroll(): void {
		if(!this.scrollableRef.current) {
			return;
		}

		const el = this.scrollableRef.current;
		this.isScrolling = el.scrollHeight - el.scrollTop !== el.clientHeight;
	}

	getPrefix(error = false): string {
		const prefix = c.bold(error ? c.red(PREFIX) : c.green(PREFIX));
		return `${prefix} `;
	}

	clear(): void {
		this.setState({ output: [ ] });
	}

	print(...strArr: Array<string>): void {
		this.setState((state: TerminalState) => ({ output: [ ...state.output, ...strArr ] }));
	}

	printLine(...strArr: Array<string>): void {
		this.print(...strArr.map((str: string) => str + '\n'));
	}

	readLine(): Promise<string> {
		return new Promise<string>((resolve: (str: string) => void) => this.listeners.push(resolve));
	}

	async execute(value: string): Promise<void> {
		this.printLine(value);

		this.listeners.forEach((callback: (str: string) => void) => callback(value));
		this.listeners = [];

		if(!this.isLocked) {
			let error = true;

			// prevent input from calling command
			this.isLocked = true;

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

				if(command in commands) {
					const exitStatus = await commands[command](args, {
						clear: this.clear,
						print: this.print,
						printLine: this.printLine,
						readLine: this.readLine,
					});

					error = exitStatus === false;
				} else {
					this.printLine(c.bold.red(`Command not found: ${command}`));
				}
			}

			this.isLocked = false;
			this.print(this.getPrefix(error));
		}
	}

	scrollToBottom(): void {
		const el = this.scrollableRef.current;
		if(el) {
			el.scrollTop = el.scrollHeight;
			this.isScrolling = false;
		}
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

		setTimeout(() => {
			this.execute('neofetch');
		}, 100);

		window.addEventListener('resize', this.scrollToBottom);
	}

	componentDidUpdate(): void {
		if(!this.isScrolling) {
			this.scrollToBottom();
		}
	}

	componentWillUnmount(): void {
		window.clearInterval(this.interval);
		window.removeEventListener('resize', this.scrollToBottom);

		// remove scroll event listener
		this.scrollableRef.current?.removeEventListener('scroll', this.onScroll);
	}

	render(): JSX.Element {
		return (
			<div className="app-terminal">
				<SimpleBar scrollableNodeProps={{ ref: this.scrollableRef }} className="app-terminal__scroll-bar">
					<div ref={this.outputRef} className="app-terminal__output">
						{this.state.output.map((line: string | null, index: number) =>
							<span key={index}>
								{line === null ? ' ' : ANSI.format(escape(line))}
							</span>
						)}
						<Input
							hidden={false}
							execute={this.execute}
							scrollToBottom={this.scrollToBottom}
						/>
					</div>
				</SimpleBar>
			</div>
		);
	}
}

export default Terminal;