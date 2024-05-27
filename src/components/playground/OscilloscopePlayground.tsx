import React from "react";
import styles from "../../css/playground/OscilloscopePlayground.module.scss";
import Oscilloscope from "../synth/Oscilloscope";

type Props = {};

const OscilloscopePlayground = ({}: Props) => {
	return (
		<div className={styles.OscilloscopePlayground}>
			<Oscilloscope frequency={240} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default OscilloscopePlayground;
