import { useState, useEffect, useCallback, useRef, RefObject } from "react";

export interface ElCoords {
	x: number | null;
	y: number | null;
}
export type TNodeCoords = ElCoords | null;

const useRelativeMousePosition = (nodeRef: RefObject<HTMLElement>) => {
	const elPosition = useRef<TNodeCoords>(null);
	const [relativePos, setRelativePos] = useState({
		elementX: 0,
		elementY: 0,
	});

	const handleMouse = useCallback(
		(e: MouseEvent) => {
			const rect: DOMRect | undefined =
				nodeRef?.current?.getBoundingClientRect();
			const elX = rect?.left;
			const elY = rect?.top;
			const posX = e.clientX - (elX as number);
			const posY = e.clientY - (elY as number);
			setRelativePos({
				elementX: posX,
				elementY: posY,
			});
		},
		[nodeRef]
	);

	// check if our nodeRef is set & extract it's position via DOMRect
	useEffect(() => {
		if (nodeRef.current) {
			const newRef = nodeRef.current;
			elPosition.current = {
				x: newRef?.getBoundingClientRect().left,
				y: newRef?.getBoundingClientRect().top,
			};
		}
	}, [nodeRef]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		window.addEventListener("mousemove", handleMouse);
		return () => {
			isMounted = false;
			window.removeEventListener("mousemove", handleMouse);
		};
	}, [handleMouse]);

	return relativePos;
};

export { useRelativeMousePosition };
