import React from "react";
import styles from "../../css/shapes/SawtoothWave.module.scss";

type Props = {
	color?: string;
};

const SawtoothWave = ({ color = "#fff" }: Props) => {
	return (
		<div className={styles.SawtoothWave}>
			<svg
				id="sawtooth"
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
					points="20,80 20,30 70,80"
				/>
			</svg>
		</div>
	);
};

export default SawtoothWave;
