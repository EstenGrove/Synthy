import React from "react";
import styles from "../../css/shapes/SquareWave.module.scss";

type Props = {
	color?: string;
};

const SquareWave = ({ color = "#fff" }: Props) => {
	return (
		<div className={styles.SquareWave}>
			<svg
				id="square"
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
					points="5,80 20,80 20,30 55,30 55,80 70,80"
				/>
			</svg>
		</div>
	);
};

export default SquareWave;
