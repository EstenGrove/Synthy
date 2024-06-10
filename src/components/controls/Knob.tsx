import { useRef, useState, useEffect, RefObject, CSSProperties } from "react";
import styles from "../../css/controls/Knob.module.scss";
import { clamp } from "../../utils/utils_shared";
import KnobArc from "./KnobArc";

type Props = {
	min?: number;
	max?: number;
	name: string;
	size?: KnobSize;
	label?: string;
	defaultVal?: number;
	onChange: (name: string, value: number) => void;
	enableArc?: boolean;
};
type KnobDialProps = {
	knobRef: RefObject<HTMLDivElement>;
	size?: KnobSize;
	onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};
type LabelProps = {
	label: string;
};

type KnobSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type KnobRange = {
	min: number;
	max: number;
};

// get knob size as css width/height
const getSize = (size: KnobSize): CSSProperties => {
	switch (size) {
		case "XSM": {
			return {
				width: "3.5rem",
				height: "3.5rem",
				minWidth: "3.5rem",
				minHeight: "3.5rem",
				maxWidth: "3.5rem",
				maxHeight: "3.5rem",
			};
		}
		case "SM": {
			return {
				width: "5rem",
				height: "5rem",
				minWidth: "5rem",
				minHeight: "5rem",
				maxWidth: "5rem",
				maxHeight: "5rem",
			};
		}
		case "MD": {
			return {
				width: "6rem",
				height: "6rem",
				minWidth: "6rem",
				minHeight: "6rem",
				maxWidth: "6rem",
				maxHeight: "6rem",
			};
		}
		case "LG": {
			return {
				width: "8rem",
				height: "8rem",
				minWidth: "8rem",
				minHeight: "8rem",
				maxWidth: "8rem",
				maxHeight: "8rem",
			};
		}
		case "XLG": {
			return {
				width: "10rem",
				height: "10rem",
				minWidth: "10rem",
				minHeight: "10rem",
				maxWidth: "10rem",
				maxHeight: "10rem",
			};
		}

		default:
			return { width: "8rem", height: "8rem" };
	}
};

const Label = ({ label }: LabelProps) => {
	return <div className={styles.Label}>{label}</div>;
};

const KnobDial = ({ knobRef, onMouseDown, size }: KnobDialProps) => {
	return (
		<div
			ref={knobRef}
			className={styles.KnobDial}
			onMouseDown={onMouseDown}
			style={getSize(size as KnobSize)}
		>
			<div className={styles.KnobDial_handle}></div>
		</div>
	);
};

// returns a value between 0-100 based off a given angle between min/max
const getValueFromDegs = (angle: number, range: KnobRange) => {
	const { max, min } = range;
	const degsRange = max - min;
	const normedAngle = angle + degsRange / 2;
	const offset = normedAngle * 100;
	const value = offset / degsRange;
	return Math.round(value);
};

// returns a degree within min/max from a value between 0-100
const getDegsFromValue = (value: number, range: KnobRange) => {
	const { max, min } = range;
	const degsRange = max - min;
	const offset = value * degsRange;
	const degs = offset / 100;
	return degs;
};

// calculates what's considered visually zero
const getZeroFromRange = (min: number, max: number) => {
	const diff = max - min;
	return -(diff / 2);
};

let lastY: number = 0;

const Knob = ({
	min = 0,
	max = 270,
	name = "knob",
	size = "SM",
	label = "Level",
	onChange,
	defaultVal = 0,
	enableArc = false,
}: Props) => {
	const isDragging = useRef<boolean>(false);
	const knobRef = useRef<HTMLDivElement>(null);
	const [angle, setAngle] = useState<number>(getZeroFromRange(min, max));
	// value used for actual controls
	const [value, setValue] = useState<number>(defaultVal);
	const knobCss = getSize(size);

	const handleUpdate = (newY: number) => {
		// We get the max rotation range by performing a diff & dividing by 2
		// ...this gives us a range: -150 to 150 for instance
		const maxRotate = (max - min) / 2;
		const angleDiff = angle - (newY - lastY);
		const newDegs = clamp(angleDiff, { min: -maxRotate, max: maxRotate });
		setAngle(newDegs);
		updateKnob(newDegs);

		// convert the angle in degrees to a value within 0-100 & pass up to parent component
		const newValue = getValueFromDegs(newDegs, { min: min, max: max });
		onChange(name, newValue);
		setValue(newValue);
	};

	const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		isDragging.current = true;
		lastY = e.clientY;
		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	const mouseMove = (e: MouseEvent) => {
		handleUpdate(e.clientY);
	};
	const mouseUp = (e: MouseEvent) => {
		isDragging.current = false;
		const newY = lastY - e.clientY;

		lastY = clamp(newY, { min, max });
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);
	};

	const updateKnob = (newAngle: number) => {
		const knob = knobRef.current as HTMLDivElement;
		knob.style.transformOrigin = `center`;
		knob.style.transform = `rotate(${newAngle}deg)`;
	};

	// set default values
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		updateKnob(angle);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.Knob}>
			<div className={styles.Knob_wrapper} style={knobCss}>
				{enableArc && <KnobArc value={value} />}
				<KnobDial knobRef={knobRef} onMouseDown={mouseDown} size={size} />
			</div>
			<Label label={label} />
		</div>
	);
};

export default Knob;
