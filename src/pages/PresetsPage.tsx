import React, { ChangeEvent, useState } from "react";
import styles from "../css/pages/PresetsPage.module.scss";
import { usePresetSynth } from "../hooks/usePresetSynth";
import Button from "../components/shared/Button";
import Select from "../components/shared/Select";
import Knob from "../components/controls/Knob";

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
	const presetsSynth = usePresetSynth();
	const [isEngaged, setIsEngaged] = useState(false);
	const [preset, setPreset] = useState<string>("organ");
	const [masterVolume, setMasterVolume] = useState<number>(0.5);

	const engageSynth = () => {
		if (!audioCtx) {
			audioCtx = new AudioContext();
			masterOut = new GainNode(audioCtx, {
				gain: masterVolume,
			});
			masterOut.connect(audioCtx.destination);
		}
		presetsSynth.initSynth(audioCtx, masterOut);
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

	const updateVolume = (_: string, value: number) => {
		const level = value / 100;
		setMasterVolume(level);
		if (masterOut) {
			masterOut.gain.value = level;
		}
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
				<br />
				<br />
				<br />
				<br />
				<div
					style={{
						background: "#eaecef",
						width: "max-content",
						padding: "1rem 2rem",
						borderRadius: ".5rem",
					}}
				>
					<Knob
						label="Gain"
						name="volume"
						size="LG"
						defaultVal={masterVolume * 100}
						onChange={updateVolume}
					/>
				</div>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default PresetsPage;
