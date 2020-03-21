import React from 'react';

interface InputProps {
	hidden: boolean;
	execute: (value: string) => void;
	scrollToBottom: () => void;
}

interface InputState {
	value: string;
	commandHistory: Array<string>;
	commandHistoryIndex: number;
	isFocused: boolean;
}

function isTouchDevice(): boolean {
	try {
		document.createElement('TouchEvent');
		return true;
	} catch {
		return false;
	}
}

class Input extends React.Component<InputProps, InputState> {
	valueRef: React.RefObject<HTMLSpanElement>;
	cursorRef: React.RefObject<HTMLSpanElement>;
	inputRef: React.RefObject<HTMLInputElement>;

	constructor(props: InputProps) {
		super(props);

		this.state = {
			value: '',
			commandHistory: [ '', 'neofetch' ],
			commandHistoryIndex: 0,
			isFocused: false,
		};

		this.valueRef = React.createRef<HTMLSpanElement>();
		this.cursorRef = React.createRef<HTMLSpanElement>();
		this.inputRef = React.createRef<HTMLInputElement>();

		this.onType = this.onType.bind(this);
		this.onWindowClick = this.onWindowClick.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onWindowClick(event: MouseEvent): void {
		if(isTouchDevice()) {
			event.preventDefault();

			if(!this.state.isFocused) {
				this.inputRef.current?.focus();
				this.setState({ isFocused: true });
			} else {
				this.inputRef.current?.blur();
				this.setState({ isFocused: false });
			}
		}
	}

	onInputChange(event: React.FormEvent<HTMLInputElement>): void {
		event.preventDefault();

		const input = event.currentTarget;
		const value = input.value;

		this.setState({ value: value });
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
			'Unidentified',
		];

		const { key, ctrlKey, altKey } = event;

		if(!blacklist.includes(key) && !ctrlKey && !altKey) {
			// event.preventDefault();

			if(key === 'Backspace') {
				value = value.slice(0, -1);

				commandHistory[0] = value;
				commandHistoryIndex = 0;
			} else if(key === 'Escape') {
				commandHistory[0] = value = '';
				commandHistoryIndex = 0;
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
				if(this.inputRef.current !== null) {
					this.inputRef.current.value = '';
				}

				this.props.execute(value);

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
		window.addEventListener('click', this.onWindowClick);
	}

	componentDidUpdate(): void {
		this.props.scrollToBottom();
	}

	componentWillUnmount(): void {
		window.removeEventListener('keydown', this.onType);
		window.removeEventListener('click', this.onWindowClick);
	}

	render(): JSX.Element | null {
		if(this.props.hidden) {
			return null;
		}

		return (
			<span className="app-terminal__input">
				<span ref={this.valueRef}>
					{this.state.value}
					<span ref={this.cursorRef} className={[
						'app-terminal--blink',
						'app-terminal--inverse',
						'app-terminal--bg-reset',
					].join(' ')}>&nbsp;</span>
				</span>
				<input
					ref={this.inputRef}
					onChange={this.onInputChange.bind(this)}
					type="text"
					autoCorrect="off"
					autoCapitalize="off"
					autoComplete="off"
				/>
			</span>
		);
	}
}

export default Input;