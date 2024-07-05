import React from "react";
import styles from "../css/pages/SynthyPage.module.scss";
import Synthy from "../components/synth-panel/Synthy";

type Props = {};

const SynthyPage = ({}: Props) => {
	return (
		<div className={styles.SynthyPage}>
			<h1>Synthy Polyphonic Synth</h1>
			<main className={styles.SynthyPage_main}>
				<Synthy />
			</main>
		</div>
	);
};

export default SynthyPage;
