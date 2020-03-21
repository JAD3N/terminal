import React from 'react';

interface WindowState {
	title: string;
	isFullscreen: boolean;
	isFocused: boolean;
}

class Window extends React.PureComponent<{}, WindowState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			title: 'JADEN.BIO | React Terminal',
			isFullscreen: false,
			isFocused: true,
		};

		this.close = this.close.bind(this);
		this.minimize = this.minimize.bind(this);
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
	}

	close(): void {
		// go back because you can't close tabs
		window.history.back();
	}

	minimize(): void {
		// TODO: Add a better explanation.
		alert('This functionality is not supported.');
	}

	toggleFullscreen(): void {
		this.setState((state: WindowState) => ({ isFullscreen: !state.isFullscreen }));
	}

	render(): JSX.Element {
		const classes = ['app-window'];

		if (this.state.isFullscreen) {
			classes.push('app-window--fullscreen');
		}

		return (
			<div className={classes.join(' ')}>
				<div className="app-window__header">
					<div className="app-window__controls">
						<button onClick={this.close} title="Close" className="app-window__controls-btn app-window__controls--red"></button>
						<button onClick={this.minimize} title="Minimize" className="app-window__controls-btn app-window__controls--orange"></button>
						<button onClick={this.toggleFullscreen} className="app-window__controls-btn app-window__controls--green"></button>
					</div>
					<span className="app-window__title">{this.state.title}</span>
				</div>
				<div className="app-window__body">{this.props.children}</div>
			</div>
		);
	}
}

export default Window;