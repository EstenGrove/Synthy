import { CSSProperties, useMemo, useRef } from "react";
import styles from "../../css/controls/KnobArc.module.scss";
import { clamp } from "../../utils/utils_shared";

type Props = {
	value: number;
	size?: ArcSize;
	bg?: string;
	color?: string;
};

type ArcSize = "XSM" | "SM" | "MD" | "LG" | "XLG";
// arc's position relative to knob
const getArcPosition = (size: ArcSize): CSSProperties => {
	const sizes = {
		XSM: 31,
		SM: 32.885,
		MD: 34,
		LG: 36,
		XLG: 38,
	};
	const position = {
		top: sizes?.[size as keyof object] + "%",
	};

	return position;
};
// Diameter of arc around inner knob's circle
const getArcSize = (size: ArcSize): number => {
	const sizes = {
		XSM: 54,
		SM: 67.5,
		MD: 82,
		LG: 112,
		XLG: 140,
	};

	return sizes?.[size as keyof object];
};
// Stroke width
const getStrokeFromSize = (size: ArcSize): number => {
	const sizes = {
		XSM: 0.4,
		SM: 0.5,
		MD: 0.5,
		LG: 0.6,
		XLG: 0.7,
	};
	return sizes?.[size as keyof object];
};

// Should be in range of: 0-100
// Note: the svg arc has a range of 0-19, so we use 0-20 as our range & apply an OFFSET=1
const getArcValue = (value: number): number => {
	const OFFSET = 1;
	const arc = value * 20;
	const arcValue = arc / 100 - OFFSET;
	const clamped = clamp(arcValue, { min: 0, max: 20 });

	return clamped;
};

// Checks whether our 'value' is in the 0-100 range & if not will normalize it to be in range
const getNormValue = (value: number): number => {
	const MIN = 1;
	const MAX = 100;
	const MULTIPLIER = 100;

	if (value > MIN && value <= MAX) {
		return value;
	} else {
		return value * MULTIPLIER;
	}
};

const KnobArc = ({
	value,
	size = "SM",
	bg = "rgb(32, 34, 35)",
	color = "var(--accent-bright-red)",
}: Props) => {
	const arcRef = useRef<SVGPathElement>(null);
	const normedValue = useMemo(() => {
		const newVal = getNormValue(value);
		return newVal;
	}, [value]);
	const arcSize = getArcSize(size); // px
	const arcValue = getArcValue(normedValue); // 0-20
	const strokeWidth = getStrokeFromSize(size); // px
	const arcPosition = getArcPosition(size);

	// prolly not needed???
	const updateArc = (value: number) => {
		const arcEl = arcRef?.current as SVGPathElement;
		const normedValue = getNormValue(value);
		const dasharray = `${normedValue} 100 100`;

		arcEl.setAttribute("stroke-dasharray", dasharray);
	};

	return (
		<div className={styles.KnobArc} style={arcPosition}>
			<svg
				id="svgArc"
				viewBox="0 0 10 10"
				width={arcSize}
				height={arcSize}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="outer"
					className={styles.KnobArc_outer}
					d="M2 8 A 4 4 0 1 1 8 8"
					fill="none"
					strokeWidth={strokeWidth}
					stroke={bg}
					strokeLinecap="round"
				/>
				<path
					id="progress"
					ref={arcRef}
					className={styles.KnobArc_progress}
					d="M2 8 A 4 4 0 1 1 8 8"
					fill="none"
					strokeWidth={strokeWidth}
					stroke={color}
					strokeLinecap="round"
					strokeDasharray={`${arcValue} 100 100`}
				/>
			</svg>
		</div>
	);
};

export default KnobArc;
