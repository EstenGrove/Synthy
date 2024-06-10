import React from "react";
import styles from "../../css/shapes/SineWave.module.scss";

type Props = {
	color?: string;
};

// MAX X (rarity/distance between waves)
const MAX_X = 75;
// MAX Y (amplitude/height of waves)
const MAX_Y = 55;

// we create an array, that generates the different x,y points on arc,
// ...that's spaced within the max x/y coords
const generatePath = (): string => {
	const path: string[] = [];
	for (let x = 0; x <= MAX_X; x++) {
		// calc an angle, thats half of 'x' times Math.PI(2)
		const angle = (x / MAX_X) * Math.PI * 2; // angle = 0 -> 2PI
		const y = Math.sin(angle) * (MAX_Y / 2) + MAX_Y / 2;
		// M = move to, L = line to
		path.push((x == 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2));
	}
	return path.join("");
};

const SineWave = ({ color = "#fff" }: Props) => {
	const path: string = generatePath();
	return (
		<div className={styles.SineWave}>
			<svg
				id="sine"
				viewBox="0 -15 85 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill="none"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					// x,y: top =>
					d={path}
				/>
			</svg>
		</div>
	);
};

export default SineWave;
