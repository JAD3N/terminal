import React, { useCallback, useContext, useState } from "react";

import styles from "./styles.module.css";

export interface WindowState {
	isFullscreen: boolean;
	isFocused: boolean;
	toggleFullscreen(): void;
	minimize(): void;
	close(): void;
}

const WindowContext = React.createContext<WindowState>({
	isFullscreen: false,
	isFocused: true,
	toggleFullscreen: () => {},
	minimize: () => {},
	close: () => {},
});

export function useWindow(): WindowState {
	return useContext(WindowContext);
}

export interface WindowProps {
	title: string;
	children: React.ReactNode;
}

export default function Window({ title, children }: WindowProps): JSX.Element {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isFocused, setIsFocused] = useState(true);

	const close = useCallback(() => history.back(), []);
	const minimize = useCallback(
		() => alert("This functionality is not supported."),
		[]
	);
	const toggleFullscreen = useCallback(
		() => setIsFullscreen((isFullscreen) => !isFullscreen),
		[setIsFullscreen]
	);

	return (
		<WindowContext.Provider
			value={{
				isFullscreen,
				isFocused,
				close,
				minimize,
				toggleFullscreen,
			}}
		>
			<div className={styles.root}>
				<div className={styles.header}>
					<div className={styles.controls}>
						<button
							onClick={close}
							title="Close"
							className={styles.button}
							data-variant="red"
						/>
						<button
							onClick={minimize}
							title="Minimize"
							className={styles.button}
							data-variant="orange"
						/>
						<button
							onClick={toggleFullscreen}
							title="Toggle fullscreen"
							className={styles.button}
							data-variant="green"
						/>
					</div>
					<span className={styles.title}>{title}</span>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
		</WindowContext.Provider>
	);
}
