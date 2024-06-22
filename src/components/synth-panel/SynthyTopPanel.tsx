import { useState } from "react";
import styles from "../../css/synth-panel/SynthyTopPanel.module.scss";
import OctavesPicker from "../controls/OctavesPicker";
import PresetsPicker from "../controls/PresetsPicker";
import ScalesPicker from "../controls/ScalesPicker";
import CustomSelect from "../shared/CustomSelect";

const customCSS = {
	selector: {
		width: "5rem",
		marginRight: "1rem",
		justifySelf: "flex-end",
	},
};

// ##TODO
// - CHANGE 'presets' TO A CUSTOM PRESET INTERFACE!!!
type Props = {
	presets: string[];
	synthSettings: ISynthySettings;
	// consider using this instead of separate state(s) & handler(s)
	handleSetting: (name: string, value: string) => void;
};

const keys: string[] = ["C", "A", "G", "Eb", "D"]; // what key are we in?
const octaves: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // what octave?
const scales: string[] = ["Major", "Minor", "Dorian", "Lydian", "Locrian"]; // what scale?

interface ISynthySettings {
	octave: string;
	preset: string;
	key: string;
	scale: string;
}

const SynthyTopPanel = ({ presets, synthSettings, handleSetting }: Props) => {
	const { octave, preset, key, scale } = synthSettings;
	return (
		<div className={styles.SynthyTopPanel}>
			<OctavesPicker
				key="octave"
				octaves={octaves}
				currentOctave={octave}
				onSelect={(octave) => handleSetting("octave", octave)}
			/>
			<PresetsPicker
				key="preset"
				presets={presets}
				currentPreset={preset}
				onSelect={(preset) => handleSetting("preset", preset)}
			/>
			<CustomSelect
				key="key"
				options={keys}
				currentItem={key}
				onSelect={(key) => handleSetting("key", key)}
				styles={customCSS.selector}
			/>
			<ScalesPicker
				key="scale"
				scales={scales}
				currentScale={scale}
				onSelect={(scale) => handleSetting("scale", scale)}
			/>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SynthyTopPanel;
