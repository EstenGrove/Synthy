import React from "react";
import styles from "../../css/synth-panel/SynthyTopPanel.module.scss";
import OctavesPicker from "../controls/OctavesPicker";

type Props = {};
const octaves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const octaves = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const SynthyTopPanel = ({}: Props) => {
	return (
		<div className={styles.SynthyTopPanel}>
			<OctavesPicker octaves={octaves} />
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SynthyTopPanel;
