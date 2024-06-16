import React from "react";
import styles from "../../css/shapes/LPFWave.module.scss";
import { mergeArrayOfCoords, mergeSvgPoints } from "../../utils/utils_canvas";

type Props = {
	color?: string;
};

// Points that map the line drawn
const points = [
	// START
	[10, 70],
	[20, 20],
	// JUTS UP
	[30, 35],
	// JUTS DOWN
	[90, 35],
];

const LPFWave = ({ color = "white" }: Props) => {
	const linePoints: string = mergeArrayOfCoords(points).join(" ");

	return (
		<div className={styles.LPFWave}>
			<svg
				id="lpf-wave"
				viewBox="0 -15 100 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* MAIN LINE */}
				<polyline
					fill="none"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					points={linePoints}
				/>
			</svg>
		</div>
	);
};

export default LPFWave;
