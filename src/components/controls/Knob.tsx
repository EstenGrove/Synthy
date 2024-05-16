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

const calcDegs_OLD = (positions: Positions) => {
	const value = positions.clientX;
	const angle = Math.round(Math.asin(value) * (180 / Math.PI));
	return angle;
};

interface Positions {
	clientX: number;
	clientY: number;
	offsetX: number;
	offsetY: number;
}

const calcDegs = (positions: Positions): number => {
	const { clientX, clientY, offsetX, offsetY } = positions;
	const x = clientX - offsetX;
	const y = clientY - offsetY;
	const radians = Math.atan2(y, x);
	const angle = radians * (180 / Math.PI);
	console.log("ANGLE", angle);

	return angle;
};

const offsetX = -180;
const offsetY = 180;

// const offsetX = -90;
// const offsetY = 90;
// const offsetX = -180;
// const offsetY = 180;
// const offsetX = -256;
// const offsetY = 356;

// Adopted from: https://jsfiddle.net/gTDdp/16/
// https://jsfiddle.net/wRexz/3/

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
	const knobRef = useRef<HTMLDivElement>(null);
	const [curPos, setCurPos] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [value, setValue] = useState(() => {
		return String(0 + offsetX);
	});
	const knobPos = useMemo(() => {
		return {
			// transform: `rotate(${value}turn)`,
			transform: `rotate(${value}deg)`,
		};
	}, [value]);

	// ISSUE: THIS IS ALWAYS A NEGATIVE NUMBER AS OF NOW
	const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		// const degree = e.clientX - offsetX;
		// const degree = e.clientX;
		// const degree = e.pageX;
		const degree = calcDegs({
			clientX: e.pageX,
			clientY: e.pageY,
			offsetX: curPos.x,
			offsetY: curPos.y,
		});
		setValue(`${degree}`);
		setIsDragging(true);
		setCurPos({
			x: e.pageX,
			y: e.pageY,
		});
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
		const rect = knobRef.current?.getBoundingClientRect();
		const clientX = e.pageX;
		const clientY = e.pageY;
		const offsetX = curPos.x;
		const offsetY = curPos.y;
		// const degree = e.clientX - offsetX;
		// const degree = e.clientX;
		const degree = calcDegs({
			clientX,
			clientY,
			offsetX: offsetX as number,
			offsetY: offsetY as number,
		});

		// SET STATE
		setValue(`${degree}`);
		setCurPos({ x: clientX, y: clientY });
		console.group(
			"%cMOVE",
			"background-color: green; color: white; font-size: 20px;"
		);
		console.log("e.clientX", e.clientX);
		console.log("degree(MOVE):", degree);
		console.groupEnd();
	};
	const handleMouseUp = () => {
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
			ref={knobRef}
		>
			<div className={styles.Knob_handle}></div>
		</div>
	);
};

export default Knob;
