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
	targetElRef?: RefObject<HTMLElement> | null
): boolean => {
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			console.log("Was Pressed");
			if (e.key === targetKey) {
				setIsPressed(true);
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
	}, [targetElRef, targetKey]);

	return isPressed;
};

export { useKeyPress };
