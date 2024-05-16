import React, { useMemo, useState, MouseEvent, useEffect, useRef } from "react";
import styles from "../../css/controls/Knob.module.scss";

type KnobSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	val: string | number;
	name?: string;
	id?: string;
	size?: KnobSize;
};

// Calculation:
// - 3/100
// - X/360

// -132deg to 132deg

const calculateDegs = (value: number) => {
	const angle = Math.round(Math.asin(value) * (180 / Math.PI));
	return angle;
};

const offsetX = -320;
const offsetY = 270;

// const offsetX = -90;
// const offsetY = 90;
// const offsetX = -180;
// const offsetY = 180;
// const offsetX = -256;
// const offsetY = 356;

// Adopted from: https://jsfiddle.net/gTDdp/16/

const ENABLE_LOGIC = false;

const Knob = ({
	name = "knob",
	id = "knob",
	size = "MD",
	min = 0,
	max = 100,
	startAngle = -180,
	endAngle = 180,
}: Props) => {
	const range = useRef({
		min: 0,
		max: 0,
	});
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [value, setValue] = useState(() => {
		return String(0 + offsetX);
	});
	const knobPos = useMemo(() => {
		return {
			transform: `rotate(${value}deg)`,
			// transform: `rotate(${value}deg)`,
		};
	}, [value]);

	// ISSUE: THIS IS ALWAYS A NEGATIVE NUMBER AS OF NOW
	const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const degree = e.clientX - offsetX;
		setValue(`${degree}`);
		setIsDragging(true);

		console.log("e.clientX", e.clientX);
		console.log("degree(DOWN):", degree);

		// TOGGLE FLAG TO USE
		if (ENABLE_LOGIC) {
			if (degree <= -180) {
				setIsDragging(true);
				return setValue(`${-180}`);
			}
			if (degree >= 180) {
				setIsDragging(true);
				return setValue(`${180}`);
			}
			setValue(`${degree * 10}`);
		}
	};

	// THIS IS ALWAYS A POSITIVE NUMBER AS OF NOW
	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isDragging) return;
		const degree = e.clientX - offsetX;
		console.group(
			"%cMOVE",
			"background-color: green; color: white; font-size: 20px;"
		);
		console.log("e.clientX", e.clientX);
		console.log("degree(MOVE):", degree);
		console.groupEnd();
		setValue(`${degree - 45}`);
	};
	const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
		setIsDragging(false);
	};
	const handleMouseOut = (e: MouseEvent<HTMLDivElement>) => {
		setIsDragging(false);
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	return (
		<div
			className={styles.Knob}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMove}
			// onMouseOut={handleMouseOut}
			style={knobPos}
		>
			<div className={styles.Knob_handle}></div>
		</div>
	);
};

export default Knob;
