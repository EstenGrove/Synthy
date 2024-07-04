import React, { ChangeEvent, useState } from "react";
import styles from "../css/pages/PresetsPage.module.scss";
import { usePresetSynth } from "../hooks/usePresetSynth";
import Button from "../components/shared/Button";
import Select from "../components/shared/Select";

const customCSS = {
	engage: {
		margin: "0 2rem",
	},
	disengage: {
		margin: "0 2rem",
	},
};
let audioCtx: AudioContext;
let masterOut: GainNode;

const presetsList = [
	"organ",
	"organ2",
	"bass",
	"deepBass",
	"fuzzBass",
	"triangle",
	"sine",
];

const PresetsPage = () => {
	const [isEngaged, setIsEngaged] = useState(false);
	const [preset, setPreset] = useState<string>("organ");
	const presetsSynth = usePresetSynth();

	const engageSynth = () => {
		if (!audioCtx) {
			audioCtx = new AudioContext();
		}
		presetsSynth.initSynth(audioCtx);
		setIsEngaged(true);
	};
	const disengageSynth = () => {
		setIsEngaged(false);
		presetsSynth.killSynth();
	};

	const updatePreset = (e: ChangeEvent<HTMLSelectElement>) => {
		const preset = e.target.value;
		presetsSynth.changePreset(preset);
		setPreset(preset);
	};

	return (
		<div className={styles.PresetsPage}>
			<h1>Synth Presets Page</h1>
			<div className={styles.PresetsPage_main}>
				<Button
					styles={customCSS.engage}
					isDisabled={isEngaged}
					onClick={engageSynth}
				>
					Engage Synth
				</Button>
				<Button
					styles={customCSS.disengage}
					isDisabled={!isEngaged}
					onClick={disengageSynth}
				>
					Disengage Synth
				</Button>
				<br />
				<br />
				<br />
				<br />
				<Select
					val={preset}
					label="Presets"
					options={presetsList}
					handleChange={updatePreset}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default PresetsPage;
