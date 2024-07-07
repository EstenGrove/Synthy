import { useState, useRef } from "react";
import styles from "../../css/synth-panel/Synthy.module.scss";
import SynthyEffects from "./SynthyEffects";
import SynthyTopPanel from "./SynthyTopPanel";
import SynthyRecordingPanel from "./SynthyRecordingPanel";
import SynthyKeysPanel from "./SynthyKeysPanel";
import SynthyKey from "./SynthyKey";
// NOTES' DATA & TYPES
import { NOTES_LIST as allNotes } from "../../data/synthNotes";
import { INote } from "../../utils/utils_notes";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import {
	ADSRSettings,
	DelaySettings,
	FilterSettings,
	ReverbSettings,
	VCOSettings,
} from "./types";
import { createStreamNode } from "../../utils/utils_audio";

const basePresets = [
	"--INIT--",
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

// sets the index of the initial value for our synthy preset settings
const defaultIdx = 0;

interface ISynthySettings {
	octave: string;
	key: string;
	scale: string;
}

type Props = {
	presets?: string[];
};

// REQUIREMENTS:
// - Octave:
// 		- Pass the octave value (as a number) to 'getNoteFromKey(keyCode, octave)'
// - Key: (eg. 'C', 'G' etc)
// 		- Load different notes map???
// 		- Re-render keyboard keys w/ new notes map assigned???

let audioCtx: AudioContext;

const Synthy = ({ presets = basePresets }: Props) => {
	const recorder = useAudioRecorder({
		audioType: "audio/ogg; codec=opus",
		onFinished: (audioBlob: Blob) => {
			console.log("audioBlob", audioBlob);
		},
	});
	const audioDestNode = useRef<MediaStreamAudioDestinationNode>();
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	// top panel settings
	const [selectedPreset, setSelectedPreset] = useState<string>(
		presets[defaultIdx]
	);
	const [masterVolume, setMasterVolume] = useState<number>(0.5);
	// Eg. key: (C), octave: 0-10, scale: 'Minor'
	const [synthSettings, setSynthSettings] = useState<ISynthySettings>({
		octave: octaves[defaultIdx],
		key: keys[defaultIdx],
		scale: scales[defaultIdx],
	});

	// VCO settings
	const [vcoSettings, setVCOSettings] = useState<VCOSettings>({
		waveType: "triangle",
		gain: 0.5,
	});
	const [adsrSettings, setADSRSettings] = useState<ADSRSettings>({
		attack: 0.0,
		sustain: 0.0,
		decay: 0.0,
		release: 0.0,
	});
	const [filterSettings, setFilterSettings] = useState<FilterSettings>({
		filterType: "lpf",
		freq: 500, // hz
		semitones: 1,
		level: 0.5,
	});
	const [reverbSettings, setReverbSettings] = useState<ReverbSettings>({
		reverbWave: "Echo",
		time: 0.5, // ms (eg .5 => 500ms)
		feedback: 0.5,
		level: 0.5,
	});
	const [delaySettings, setDelaySettings] = useState<DelaySettings>({
		time: 0.5, // ms (eg .5 => 500ms)
		feedback: 0.5,
		level: 0.5,
	});

	const handleVCO = (name: string, value: string | number) => {
		// we need to normalize/translate numeric values back to decimals
		const normVal = typeof value === "number" ? value / 100 : value;
		setVCOSettings({
			...vcoSettings,
			[name]: normVal,
		});
	};
	const handleADSR = (name: string, value: string | number) => {
		// we need to normalize/translate numeric values back to decimals
		const normVal = typeof value === "number" ? value / 100 : value;
		setADSRSettings({
			...adsrSettings,
			[name]: normVal,
		});
	};
	const handleFilter = (name: string, value: string | number) => {
		// we need to normalize/translate numeric values back to decimals
		const normVal = typeof value === "number" ? value / 100 : value;
		setFilterSettings({
			...filterSettings,
			[name]: normVal,
		});
	};
	const handleReverb = (name: string, value: string | number) => {
		// we need to normalize/translate numeric values back to decimals
		const normVal = typeof value === "number" ? value / 100 : value;
		setReverbSettings({
			...reverbSettings,
			[name]: normVal,
		});
	};
	const handleDelay = (name: string, value: string | number) => {
		// we need to normalize/translate numeric values back to decimals
		const normVal = typeof value === "number" ? value / 100 : value;
		setDelaySettings({
			...delaySettings,
			[name]: normVal,
		});
	};

	const handleMasterVol = (_: string, value: number) => {
		const level = value / 100;
		setMasterVolume(level);
	};

	// supports: octave, key, scale
	const handleSetting = (name: string, value: string) => {
		setSynthSettings({
			...synthSettings,
			[name]: value,
		});
	};

	const handlePreset = (preset: string) => {
		setSelectedPreset(preset);
	};

	// note handlers
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

	// initialize recorder & stream node for oscillators
	const initRecorder = () => {
		const destNode = createStreamNode(
			audioCtx
		) as MediaStreamAudioDestinationNode;

		// store in our ref(s)
		audioDestNode.current = destNode;

		// // Connect the osc to the destNode: oscNode.connect(destNode)
		recorder.initRecorder({
			audioCtx: audioCtx,
			mediaStream: destNode.stream,
			startRecording: false,
		});
	};

	const startRecording = () => {
		if (!audioCtx || !audioDestNode?.current) {
			initRecorder();
		}
		recorder.start();
	};
	const stopRecording = () => {
		recorder.stop();
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
			<SynthyEffects
				// grouped states
				vcoVals={vcoSettings}
				adsrVals={adsrSettings}
				filterVals={filterSettings}
				delayVals={delaySettings}
				reverbVals={reverbSettings}
				masterVolume={masterVolume}
				// effect handlers
				handleVCO={handleVCO}
				handleADSR={handleADSR}
				handleDelay={handleDelay}
				handleFilter={handleFilter}
				handleReverb={handleReverb}
				handleMasterVol={handleMasterVol}
			/>
			<SynthyRecordingPanel start={startRecording} stop={stopRecording} />
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
