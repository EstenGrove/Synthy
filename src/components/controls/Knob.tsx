import {
	useRef,
	useState,
	useEffect,
	RefObject,
	CSSProperties,
	useMemo,
} from "react";
import styles from "../../css/controls/Knob.module.scss";
import { CRange, clamp, debounce, isBetween } from "../../utils/utils_shared";
import KnobArc from "./KnobArc";

type Props = {
	min?: number;
	max?: number;
	name: string;
	size?: KnobSize;
	label?: string;
	value: number;
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
				width: "4rem",
				height: "4rem",
				minWidth: "4rem",
				minHeight: "4rem",
				maxWidth: "4rem",
				maxHeight: "4rem",
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
type LabelValProps = {
	value?: number;
};
const LabelValue = ({ value }: LabelValProps) => {
	const round = Math.round(value as number);
	return <div className={styles.LabelValue}>{round}</div>;
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

// Calculates where the knob's rotation should be relative to the range & value provided
// - Uses 12 o'clock as the zero-point & clockwise is positive values, counter is negative
// - We're basing our rotation position off the range & zero point of the knob
const getDefaultValue = (defaultVal: number = 0, range: KnobRange) => {
	const { min, max } = range;
	const value = defaultVal;
	const diff = max - min;
	const percentDegs = (defaultVal * diff) / 100;
	const HALF = 50; // percent
	let degs;

	// if it's less than 50%; the degs should be between 0 and -270
	// if it's greater than 50%; the degs should be between 0 and +270
	// if it's exactly 50%; the degs should exactly 0degs
	if (value < HALF) {
		degs = -(diff / 2 - percentDegs);
	} else if (value > HALF) {
		degs = percentDegs - diff / 2;
	} else {
		degs = 0;
	}

	return degs;
};

const getNormalizedValue = (value: number): number => {
	// has to be 1 instead of 0 since decimals would give false positive for our purposes
	const MIN = 1;
	const MAX = 100;
	const numIsInRange = isBetween(value, { min: MIN, max: MAX });
	if (numIsInRange) {
		return value;
	} else {
		const rangeValue = value * MAX;
		return rangeValue;
	}
};

let lastY: number = 0;

const Knob = ({
	min = 0,
	max = 270,
	name = "knob",
	size = "SM",
	label = "Level",
	value = 0, // can be anything, but MUST be normalized to be: 0-100
	onChange,
	enableArc = false,
}: Props) => {
	const knobRef = useRef<HTMLDivElement>(null);
	const actualValue: number = useMemo(() => {
		const norm = getNormalizedValue(value);
		return norm;
	}, [value]);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [angle, setAngle] = useState<number>(
		getDefaultValue(actualValue, { min, max })
	);
	// shows value on hover
	const [shouldShowValue, setShouldShowValue] = useState<boolean>(false);
	const knobCss: CSSProperties = getSize(size);

	const handleUpdate = (newY: number) => {
		// We get the max rotation range by performing a diff & dividing by 2
		// ...this gives us a range: -150 to 150 for instance
		const maxRotate = (max - min) / 2; // 135 = (270-0) / 2
		const angleDiff = angle - (newY - lastY);
		const newDegs = clamp(angleDiff, { min: -maxRotate, max: maxRotate });
		// convert the angle in degrees to a value within our min/max (eg. 0-100)
		const newValue = getValueFromDegs(newDegs, { min: min, max: max });

		setAngle(newDegs);
		updateKnob(newDegs);

		// onChange(name, newValue);
		onChange(name, newValue);
	};

	const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		lastY = e.clientY;
		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	const mouseMove = (e: MouseEvent) => {
		// if (!isDragging) return;
		handleUpdate(e.clientY);
	};
	const mouseUp = (e: MouseEvent) => {
		setIsDragging(false);
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

	// toggles showing the 'value' on mouseover
	const showValue = () => {
		setShouldShowValue(true);
	};
	const hideValue = () => {
		setShouldShowValue(false);
	};

	// set default values on mount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// Update knob onMount
		// updateKnob(angle);
		const initVal = getDefaultValue(actualValue, { min, max });
		updateKnob(initVal);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={styles.Knob}
			onMouseOver={debounce(showValue, 50)}
			onMouseLeave={debounce(hideValue, 50)}
		>
			<div className={styles.Knob_wrapper} style={knobCss}>
				{enableArc && <KnobArc value={actualValue} size={size} />}
				<KnobDial knobRef={knobRef} onMouseDown={mouseDown} size={size} />
			</div>
			{!isDragging && !shouldShowValue && <Label label={label} />}
			{(shouldShowValue || isDragging) && <LabelValue value={actualValue} />}
		</div>
	);
};

export default Knob;
