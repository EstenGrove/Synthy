import { useRef, useState, useCallback, useEffect, RefObject } from "react";

export interface INodeCoords {
	x: number;
	y: number;
}

export interface ITouchCoords {
	elementX: number;
	elementY: number;
}

// Records the current touch position relative to a given element
const useRelativeTouchPosition = (nodeRef: RefObject<HTMLElement>) => {
	const elPosition = useRef<INodeCoords>({ x: 0, y: 0 });
	const [relativePos, setRelativePos] = useState<ITouchCoords>({
		elementX: 0,
		elementY: 0,
	});

	const handleTouch = useCallback(
		(e: TouchEvent) => {
			// get DOM node's relative coords (in case they've changed since last setting it)
			const nodeEl = nodeRef.current as HTMLElement;
			const rect: DOMRect = nodeEl.getBoundingClientRect();
			const elX = rect?.left as number;
			const elY = rect?.top as number;

			if (e.touches) {
				const touch = e.touches?.[0];
				const touchX: number = touch.clientX;
				const touchY: number = touch.clientY;
				// get relative position from offset
				const newX = touchX - elX;
				const newY = touchY - elY;

				setRelativePos({
					elementX: newX,
					elementY: newY,
				});
			}
		},
		[nodeRef]
	);

	// check if our nodeRef is set & extract it's position via DOMRect
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// set node & dimensions
		if (nodeRef.current) {
			const newRef = nodeRef.current;
			elPosition.current = {
				x: newRef?.getBoundingClientRect().left,
				y: newRef?.getBoundingClientRect().top,
			};
		}

		return () => {
			isMounted = false;
		};
	}, [nodeRef]);

	// add event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		window.addEventListener("touchmove", handleTouch);

		return () => {
			isMounted = false;
			window.removeEventListener("touchmove", handleTouch);
		};
	}, [handleTouch]);

	return relativePos;
};

export { useRelativeTouchPosition };
