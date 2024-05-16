import React, { useMemo, useState, MouseEvent, useEffect } from "react";
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

const offsetX = -180;
const offsetY = 180;
// const offsetX = -180;
// const offsetY = 180;
// const offsetX = -256;
// const offsetY = 356;

// Adopted from: https://jsfiddle.net/gTDdp/16/

const Knob = ({
	name = "knob",
	id = "knob",
	size = "MD",
	min = 0,
	max = 100,
	startAngle = -180,
	endAngle = 180,
}: Props) => {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [value, setValue] = useState("60");
	const knobPos = useMemo(() => {
		return {
			// transform: `rotate(${value}turn)`,
			transform: `rotate(${value}deg)`,
		};
	}, [value]);

	const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
		const x = e.pageX;
		const y = e.pageY;
		const radians = Math.atan2(x - offsetX, y - offsetY);
		// const degree = radians * (180 / Math.PI) * -1 + 45;
		const degree = radians;
		// const degree = radians * (180 / Math.PI) * -1 + 45;
		// const degree = radians * (180 / Math.PI) * -1 + 90;
		console.log("degree", degree);
		setValue(`${degree}`);
		setIsDragging(true);
		// if (degree <= -180) {
		// 	setIsDragging(true);
		// 	return setValue(`${-180}`);
		// }
		// if (degree >= 180) {
		// 	setIsDragging(true);
		// 	return setValue(`${180}`);
		// }
		// setValue(`${degree * 10}`);
	};

	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		const x = e.pageX;
		const y = e.pageY;
		const radians = Math.atan2(x - offsetX, y - offsetY);
		// const degree = radians * (180 / Math.PI) * -1 + 90;
		// const degree = radians * (180 / Math.PI) * -1 + 45;
		// const degree = radians * (180 / Math.PI) + 45;
		const opts = radians * (180 / Math.PI) * 2;
		const degree = -(90 - opts);
		console.log("degree", degree);
		// setValue(`${degree * 10}`);
		setValue(`${degree}`);
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
