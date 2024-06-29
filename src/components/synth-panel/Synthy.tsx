import { useState } from "react";
import styles from "../../css/synth-panel/Synthy.module.scss";
import SynthyEffects from "./SynthyEffects";
import SynthyTopPanel from "./SynthyTopPanel";
import SynthyRecordingPanel from "./SynthyRecordingPanel";
import SynthyKeysPanel from "./SynthyKeysPanel";
import SynthyKey from "./SynthyKey";
// NOTES' DATA & TYPES
import { NOTES_LIST as allNotes } from "../../data/synthNotes";
import { INote } from "../../utils/utils_notes";

const basePresets = [
	"Dark Pad",
	"Echo Moog",
	"Gliding Swell",
	"Organ",
	"Electric Piano",
];
const keys: string[] = ["C", "A", "G", "Eb", "D"];
const octaves: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const scales: string[] = [
	"Major",
	"Minor",
	"Ionian",
	"HarmonicMajor",
	"HarmonicMinor",
];

// sets the index of the initial value for our synthy settings
const defaultIdx = 0;

interface ISynthySettings {
	octave: string;
	key: string;
	scale: string;
}

type Props = {
	presets: string[];
};

// REQUIREMENTS:
// - Octave:
// 		- Pass the octave value (as a number) to 'getNoteFromKey(keyCode, octave)'
// - Key: (eg. 'C', 'G' etc)
// 		- Load different notes map???
// 		- Re-render keyboard keys w/ new notes map assigned???

const Synthy = ({ presets = basePresets }: Props) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	// top panel settings
	const [selectedPreset, setSelectedPreset] = useState<string>(
		presets[defaultIdx]
	);
	const [synthSettings, setSynthSettings] = useState<ISynthySettings>({
		octave: octaves[defaultIdx],
		key: keys[defaultIdx],
		scale: scales[defaultIdx],
	});

	// supports: octave, preset, key, scale
	const handleSetting = (name: string, value: string) => {
		setSynthSettings({
			...synthSettings,
			[name]: value,
		});
	};

	const handlePreset = (preset: string) => {
		setSelectedPreset(preset);
	};

	// note handlers (TEMPORARY???)
	const handlePress = (note: INote) => {
		// do stuff
	};
	const handleRelease = (note: INote) => {
		// do stuff
	};

	const handleMouseOver = (note: INote) => {
		// do stuff
	};
	const handleMouseLeave = (note: INote) => {
		// do stuff
	};

	return (
		<section data-name="synthy" className={styles.Synthy}>
			<SynthyTopPanel
				presets={presets}
				preset={selectedPreset}
				synthSettings={synthSettings}
				handleSetting={handleSetting}
				handlePreset={handlePreset}
			/>
			<SynthyEffects />
			<SynthyRecordingPanel />
			<SynthyKeysPanel>
				{allNotes &&
					allNotes.map((note, idx) => (
						<SynthyKey
							key={`${note.freq}-${idx}`}
							note={note as INote}
							isPlaying={isPlaying}
							handlePress={() => handlePress(note)}
							handleRelease={() => handleRelease(note)}
							// mouse events
							onMouseOver={() => handleMouseOver(note)}
							onMouseLeave={() => handleMouseLeave(note)}
							// touch events
							onTouchStart={() => handlePress(note)}
							onTouchMove={() => handlePress(note)}
							onTouchEnd={() => handleRelease(note)}
						/>
					))}
			</SynthyKeysPanel>
		</section>
	);
};

export default Synthy;
