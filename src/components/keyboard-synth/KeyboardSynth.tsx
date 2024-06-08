import { useEffect, useState, ChangeEvent } from "react";
import styles from "../../css/keyboard-synth/KeyboardSynth.module.scss";
import {
	BASE_OCTAVE,
	INote,
	generateOctave,
	transpose,
} from "../../utils/utils_notes";
import { initAudio } from "../../utils/utils_audio";
import RangeInput from "../shared/RangeInput";
import Fader from "../controls/Fader";

const keyMap = {
	KeyA: 65.41,
	KeyS: 69.3,
	KeyD: 73.42,
	KeyF: 77.78,
	KeyG: 82.41,
	KeyH: 87.31,
	KeyJ: 92.5,
	KeyK: 98,
	KeyL: 103.83,
	Semicolon: 110,
	Quote: 116.54,
	// extra rows
	KeyQ: 116.54,
	KeyW: 123.47,
	// Octave 4
	KeyE: 130.81,
	KeyR: 138.59,
	KeyT: 146.83,
	KeyY: 155.56,
	KeyU: 164.81,
	KeyI: 174.61,
	KeyO: 185,
	KeyP: 196,
	KeyZ: 207.65,
	KeyX: 220,
	KeyC: 233.08,
	KeyV: 246.94,
	KeyB: 261.63,
	KeyN: 277.18,
	KeyM: 293.66,
};

const waveType: OscillatorType = "sawtooth";

interface ActiveNotes {
	[key: string]: OscillatorNode;
}

let audioCtx: AudioContext;
let masterOut: GainNode;
const volume: number = 0.5;

const activeOsc: ActiveNotes = {};

const KeyboardSynth = () => {
	const [vol, setVol] = useState<number>(0.5);
	const [isOn, setIsOn] = useState(false);

	const updateVolume = (level: number) => {
		if (!masterOut) return;
		masterOut.gain.value = level;
	};

	const powerOn = () => {
		if (!audioCtx) {
			const { audioCtx: ctx, gainNode } = initAudio(volume);
			audioCtx = ctx;
			masterOut = gainNode;
			updateVolume(vol);
		}
		setIsOn(true);
	};
	const powerOff = () => {
		location.reload();
		for (const [keyCode, osc] of Object.entries(activeOsc)) {
			osc.stop();
			osc.disconnect();
			delete activeOsc[keyCode];
		}

		setIsOn(false);
	};

	const playNotes = (noteFreq: number) => {
		const osc = new OscillatorNode(audioCtx, {
			type: waveType,
			frequency: noteFreq,
		});
		const osc2 = new OscillatorNode(audioCtx, {
			type: waveType,
			frequency: transpose(noteFreq, 12),
		});

		osc.connect(masterOut);
		osc2.connect(masterOut);
		osc.start();
		osc2.start();

		return {
			osc1: osc,
			osc2: osc2,
		};
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.repeat) return;
		// e.preventDefault();
		const code = e.code;
		const noteFreq: number = keyMap[code as keyof object];

		// have to check, that the osc code DOES NOT ALREADY EXIST
		if (noteFreq && (!activeOsc[code] || !activeOsc[`${code}_2`])) {
			const { osc1, osc2 } = playNotes(noteFreq);

			activeOsc[code] = osc1;
			activeOsc[`${code}_2`] = osc2;
		}
	};
	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.repeat) return;

		const code = e.code;
		if (activeOsc[code]) {
			const osc = activeOsc[code] as OscillatorNode;
			const osc2 = activeOsc[`${code}_2`] as OscillatorNode;
			osc.stop();
			osc2.stop();
			osc.disconnect();
			osc2.disconnect();
			delete activeOsc[code];
			delete activeOsc[`${code}_2`];
		}
	};

	const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
		const newLevel = Number(e.target.value);
		setVol(newLevel);
		updateVolume(vol);
	};

	// add event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);

		return () => {
			isMounted = false;
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.KeyboardSynth}>
			<button disabled={isOn} type="button" onClick={powerOn}>
				Turn On
			</button>
			<button disabled={!isOn} type="button" onClick={powerOff}>
				Turn Off
			</button>
			<br />
			<br />
			<br />
			<div style={{ fontSize: "1.8rem" }}>Volume: {vol}</div>
			<br />
			<br />
			<br />
			<br />
			<Fader
				name="vol"
				id="vol"
				val={vol.toString()}
				min={0.0}
				max={1.0}
				step={0.01}
				size="LG"
				handleChange={handleVolume}
			/>
		</div>
	);
};

export default KeyboardSynth;
