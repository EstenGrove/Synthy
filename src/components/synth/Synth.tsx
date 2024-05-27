import React, {
	useRef,
	useEffect,
	useCallback,
	useState,
	ChangeEvent,
	KeyboardEvent,
} from "react";
import styles from "../../css/synth/Synth.module.scss";
import { INote } from "../../utils/utils_notes";
import { isEmptyObj } from "../../utils/utils_shared";
import { fadeOutAudio, initAudio } from "../../utils/utils_audio";
import { NOTES_LIST as allNotes } from "../../data/synthNotes";
// components
import SynthKeysPanel from "./SynthKeysPanel";
import SynthControls from "./SynthControls";
import SynthKey from "./SynthKey";
import MasterPanel from "../controls/MasterPanel";
import Fader from "../controls/Fader";

type ActiveOscs = {
	[key in INote["label"]]: OscillatorNode;
};

let audioCtx: AudioContext;
let gainNode: GainNode;
const initialVol: string = "0.5";

// NOTE:
// - Consider useReducer for the effects chain

const Synth = () => {
	const activeOscillators = useRef<ActiveOscs>({});
	// local states
	const [isPoweredOn, setIsPoweredOn] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [volume, setVolume] = useState<string>(initialVol);
	const [waveType, setWaveType] = useState<OscillatorType>("square");

	// updater callbacks
	const updateVolume = useCallback(() => {
		if (audioCtx) {
			gainNode.gain.value = Number(volume);
		}
	}, [volume]);

	const togglePower = () => {
		const turnOn = !isPoweredOn;
		if (turnOn) {
			const vol = Number(volume);
			const { audioCtx: ctx, gainNode: gain } = initAudio(vol);
			audioCtx = ctx;
			gainNode = gain;
		} else {
			const active = activeOscillators.current;
			Object.entries(active).map(([key, osc]) => {
				osc.stop();
				delete active[key as keyof ActiveOscs];
			});
		}

		setIsPoweredOn(!isPoweredOn);
	};

	const killAudio = () => {
		const active = activeOscillators.current;
		if (Object.keys(active)?.length <= 0) return;

		Object.entries(active).map(([key, osc]) => {
			osc.stop();
			delete active[key as keyof ActiveOscs];
		});
	};

	const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
		setVolume(e.target.value);
	};

	const handleWave = (e: ChangeEvent<HTMLSelectElement>) => {
		setWaveType(e.target.value as OscillatorType);
	};

	const playNote = (freq: number): OscillatorNode => {
		const osc: OscillatorNode = audioCtx.createOscillator();
		osc.connect(gainNode);
		const type = waveType.toLowerCase() as OscillatorType;
		gainNode.gain.value = Number(volume);

		if (type === "custom") {
			// do stuff
		} else {
			osc.type = type;
		}
		osc.frequency.value = freq;
		osc.start(0.05);
		console.log(`${freq} PLAYING`);
		return osc;
	};

	const handlePress = (note: INote) => {
		const { freq, label } = note;
		const active = activeOscillators.current;
		if (!isPoweredOn) return;
		// play note
		const osc: OscillatorNode = playNote(freq);
		active[label] = osc;
		if (!isPlaying) {
			setIsPlaying(true);
		}
	};

	const handleRelease = (note: INote) => {
		const { label } = note;
		const active = activeOscillators.current;
		if (!isPoweredOn && isEmptyObj(active)) return;
		// fade-out audio before killing oscillator
		// NOTE: THIS WILL KILL AUDIO GAIN ENTIRELY
		fadeOutAudio(gainNode, audioCtx);
		// remove 'last' active oscillator
		if (active[label]) {
			active[label].stop(0.05);
			delete active[label];
		}
		if (isPlaying) {
			setIsPlaying(false);
		}
	};

	const handleMouseOver = (note: INote) => {
		if (!audioCtx) return;
		if (!isPlaying) return;
		const active = activeOscillators.current;
		// Object.keys((key: string) => active[key as keyof ActiveOscs].stop());
		const { label, freq } = note;
		const osc = playNote(freq);
		active[label] = osc;
		setIsPlaying(true);
	};

	const handleMouseLeave = (note: INote) => {
		if (!isPlaying) return;
		const { label } = note;
		const active = activeOscillators.current;
		// fadeOutAudio(gainNode, audioCtx);
		if (!active) return;
		active[label].stop(0.015);
	};

	// handle keyboard events
	const handleKeyDown = (e: KeyboardEvent) => {
		console.log("Event:", e);
	};

	// watches for 'volume' changes & updates the gainNode's value
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		updateVolume();

		return () => {
			isMounted = false;
		};
	}, [updateVolume]);

	return (
		<div className={styles.Synth}>
			<SynthControls
				isOn={isPoweredOn}
				volume={volume}
				waveType={waveType}
				handleWaves={handleWave}
				handleVolume={handleVolume}
				togglePower={togglePower}
				killAudio={killAudio}
			/>
			<div className={styles.Synth_bottom}>
				<SynthKeysPanel>
					{allNotes &&
						allNotes.map((note, idx) => (
							<SynthKey
								key={`${note.freq}-${idx}`}
								note={note}
								isPlaying={isPlaying}
								handlePress={() => handlePress(note)}
								handleRelease={() => handleRelease(note)}
								handleMouseOver={() => handleMouseOver(note)}
								handleMouseLeave={() => handleMouseLeave(note)}
							/>
						))}
				</SynthKeysPanel>
				<MasterPanel>
					<Fader
						val={"0.5"}
						id="volume"
						name="volume"
						min={0.0}
						max={1.0}
						step={0.01}
						size="SM"
						// handleChange={handleMaster}
					/>
				</MasterPanel>
			</div>
		</div>
	);
};

export default Synth;
