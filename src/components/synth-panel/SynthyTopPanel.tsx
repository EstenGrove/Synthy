import styles from "../../css/synth-panel/SynthyTopPanel.module.scss";
import OctavesPicker from "../controls/OctavesPicker";
import PresetsPicker from "../controls/PresetsPicker";
import ScalesPicker from "../controls/ScalesPicker";
import CustomSelect from "../shared/CustomSelect";
// keys, notes & scales
import { SCALES_MAP as scalesMap } from "../../data/synthNotes";
import { IScalesMap } from "../../scales/allScales";
import { useMemo } from "react";

const customCSS = {
	selector: {
		width: "5rem",
		marginRight: "1rem",
		justifySelf: "flex-end",
	},
};

type Props = {
	presets: string[];
	preset: string; // preset's name
	synthSettings: ISynthySettings;
	handleSetting: (name: string, value: string) => void;
	handlePreset: (preset: string) => void;
};

const getKeysFromScale = (scale: string, scalesMap: IScalesMap): string[] => {
	const keys: string[] = Object.keys(scalesMap?.[scale as keyof IScalesMap]);

	return keys;
};

const scales: string[] = Object.keys(scalesMap);
// const keys = getKeysFromScale("Major", scalesMap);
// const keys: string[] = ["C", "D", "E", "F", "G", "A", "B"]; // what key are we in?
const octaves: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; // what octave?

interface ISynthySettings {
	octave: string;
	key: string;
	scale: string;
}

const SynthyTopPanel = ({
	presets,
	preset,
	synthSettings,
	handleSetting,
	handlePreset,
}: Props) => {
	const { octave, key, scale } = synthSettings;
	// ['A', 'F', 'G#', ...]
	const keys: string[] = useMemo(() => {
		return getKeysFromScale(scale, scalesMap);
	}, [scale]);

	return (
		<div data-name="top-panel" className={styles.SynthyTopPanel}>
			{/* OCTAVES */}
			<OctavesPicker
				key="octave"
				octaves={octaves}
				currentOctave={octave}
				onSelect={(octave) => handleSetting("octave", octave)}
			/>
			{/* PRESETS */}
			<PresetsPicker
				key="preset"
				presets={presets}
				currentPreset={preset}
				onSelect={handlePreset}
			/>
			{/* KEY (eg. C, F#, Gb etc.) */}
			<CustomSelect
				key="key"
				options={keys}
				currentItem={key}
				onSelect={(key) => handleSetting("key", key)}
				styles={customCSS.selector}
			/>
			{/* SCALE (eg. Major, Minor etc.) */}
			<ScalesPicker
				key="scale"
				scales={scales}
				currentScale={scale}
				onSelect={(scale) => handleSetting("scale", scale)}
			/>
		</div>
	);
};

export default SynthyTopPanel;
