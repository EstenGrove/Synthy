import { useState } from "react";
import styles from "../../css/synth-panel/Synthy.module.scss";
import SynthyEffects from "./SynthyEffects";
import SynthyTopPanel from "./SynthyTopPanel";

const basePresets = [
	"Dark Pad",
	"Echo Moog",
	"Gliding Swell",
	"Organ",
	"Electric Piano",
];
const keys: string[] = ["C", "A", "G", "Eb", "D"];
const octaves: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const scales: string[] = ["Major", "Minor", "Dorian", "Lydian", "Locrian"];

// sets the index of the initial value for our synthy settings
const defaultIdx = 0;

interface ISynthySettings {
	octave: string;
	preset: string;
	key: string;
	scale: string;
}

type Props = {
	presets: string[];
};

const Synthy = ({ presets = basePresets }: Props) => {
	const [synthSettings, setSynthSettings] = useState<ISynthySettings>({
		octave: octaves[defaultIdx],
		preset: presets[defaultIdx],
		key: keys[defaultIdx],
		scale: scales[defaultIdx],
	});

	const handleSetting = (name: string, value: string) => {
		setSynthSettings({
			...synthSettings,
			[name]: value,
		});
	};

	return (
		<section data-name="synthy" className={styles.Synthy}>
			<SynthyTopPanel
				presets={presets}
				synthSettings={synthSettings}
				handleSetting={handleSetting}
			/>
			<SynthyEffects />
		</section>
	);
};

export default Synthy;
