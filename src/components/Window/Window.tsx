import React from 'react';

interface WindowState {
	title: string;
	isFullscreen: boolean;
}

class Window extends React.Component<{}, WindowState> {

	state = {
		title: 'JADEN.BIO | React Terminal',
		isFullscreen: false,
	};

	constructor(props: {}) {
		super(props);

		this.onClose = this.onClose.bind(this);
		this.onMinimize = this.onMinimize.bind(this);
		this.onFullscreen = this.onFullscreen.bind(this);
	}

	onClose(): void {
		// go back because you can't close tabs
		window.history.back();
	}

	onMinimize(): void {
		// TODO: Add a better explanation.
		alert('This functionality is not supported.');
	}

	onFullscreen(): void {
		this.setState({ isFullscreen: !this.state.isFullscreen });
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
						<button onClick={this.onClose} title="Close" className="app-window__controls-btn app-window__controls--red"></button>
						<button onClick={this.onMinimize} title="Minimize" className="app-window__controls-btn app-window__controls--orange"></button>
						<button onClick={this.onFullscreen} className="app-window__controls-btn app-window__controls--green"></button>
					</div>
					<span className="app-window__title">{this.state.title}</span>
				</div>
				<div className="app-window__body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Window;