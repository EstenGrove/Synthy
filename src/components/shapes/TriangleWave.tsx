import React from "react";
import styles from "../../css/shapes/TriangleWave.module.scss";

type Props = {
	color?: string;
};

const TriangleWave = ({ color = "#fff" }: Props) => {
	return (
		<div className={styles.TriangleWave}>
			<svg
				id="triangle"
				viewBox="0 0 85 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polyline
					fill="none"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					// x,y: top =>
					points="5,80 20,80 40,30 40,30 60,80 75,80"
				/>
			</svg>
		</div>
	);
};

export default TriangleWave;
