import React from 'react';
import c from 'ansi-colors';

interface InputProps {
	isError: boolean;
	isFocused: boolean;
	isLocked: boolean;
	onExecute: (value: string, output: string) => void;
}

interface InputState {
	value: string;
	commandHistory: Array<string>;
	commandHistoryIndex: number;
}

class Input extends React.Component<InputProps, InputState> {
	valueRef: React.RefObject<HTMLSpanElement>;
	cursorRef: React.RefObject<HTMLSpanElement>;
	inputRef: React.RefObject<HTMLInputElement>;

	constructor(props: InputProps) {
		super(props);

		this.state = {
			value: '',
			commandHistory: [''],
			commandHistoryIndex: 0,
		};

		this.valueRef = React.createRef<HTMLSpanElement>();
		this.cursorRef = React.createRef<HTMLSpanElement>();
		this.inputRef = React.createRef<HTMLInputElement>();

		this.onType = this.onType.bind(this);
	}

	onType(event: KeyboardEvent): void {
		let { value, commandHistoryIndex } = this.state;
		const commandHistory = [ ...this.state.commandHistory ];

		const fnKeys = [];
		for(let i = 1; i <= 12; i++) {
			fnKeys.push(`F${i}`);
		}

		const blacklist = [
			...fnKeys,
			'ContextMenu', 'Meta', 'NumLock', 'Shift', 'Control', 'Alt',
			'CapsLock', 'ScrollLock', 'Pause', 'Insert', 'Home',
			'PageUp', 'Delete', 'End', 'PageDown',
			'ArrowLeft', 'ArrowRight',
		];

		const { key, ctrlKey, altKey } = event;

		if(!blacklist.includes(key) && !ctrlKey && !altKey) {
			event.preventDefault();

			if(key === 'Backspace') {
				value = value.slice(0, -1);

				commandHistory[0] = value;
				commandHistoryIndex = 0;
			} else if(key === 'Escape') {

			} else if(key === 'ArrowUp') {
				const mappedCommandHistory = commandHistory
					.map((value: string, index: number) => ({ value, index }))
					.filter(({ value }) => value.startsWith(commandHistory[0]));

				let mappedIndex = mappedCommandHistory.findIndex(({ index }) => index === commandHistoryIndex);

				if(mappedCommandHistory.length) {
					mappedIndex = Math.min(mappedIndex + 1, mappedCommandHistory.length - 1);

					const command = mappedCommandHistory[mappedIndex];
					value = commandHistory[commandHistoryIndex = command.index];
				}
			} else if(key === 'ArrowDown') {
				const mappedCommandHistory = commandHistory
					.map((value: string, index: number) => ({ value, index }))
					.filter(({ value }) => value.startsWith(commandHistory[0]));

				let mappedIndex = mappedCommandHistory.findIndex(({ index }) => index === commandHistoryIndex);

				if(mappedCommandHistory.length) {
					mappedIndex = Math.max(mappedIndex - 1, 0);

					const command = mappedCommandHistory[mappedIndex];
					value = commandHistory[commandHistoryIndex = command.index];
				}
			} else if(key === 'Enter') {
				let prefix = c.bold('→');

				if(this.props.isError) {
					prefix = c.red(prefix);
				} else {
					prefix = c.green(prefix);
				}

				this.props.onExecute(value, `${prefix} ${value}`);

				if(value.length) {
					commandHistory[0] = value;
					commandHistory.unshift(value = '');
				}

				commandHistoryIndex = 0;
			} else if(key === 'Tab') {
				// TODO: Implement suggestions
			} else {
				value += key;
				commandHistory[0] = value;
				commandHistoryIndex = 0;
			}
		}

		if(this.cursorRef.current !== null) {
			this.cursorRef.current.setAttribute('data-skip-blink', 'true');
			this.cursorRef.current.style.visibility = '';
		}

		this.setState({ value, commandHistory, commandHistoryIndex });
	}

	componentDidMount(): void {
		window.addEventListener('keydown', this.onType);
	}

	componentWillUnmount(): void {
		window.removeEventListener('keydown', this.onType);
	}

	render(): JSX.Element {
		return (
			<div className="app-terminal__input">
				<span className={[
					'app-terminal--bold',
					this.props.isError ? 'app-terminal--fg-red' : 'app-terminal--fg-green',
				].join(' ')}>&rarr;</span>
				<span>&nbsp;</span>
				<span ref={this.valueRef}>{this.state.value}</span>
				{this.props.isFocused &&
					<span ref={this.cursorRef} className={[
						'app-terminal--blink',
						'app-terminal--inverse',
						'app-terminal--bg-reset',
					].join(' ')}>&nbsp;</span>
				}
				<input ref={this.inputRef} type="text" style={{ display: 'none' }}/>
			</div>
		);
	}
}

export default Input;