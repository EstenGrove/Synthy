import {
	useState,
	useEffect,
	ReactNode,
	useRef,
	RefObject,
	TouchList,
	TouchEvent,
} from "react";
import styles from "../../css/controls/CustomFader.module.scss";
import { clamp } from "../../utils/utils_shared";

type SizeName = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Sizes = {
	[key in SizeName]: {
		transform: string;
	};
};

const sizes: Sizes = {
	XSM: {
		transform: "scale(0.6)",
	},
	SM: {
		transform: "scale(0.8)",
	},
	MD: {
		transform: "scale(1)",
	},
	LG: {
		transform: "scale(1.2)",
	},
	XLG: {
		transform: "scale(1.4)",
	},
};

const Ticks = () => {
	return (
		<div data-label="ticks" className={styles.Ticks}>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
			<div data-label="tick" className={styles.Ticks_tick}></div>
		</div>
	);
};

type TrackProps = {
	trackRef: RefObject<HTMLDivElement>;
	children?: ReactNode;
};
const Track = ({ trackRef, children }: TrackProps) => {
	return (
		<div ref={trackRef} className={styles.Track}>
			{children}
		</div>
	);
};

type ThumbProps = {
	thumbRef: RefObject<HTMLDivElement>;
	level: string | number;
	color?: string;
	handleMouseDown: (e: MouseEvent) => void;
	handleTouchStart: (e: TouchEvent) => void;
};

const FaderThumb = ({
	thumbRef,
	level,
	color,
	handleMouseDown,
	handleTouchStart,
}: ThumbProps) => {
	return (
		<div
			ref={thumbRef}
			data-level={level}
			className={styles.FaderThumb}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
			style={{ top: `${level}%` }}
		>
			<div
				className={styles.FaderThumb_stripe}
				style={{ backgroundColor: color }}
			></div>
		</div>
	);
};

type Props = {
	initialVal?: string | number;
	stripeColor?: string;
	min?: number;
	max?: number;
	size?: SizeName;
};

export interface IOffset {
	offsetX: number;
	offsetY: number;
}

// Calculates the offset position for the slider thumb of the fader
const getInitialOffset = (thumbRef: RefObject<HTMLDivElement>): IOffset => {
	if (!thumbRef.current) return { offsetX: 0, offsetY: 0 };

	const thumb = thumbRef.current as HTMLDivElement;
	const offsetX = thumb.offsetLeft + thumb.offsetWidth / 2;
	const offsetY = thumb.offsetTop + thumb.offsetHeight / 2;

	return {
		offsetX,
		offsetY,
	};
};

const getElementBounds = (elRef: RefObject<HTMLDivElement>): DOMRect | null => {
	if (!elRef.current) return null;
	const rect = elRef.current.getBoundingClientRect();

	return rect;
};

interface Dimensions {
	thumbHeight: number;
	trackHeight: number;
}
// calculates new thumb position based off it's dimensions & the current mouse position
const calcPosition = (mouseY: number, dimensions: Dimensions): number => {
	const { thumbHeight, trackHeight } = dimensions;
	const offset = ((thumbHeight + mouseY) * 100) / trackHeight;
	const dy = offset - thumbHeight;

	return dy;
};

const CustomFader = ({
	initialVal,
	stripeColor,
	min = 0,
	max = 95,
	size = "MD",
}: Props) => {
	const sizeCss = { ...sizes[size] };
	// DOM refs & dimensions
	const isDragging = useRef<boolean>(false);
	const thumbRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	// current mouse postion (& prevMouse after first pass)
	const mousePos = useRef<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	// thumb percentage
	const [thumbLevel, setThumbLevel] = useState<string>(
		initialVal?.toString() ?? "30"
	);

	const handleMouseDown = (e: MouseEvent) => {
		isDragging.current = true;

		// current mouse - starting offset (eg top + height / 2)
		const offsetDiff = getInitialOffset(thumbRef);
		const dx = e.clientX - offsetDiff?.offsetX;
		const dy = e.clientY - offsetDiff?.offsetY;

		const currentY = mousePos.current;
		currentY.x = dx;
		currentY.y = dy;
	};

	const handleMove = (e: MouseEvent) => {
		if (!isDragging.current) return;

		const thumbRect = getElementBounds(thumbRef) as DOMRect;
		const trackRect = getElementBounds(trackRef) as DOMRect;

		const thumbHeight = thumbRect?.height as number;
		const trackHeight = trackRect?.height as number;
		// current mouse - last mouse = distance between them
		const mouseY = (e.clientY - mousePos.current.y) as number;
		const dy = calcPosition(mouseY, { thumbHeight, trackHeight });

		// normalize with min-max range
		const clamped = clamp(dy, { min, max });

		setThumbLevel(`${clamped}`);
	};

	const handleMouseUp = () => {
		isDragging.current = false;
	};

	// MOBILE SUPPORT
	const handleTouchStart = (e: TouchEvent) => {
		const touch = e.touches[0];
		const offsetDiff = getInitialOffset(thumbRef);
		const currentY = mousePos.current;

		const dx = touch.clientX - offsetDiff.offsetX;
		const dy = touch.clientY - offsetDiff.offsetY;

		currentY.x = dx;
		currentY.y = dy;

		isDragging.current = true;
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging.current) return;
		const touch = e.touches[0];

		const thumbRect = getElementBounds(thumbRef) as DOMRect;
		const trackRect = getElementBounds(trackRef) as DOMRect;

		const thumbHeight = thumbRect?.height as number;
		const trackHeight = trackRect?.height as number;
		// current mouse - last mouse = distance between them
		const mouseY = (touch.clientY - mousePos.current.y) as number;
		const dy = calcPosition(mouseY, { thumbHeight, trackHeight });

		// normalize with min-max range
		const clamped = clamp(dy, { min, max });

		setThumbLevel(`${clamped}`);
	};

	const handleTouchEnd = (e: TouchEvent) => {
		isDragging.current = false;
	};

	// set/remove event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
		// mobile
		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);

		return () => {
			isMounted = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
			// mobile support
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			data-label="custom-fader"
			className={styles.CustomFader}
			style={sizeCss}
		>
			<Track trackRef={trackRef}>
				<Ticks />
			</Track>
			<FaderThumb
				level={thumbLevel}
				thumbRef={thumbRef}
				color={stripeColor}
				handleMouseDown={handleMouseDown}
				handleTouchStart={handleTouchStart}
			/>
		</div>
	);
};

export default CustomFader;
