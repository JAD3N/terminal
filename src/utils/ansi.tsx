import React from 'react';

export enum EscapeCode {
	// Modifiers:
	RESET = 0,
	BOLD = 1,
	FAINT = 2,
	ITALIC = 3,
	UNDERLINE = 4,
	BLINK = 5,
	RAPID_BLINK = 6,
	INVERSE = 7,
	INVISIBLE = 8,
	STRIKE = 9,

	// Resets:
	NORMAL = 22,
	ITALIC_OFF = 23,
	UNDERLINE_OFF = 24,
	BLINK_OFF = 25,
	INVERSE_OFF = 27,
	VISIBLE = 28,
	STRIKE_OFF = 29,

	// Foreground Colors:
	FG_BLACK = 30,
	FG_RED = 31,
	FG_GREEN = 32,
	FG_YELLOW = 33,
	FG_BLUE = 34,
	FG_MAGENTA = 35,
	FG_CYAN = 36,
	FG_WHITE = 37,
	FG_RESET = 39,
	FG_BRIGHT_BLACK = 90,
	FG_BRIGHT_RED = 91,
	FG_BRIGHT_GREEN = 92,
	FG_BRIGHT_YELLOW = 93,
	FG_BRIGHT_BLUE = 94,
	FG_BRIGHT_MAGENTA = 95,
	FG_BRIGHT_CYAN = 96,
	FG_BRIGHT_WHITE = 97,

	// Background Colors:
	BG_BLACK = 40,
	BG_RED = 41,
	BG_GREEN = 42,
	BG_YELLOW = 43,
	BG_BLUE = 44,
	BG_MAGENTA = 45,
	BG_CYAN = 46,
	BG_WHITE = 47,
	BG_RESET = 49,
	BG_BRIGHT_BLACK = 100,
	BG_BRIGHT_RED = 101,
	BG_BRIGHT_GREEN = 102,
	BG_BRIGHT_YELLOW = 103,
	BG_BRIGHT_BLUE = 104,
	BG_BRIGHT_MAGENTA = 105,
	BG_BRIGHT_CYAN = 106,
	BG_BRIGHT_WHITE = 107,
}

export const PREFIX = '\u001b';
export const BLINK = `${PREFIX}[${EscapeCode.BLINK}m`;

export enum ForegroundColor {
	BLACK = EscapeCode.FG_BLACK,
	RED = EscapeCode.FG_RED,
	GREEN = EscapeCode.FG_GREEN,
	YELLOW = EscapeCode.FG_YELLOW,
	BLUE = EscapeCode.FG_BLUE,
	MAGENTA = EscapeCode.FG_MAGENTA,
	CYAN = EscapeCode.FG_CYAN,
	WHITE = EscapeCode.FG_WHITE,

	RESET = EscapeCode.FG_RESET,

	BRIGHT_BLACK = EscapeCode.FG_BRIGHT_BLACK,
	BRIGHT_RED = EscapeCode.FG_BRIGHT_RED,
	BRIGHT_GREEN = EscapeCode.FG_BRIGHT_GREEN,
	BRIGHT_YELLOW = EscapeCode.FG_BRIGHT_YELLOW,
	BRIGHT_BLUE = EscapeCode.FG_BRIGHT_BLUE,
	BRIGHT_MAGENTA = EscapeCode.FG_BRIGHT_MAGENTA,
	BRIGHT_CYAN = EscapeCode.FG_BRIGHT_CYAN,
	BRIGHT_WHITE = EscapeCode.FG_BRIGHT_WHITE,
}

export enum BackgroundColor {
	BLACK = EscapeCode.BG_BLACK,
	RED = EscapeCode.BG_RED,
	GREEN = EscapeCode.BG_GREEN,
	YELLOW = EscapeCode.BG_YELLOW,
	BLUE = EscapeCode.BG_BLUE,
	MAGENTA = EscapeCode.BG_MAGENTA,
	CYAN = EscapeCode.BG_CYAN,
	WHITE = EscapeCode.BG_WHITE,

	RESET = EscapeCode.BG_RESET,

	BRIGHT_BLACK = EscapeCode.BG_BRIGHT_BLACK,
	BRIGHT_RED = EscapeCode.BG_BRIGHT_RED,
	BRIGHT_GREEN = EscapeCode.BG_BRIGHT_GREEN,
	BRIGHT_YELLOW = EscapeCode.BG_BRIGHT_YELLOW,
	BRIGHT_BLUE = EscapeCode.BG_BRIGHT_BLUE,
	BRIGHT_MAGENTA = EscapeCode.BG_BRIGHT_MAGENTA,
	BRIGHT_CYAN = EscapeCode.BG_BRIGHT_CYAN,
	BRIGHT_WHITE = EscapeCode.BG_BRIGHT_WHITE,
}

function getColorName(color: ForegroundColor | BackgroundColor): string | null {
	switch(color) {
		case ForegroundColor.BLACK:
		case BackgroundColor.BLACK:
			return 'black';
		case ForegroundColor.RED:
		case BackgroundColor.RED:
			return 'red';
		case ForegroundColor.GREEN:
		case BackgroundColor.GREEN:
			return 'green';
		case ForegroundColor.YELLOW:
		case BackgroundColor.YELLOW:
			return 'yellow';
		case ForegroundColor.BLUE:
		case BackgroundColor.BLUE:
			return 'blue';
		case ForegroundColor.MAGENTA:
		case BackgroundColor.MAGENTA:
			return 'magenta';
		case ForegroundColor.CYAN:
		case BackgroundColor.CYAN:
			return 'cyan';
		case ForegroundColor.WHITE:
		case BackgroundColor.WHITE:
			return 'white';
		case ForegroundColor.RESET:
		case BackgroundColor.RESET:
			return 'reset';
		case ForegroundColor.BRIGHT_BLACK:
		case BackgroundColor.BRIGHT_BLACK:
			return 'bright-black';
		case ForegroundColor.BRIGHT_RED:
		case BackgroundColor.BRIGHT_RED:
			return 'bright-red';
		case ForegroundColor.BRIGHT_GREEN:
		case BackgroundColor.BRIGHT_GREEN:
			return 'bright-green';
		case ForegroundColor.BRIGHT_YELLOW:
		case BackgroundColor.BRIGHT_YELLOW:
			return 'bright-yellow';
		case ForegroundColor.BRIGHT_BLUE:
		case BackgroundColor.BRIGHT_BLUE:
			return 'bright-blue';
		case ForegroundColor.BRIGHT_MAGENTA:
		case BackgroundColor.BRIGHT_MAGENTA:
			return 'bright-magenta';
		case ForegroundColor.BRIGHT_CYAN:
		case BackgroundColor.BRIGHT_CYAN:
			return 'bright-cyan';
		case ForegroundColor.BRIGHT_WHITE:
		case BackgroundColor.BRIGHT_WHITE:
			return 'bright-white';
		default:
			return null;
	}
}

export interface State {
	fgColor: ForegroundColor;
	bgColor: BackgroundColor;
	weight: EscapeCode.BOLD | EscapeCode.FAINT | EscapeCode.NORMAL;
	italic: boolean;
	underline: boolean;
	blink: EscapeCode.RAPID_BLINK | boolean;
	inverse: boolean;
	invisible: boolean;
	strike: boolean;
}

export function getDefaultState(): State {
	return {
		fgColor: ForegroundColor.RESET,
		bgColor: BackgroundColor.RESET,
		weight: EscapeCode.NORMAL,
		italic: false,
		underline: false,
		blink: false,
		inverse: false,
		invisible: false,
		strike: false,
	};
}

export function apply(state: State, code: number): State {
	if(code === EscapeCode.RESET) {
		state = getDefaultState();
	} else {
		state = { ...state };

		if(code === ForegroundColor.RESET
			|| (code >= ForegroundColor.BLACK && code <= ForegroundColor.WHITE)
			|| (code >= ForegroundColor.BRIGHT_BLACK && code <= ForegroundColor.BRIGHT_WHITE)
		) {
			state.fgColor = code;
		} else if(code === BackgroundColor.RESET
			|| (code >= BackgroundColor.BLACK && code <= BackgroundColor.WHITE)
			|| (code >= BackgroundColor.BRIGHT_BLACK && code <= BackgroundColor.BRIGHT_WHITE)
		) {
			state.bgColor = code;
		} else if(code === EscapeCode.BOLD || code === EscapeCode.FAINT || code === EscapeCode.NORMAL) {
			state.weight = code;
		} else if(code === EscapeCode.ITALIC || code === EscapeCode.ITALIC_OFF) {
			state.italic = code === EscapeCode.ITALIC;
		} else if(code === EscapeCode.UNDERLINE || code === EscapeCode.UNDERLINE_OFF) {
			state.underline = code === EscapeCode.UNDERLINE;
		} else if(code === EscapeCode.BLINK || code === EscapeCode.RAPID_BLINK || code === EscapeCode.BLINK_OFF) {
			state.blink = code === EscapeCode.RAPID_BLINK ? EscapeCode.RAPID_BLINK : (code === EscapeCode.BLINK);
		} else if(code === EscapeCode.INVERSE || code === EscapeCode.INVERSE_OFF) {
			state.inverse = code === EscapeCode.INVERSE;
		} else if(code === EscapeCode.INVISIBLE || code === EscapeCode.VISIBLE) {
			state.invisible = code === EscapeCode.INVISIBLE;
		} else if(code === EscapeCode.STRIKE || code === EscapeCode.STRIKE_OFF) {
			state.strike = code === EscapeCode.STRIKE;
		}
	}

	return state;
}

export function parse(str: string): Array<string | EscapeCode> {
	const pieces: Array<string | EscapeCode> = [];
	let piece: Array<string> = [];
	let isAnsi = false;
	let ansi = '';

	function push(): void {
		if(piece.length) {
			pieces.push(piece.join(''));
		}

		piece = [];
	}

	for(let i = 0; i < str.length; i++) {
		const chr = str[i];

		if(chr === PREFIX) {
			push();

			ansi = '';
			isAnsi = true;

			continue;
		} else {
			if(isAnsi) {
				if(chr === 'm') {
					if(ansi.startsWith('[')) {
						ansi = ansi.substr(1);

						// check it is an integer string
						if(/^\+?(0|[1-9]\d*)$/.test(ansi)) {
							// add number to pieces
							pieces.push(parseInt(ansi));
						}
					}

					isAnsi = false;
					continue;
				} else {
					ansi += chr;
				}
			} else {
				piece.push(chr);

				if(str.length - 1 === i) {
					push();
				}
			}
		}
	}

	return pieces;
}

export interface State {
	fgColor: ForegroundColor;
	bgColor: BackgroundColor;
	weight: EscapeCode.BOLD | EscapeCode.FAINT | EscapeCode.NORMAL;
	italic: boolean;
	underline: boolean;
	blink: EscapeCode.RAPID_BLINK | boolean;
	inverse: boolean;
	invisible: boolean;
	strike: boolean;
}

export function format(str: string | null): Array<JSX.Element> {
	if(str === null) {
		return [];
	}

	const elements: Array<JSX.Element> = [];
	const pieces = parse(str);
	let state = getDefaultState();
	let i = 0;

	for(const piece of pieces) {
		if(typeof piece === 'string') {
			const classes: Array<string> = [];

			let fgColor = getColorName(state.fgColor) || 'reset';
			let bgColor = getColorName(state.bgColor) || 'reset';

			if(state.weight !== EscapeCode.NORMAL) {
				if(state.weight === EscapeCode.BOLD) {
					classes.push('app-terminal--bold');
				} else if(state.weight === EscapeCode.FAINT) {
					classes.push('app-terminal--light');
				}
			}

			if(state.italic) classes.push('app-terminal--italic');
			if(state.underline) classes.push('app-terminal--underline');
			if(state.strike) classes.push('app-terminal--strike');

			if(state.blink) {
				if(state.blink === EscapeCode.RAPID_BLINK) {
					classes.push('app-terminal--rapid-blink');
				} else {
					classes.push('app-terminal--blink');
				}
			}

			if(state.inverse) {
				const tmp = fgColor;

				fgColor = bgColor;
				bgColor = tmp;

				classes.push('app-terminal--inverse');
			}

			if(state.invisible) {
				fgColor = 'transparent';
				bgColor = 'transparent';
			}

			if(fgColor !== 'reset' || state.inverse) classes.push('app-terminal--fg-' + fgColor);
			if(bgColor !== 'reset' || state.inverse) classes.push('app-terminal--bg-' + bgColor);

			const innerHTML = { __html: piece };
			const element = <span
				key={i++}
				className={classes.join(' ')}
				dangerouslySetInnerHTML={innerHTML}
			></span>;

			elements.push(element);
		} else {
			state = apply(state, piece);
		}
	}

	return elements;
}