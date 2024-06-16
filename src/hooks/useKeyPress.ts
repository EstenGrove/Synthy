import { useState, useEffect, RefObject } from "react";

export type TKeyPressOpts = {
	targetElRef?: RefObject<HTMLElement> | null;
	keyup?: (e: KeyboardEvent) => void;
	keydown?: (e: KeyboardEvent) => void;
};

export type TListeners = {
	keyup: (e: KeyboardEvent) => void;
	keydown: (e: KeyboardEvent) => void;
};

const useKeyPress = (
	targetKey: string,
	targetElRef?: RefObject<HTMLElement> | null,
	onPress?: () => void
): boolean => {
	const [isPressed, setIsPressed] = useState(false);

	// add event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				setIsPressed(true);

				// call handler, if exists
				if (onPress) {
					onPress();
				}
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				setIsPressed(false);
			}
		};

		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			isMounted = false;
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [onPress, targetElRef, targetKey]);

	return isPressed;
};

export { useKeyPress };
