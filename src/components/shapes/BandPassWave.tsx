import React from "react";
import styles from "../../css/shapes/BandPassWave.module.scss";
import { mergeArrayOfCoords } from "../../utils/utils_canvas";

type Props = {
	color?: string;
};

const points = [
	// START/LEFT TAIL
	[20, 75],
	[30, 75],
	// UPWARDS LINE
	[45, 35],
	// FLAT TOP
	[65, 35],
	// DOWNWARDS LINE
	[80, 75],
	// END/RIGHT TAIL
	[90, 75],
];

const BandPassWave = ({ color = "#fff" }: Props) => {
	const linePoints = mergeArrayOfCoords(points).join(" ");
	return (
		<div className={styles.BandPassWave}>
			<svg
				id="bandpass-wave"
				viewBox="5 2 100 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polyline
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					// wave points
					points={linePoints}
				/>
			</svg>
		</div>
	);
};

export default BandPassWave;
