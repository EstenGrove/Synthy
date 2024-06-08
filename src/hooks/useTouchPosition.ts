import {
	useRef,
	useState,
	useCallback,
	useEffect,
	RefObject,
	UIEvent,
	TouchEvent,
} from "react";

export interface INodeCoords {
	x: number;
	y: number;
}

export interface ITouchCoords {
	elementX: number;
	elementY: number;
}

const useTouchPosition = (nodeRef: RefObject<HTMLElement>) => {
	const elPosition = useRef<INodeCoords>({
		x: 0,
		y: 0,
	});
	const [relativePos, setRelativePos] = useState<ITouchCoords>({
		elementX: 0,
		elementY: 0,
	});

	const handleTouch = (e: TouchEvent<HTMLElement>) => {
		let localX: number;
		let localY: number;

		if (e.touches) {
			const touch = e.touches?.[0];
		}
	};
};
