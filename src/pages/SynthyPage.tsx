import { useState } from "react";
import styles from "../css/pages/SynthyPage.module.scss";
import Synthy from "../components/synth-panel/Synthy";
import Knob from "../components/controls/Knob";

const SynthyPage = () => {
	const [value, setValue] = useState<number>(0.5);

	const handleVal = (_: string, newVal: number) => {
		const formatted = newVal / 100;
		setValue(formatted);
	};
	return (
		<div className={styles.SynthyPage}>
			<h1>Synthy Polyphonic Synth</h1>

			<div className={styles.SynthyPage_demo}>
				<Knob
					name="test1"
					label="Test"
					size="XLG"
					value={Math.round(value * 100)}
					onChange={handleVal}
					enableArc={true}
				/>
			</div>

			<main className={styles.SynthyPage_main}>
				<Synthy />
			</main>
		</div>
	);
};

export default SynthyPage;
