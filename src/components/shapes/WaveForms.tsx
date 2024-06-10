import React from "react";
import styles from "../../css/shapes/WaveForms.module.scss";

type Props = {
	color?: string;
};

type WaveProps = {
	color?: string;
};

const Sine = ({ color }: WaveProps) => {
	return (
		<path
			d="M20,230 Q40,205 50,230 T90,230"
			fill="none"
			stroke={color}
			stroke-width="5"
		/>
	);
};

const WaveForms = ({ color = "var(--accent)" }: Props) => {
	return (
		<div className={styles.WaveForms}>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WaveForms;
