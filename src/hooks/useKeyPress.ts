import { useState, useEffect, RefObject } from "react";

export type TKeyPressOpts = {
	nodeRef?: RefObject<HTMLElement> | null;
	keyup?: (e: KeyboardEvent) => void;
	keydown?: (e: KeyboardEvent) => void;
};

// Not currently in-use, update props structure to object if API gets changed.
export interface IHookOpts {
	nodeRef?: RefObject<HTMLElement> | null;
	onPress?: () => void;
}

const useKeyPress = (targetKey: string, options: IHookOpts): boolean => {
	const { nodeRef, onPress } = options;
	const [isPressed, setIsPressed] = useState(false);

	// add event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				e.preventDefault();
				setIsPressed(true);

				// call handler, if exists
				if (onPress) {
					onPress();
				}
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				e.preventDefault();
				setIsPressed(false);
			}
		};

		// we check if a node ref was provided & apply our event listeners to it...
		// ...otherwise we add them to the window object
		let node: HTMLElement;
		if (nodeRef?.current) {
			node = nodeRef.current;
			node.addEventListener("keyup", handleKeyUp);
			node.addEventListener("keydown", handleKeyDown);
		} else {
			// ...otherwise we add them to the window object
			window.addEventListener("keyup", handleKeyUp);
			window.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			isMounted = false;
			if (node) {
				const el = node as HTMLElement;
				el.removeEventListener("keydown", handleKeyDown);
				el.removeEventListener("keyup", handleKeyUp);
			} else {
				// ...otherwise we add them to the window object
				window.removeEventListener("keydown", handleKeyDown);
				window.removeEventListener("keyup", handleKeyUp);
			}
		};
	}, [onPress, nodeRef, targetKey]);

	return isPressed;
};

export { useKeyPress };
