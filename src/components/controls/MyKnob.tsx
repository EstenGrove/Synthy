import { useState, useRef, useEffect, useMemo } from "react";
import styles from "../../css/controls/MyKnob.module.scss";

type Props = {
	id: string;
	initialVal?: number;
	size?: number;
	label?: string;
	onChange: (val: number) => void;
};

const shadow = {
	boxShadow: `0px 0px 1px 2px rgb(124, 58, 237);`,
};

const getFocus = (isDragging: boolean) => {
	return {
		boxShadow: isDragging ? `0px 0px 1px 2px rgb(124, 58, 237)` : "",
	};
};

const getPercentFromDegs = (angle: number): number => {
	const multiplier = angle / 330;
	const percentage = multiplier * 100;
	return percentage;
};

const knobRange: { min: number; max: number } = {
	min: 0 + 30,
	max: 360 - 30,
};

let lastY: number = 0;
let lastAngle: number = 30;
let currentAngle: number = 30;

const setSize = (rem: number) => {
	document.documentElement.style.setProperty("--knobSize", `${rem}rem`);
};

const MyKnob = ({ initialVal = 30, onChange, size = 5, label }: Props) => {
	const isDragging = useRef<boolean>(false);
	const [isMoving, setIsMoving] = useState<boolean>(false);
	const knobRef = useRef<HTMLDivElement>(null);
	// knob angle in degrees
	const [angle, setAngle] = useState(initialVal ?? 30);

	const updateKnob = (angle: number) => {
		const newAngle = angle;

		if (knobRef.current) {
			const knob = knobRef.current as HTMLDivElement;
			knob.style.transformOrigin = `center`;
			knob.style.transform = `rotate(${newAngle}deg)`;
		}
		if (onChange) {
			const percent = getPercentFromDegs(angle);
			onChange(percent);
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		isDragging.current = true;
		lastY = e.clientY - lastY;
		// last angle
		lastAngle = (lastY % (360 * 1.5)) + 15;
		setIsMoving(true);
	};
	const handleMouseMove = (e: MouseEvent) => {
		if (!isDragging.current) return;

		const deltaY = lastY - e.clientY;
		// NOTE: the '(360 * 1.5) + 15' is a random offset to improve range of motion
		// let newAngle = (deltaY % (360 * 1.5)) + 15;
		const newAngle = deltaY % 360;

		// moving up
		if (newAngle > lastAngle) {
			const diff = newAngle - lastAngle;
			currentAngle = lastAngle + diff;
		}
		// moving down
		if (newAngle < lastAngle) {
			const diff = lastAngle - newAngle;
			currentAngle = lastAngle - diff;
		}
		// if we somehow get looped around
		if (deltaY < 0) {
			// currentAngle = newAngle + 280;
			currentAngle = (newAngle + 360) % 360;
			// currentAngle = lastAngle - (newAngle + 280);
		}

		if (currentAngle <= knobRange.min) currentAngle = knobRange.min;
		if (currentAngle >= knobRange.max) currentAngle = knobRange.max;

		setAngle(Math.abs(currentAngle));
		updateKnob(Math.abs(currentAngle));
		lastAngle = currentAngle;
	};

	const handleMouseUp = (e: MouseEvent) => {
		isDragging.current = false;

		lastAngle = currentAngle;
		lastY = e.clientY;
		// lastY = 0;

		setIsMoving(false);
	};

	// set default state on mount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		// apply default settings/size
		setSize(size);

		return () => {
			isMounted = false;
		};
	}, [size]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		updateKnob(angle);

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			isMounted = false;
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div data-label="knob-container" className={styles.MyKnobContainer}>
			<div
				className={styles.MyKnob}
				style={{ width: `${size}rem`, height: `${size}rem` }}
			>
				<div
					ref={knobRef}
					data-label="knob"
					className={styles.MyKnob_knob}
					onMouseDown={handleMouseDown}
					style={getFocus(isMoving)}
				>
					<div
						data-label="knob-handle"
						className={styles.MyKnob_knob_handle}
					></div>
				</div>
			</div>
			<div data-label="knob-label" className={styles.MyKnobContainer_label}>
				<div>{label}</div>
			</div>
		</div>
	);
};

export default MyKnob;
