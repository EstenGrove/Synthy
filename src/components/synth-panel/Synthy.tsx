import React from "react";
import styles from "../../css/synth-panel/Synthy.module.scss";
import SynthyEffects from "./SynthyEffects";
import SynthyTopPanel from "./SynthyTopPanel";

const Synthy = () => {
	return (
		<section data-name="synthy" className={styles.Synthy}>
			<SynthyTopPanel />
			<SynthyEffects />
		</section>
	);
};

export default Synthy;
