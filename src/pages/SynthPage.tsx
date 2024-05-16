import React from "react";
import styles from "../css/pages/SynthPage.module.scss";
import Synth from "../components/synth/Synth";

type Props = {};

const SynthPage = ({}: Props) => {
	return (
		<div className={styles.SynthPage}>
			<h1>Synth Page</h1>
			<main className={styles.SynthPage_main}>
				<Synth />
			</main>
		</div>
	);
};

export default SynthPage;
