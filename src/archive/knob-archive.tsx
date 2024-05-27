import {
	useMemo,
	useState,
	useEffect,
	useRef,
	RefObject,
	MouseEvent,
	TouchEvent,
} from "react";
import styles from "../../css/controls/Knob.module.scss";
import { radiansToDegrees } from "../../utils/utils_canvas";

type KnobSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	val: string | number;
	name?: string;
	id?: string;
	size?: KnobSize;
	min?: number;
	max?: number;
	minDeg?: number;
	maxDeg?: number;
};

// Range: 45-325 (Reduce available rotation by 70degs, which is 45 degrees from each bound)
// Default Range: 0-360
// - min: 0 + (70 / 2) = 35
// - max: 360 - (70 / 2) = 325

// -132deg to 132deg

// Adopted from: https://jsfiddle.net/gTDdp/16/
// https://jsfiddle.net/wRexz/3/

// Determines the center of the knob, so we can rotate around the center
const getKnobCenter = (knobRef: RefObject<HTMLDivElement>): Coords => {
	const knob = knobRef?.current as HTMLDivElement;
	const { offsetLeft, offsetTop, clientHeight, clientWidth } = knob;

	const x = offsetLeft + clientWidth / 2;
	const y = offsetTop + clientHeight / 2;

	return { x, y };
};

interface Coords {
	x: number;
	y: number;
}

const sizes = {
	XSM: ".6",
	SM: ".8",
	MD: "1",
	LG: "1.2",
	XLG: "1.4",
};

const Knob = ({
	// min = 60,
	// max = 320,
	min = 0,
	max = 10,
	// minDeg = 0,
	// maxDeg = 360,
	minDeg = 35,
	maxDeg = 325,
	name = "knob",
	id = "knob",
	size = "XSM",
}: Props) => {
	const isDragging = useRef<boolean>(false);
	const knobRef = useRef<HTMLDivElement>(null);
	const knobCenter = useRef<Coords>({ x: 0, y: 0 }); // knob's center based off page position, size and offsetTop etc
	const mousePosition = useRef<Coords>({ x: 0, y: 0 }); // stores mousePos (eg either current or previous)
	// 60-320
	// const [value, setValue] = useState<number>(0);
	const [value, setValue] = useState<number>(min);
	const knobPos = useMemo(() => {
		return {
			// transform: `rotate(${value}turn)`,
			// transform: `rotate(${-value}rad)`,
			transform: `scale(${sizes[size]}) rotate(${value}deg)`,
		};
	}, [size, value]);

	const handleMouseDown = (e: MouseEvent) => {
		isDragging.current = true;
		const knob = knobRef.current as HTMLDivElement;
		const center = knobCenter.current as Coords;
		const mouse = mousePosition.current as Coords;

		// const {
		// 	offsetTop: top,
		// 	offsetLeft: left,
		// 	offsetWidth: width,
		// 	offsetHeight: height,
		// } = knob;
		// const { left, top, width, height } = getElementBounds(knobRef);
		// center.x = left + width / 2;
		// center.y = top + height / 2;

		// calculate center position of knob so we can rotate around it as the main axis
		const centerOffset = getKnobCenter(knobRef);
		center.x = centerOffset.x;
		center.y = centerOffset.y;
		// set mouse coords
		mouse.x = e.clientX - center.x;
		mouse.y = e.clientY - center.y;
	};

	const handleMove = (e: MouseEvent) => {
		if (!isDragging.current) return;
		const mouse: Coords = mousePosition.current;

		// current mouse position
		const curX = e.clientX as number;
		const curY = e.clientY as number;

		const radians: number = Math.atan2(curY - mouse.y, curX - mouse.x);
		const degrees: number = radiansToDegrees(radians);

		// scale help to lessen the mousemovent required for rotational changes
		const scale: number = 10;
		const newDegs: number = degrees * scale;

		let newVal = newDegs;
		if (newVal < minDeg) newVal = 35;
		if (newVal > maxDeg) newVal = 325;

		setValue(newVal);
	};

	const handleMouseUp = () => {
		isDragging.current = false;
	};

	// TOUCH
	const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
		isDragging.current = true;
		const touch = e.touches[0];

		// const knob = knobRef.current as HTMLDivElement;
		const center = knobCenter.current as Coords;
		const mouse = mousePosition.current as Coords;

		const centerOffset = getKnobCenter(knobRef);
		center.x = centerOffset.x;
		center.y = centerOffset.y;
		// set mouse coords
		mouse.x = touch.clientX - center.x;
		mouse.y = touch.clientY - center.y;
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging.current) return;
		const knob = knobRef.current as HTMLDivElement;
		const mouse: Coords = mousePosition.current;
		const touch = e.touches[0];
		// current mouse position
		const curX = touch.clientX as number;
		const curY = touch.clientY as number;
		const newX = curX - mouse.x;
		const newY = curY - mouse.y;

		const radians: number = Math.atan2(newY, newX);
		const degrees: number = radiansToDegrees(radians);

		// scale help to lessen the mousemovent required for rotational changes
		const scale: number = 10;
		const newDegs: number = degrees * scale;

		// let newVal = newDegs % 360;
		let newVal = newDegs % 360;
		if (newVal <= 0) newVal = 0;
		if (newVal >= 360) newVal = 360;

		setValue(newVal);
	};

	const handleTouchEnd = () => {
		isDragging.current = false;
	};

	// add event listeners
	useEffect(() => {
		// MOUSE EVENTS
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
		// TOUCH EVENTS
		document.addEventListener("touchstart", handleTouchStart);
		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);

		return () => {
			// MOUSE EVENTS
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMove);

			// TOUCH EVENTS
			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={styles.Knob}
			// onMouseDown={handleMouseDown}
			// onMouseUp={handleMouseUp}
			// onMouseMove={handleMove}
			// onMouseOut={handleMouseOut}
			style={knobPos}
			ref={knobRef}
		>
			<div className={styles.Knob_handle}></div>
		</div>
	);
};

export default Knob;
