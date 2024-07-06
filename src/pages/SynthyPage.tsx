import React, { useState } from "react";
import styles from "../css/pages/SynthyPage.module.scss";
import Synthy from "../components/synth-panel/Synthy";
import Knob from "../components/controls/Knob";

type Props = {};

const SynthyPage = ({}: Props) => {
	const [knobValue, setKnobValue] = useState<number>(0.38);

	const updateValue = (newVal: number) => {
		const value = newVal / 100;
		setKnobValue(value);
	};

	const handleChange = (_: string, value: number) => {
		updateValue(value);
	};

	return (
		<div className={styles.SynthyPage}>
			<h1>Synthy Polyphonic Synth</h1>
			<main className={styles.SynthyPage_main}>
				<Knob
					key="test1"
					name="test1"
					label="Test"
					// defaultVal={knobValue}
					value={Math.round(knobValue * 100)}
					onChange={handleChange}
				/>
			</main>
			<main className={styles.SynthyPage_main}>
				<Synthy />
			</main>
		</div>
	);
};

export default SynthyPage;
