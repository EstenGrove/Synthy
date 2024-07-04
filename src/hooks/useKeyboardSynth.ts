import { useRef, useEffect } from "react";
import { transpose } from "../utils/utils_notes";
// REQUIREMENTS:
// - Audio Context
// - Volume Level (gain)

// ##TODOS:
// - Update hook to support 'custom' wave types, w/ custom wavetables

// Our map of active oscillators (for keydown/keyup event tracking)
// - This prevents dangling audio, but is NOT stateful
export type ActiveOscMap = Map<string, OscillatorNode>;

export interface IKeyMap {
	[code: string]: number;
}
export type KeySynthProps = {
	keyMap?: IKeyMap;
	waveType?: OscillatorType;
	onNoteChange?: (activeOscs: ActiveOscMap) => void;
};

interface KeySynthReturn {
	audioCtx: AudioContext;
	activeOscMap: ActiveOscMap;
	initSynth: (audioCtx: AudioContext) => void;
	playNotes: (noteFreq: number) => PlayReturn;
}

export interface PlayReturn {
	osc1: OscillatorNode;
	osc2: OscillatorNode;
}

export interface KeySynthOptions {
	keyMap?: IKeyMap;
	onNoteChange?: (activeOscs: ActiveOscMap) => void;
}

const defaultKeyMap: IKeyMap = {
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

const defaultOptions = {
	keyMap: defaultKeyMap,
};

let audioCtx: AudioContext;

const useKeyboardSynth = (
	waveType: OscillatorType = "square",
	options: KeySynthOptions = defaultOptions
): KeySynthReturn => {
	const { keyMap = defaultKeyMap, onNoteChange } = options;
	const activeOscMap = useRef<ActiveOscMap>(new Map());

	const initSynth = (providedCtx: AudioContext) => {
		// set our audio context from the consumer of the hook
		audioCtx = providedCtx;
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		if (e.repeat) return;
		if (!audioCtx) return;

		const code = e.code;
		const code2 = `${code}_2`;
		const mapOfKeys = keyMap as IKeyMap;
		const activeOscs = activeOscMap?.current as ActiveOscMap;
		const noteFreq: number = mapOfKeys[code as keyof object];
		const isNotPressed = !activeOscs.has(code) || !activeOscs.has(code2);

		// have to check, that the osc key code DOES NOT ALREADY EXIST
		if (noteFreq && isNotPressed) {
			const { osc1, osc2 } = playNotes(noteFreq);
			// add oscs to active Map
			activeOscs.set(code, osc1);
			activeOscs.set(`${code}_2`, osc2);

			// pass active map to consumer of the hook, if it asks for it
			if (onNoteChange) {
				onNoteChange(activeOscs as ActiveOscMap);
			}
		}
	};

	const handleKeyUp = (e: KeyboardEvent): void => {
		if (e.repeat) return;
		if (!audioCtx) return;

		const code = e.code;
		const code2 = `${code}_2`;
		const activeOscs = activeOscMap?.current as ActiveOscMap;

		// release our recently pressed key/osc from our active Map
		if (activeOscs.has(code)) {
			const osc = activeOscs.get(code) as OscillatorNode;
			const osc2 = activeOscs.get(code2) as OscillatorNode;

			osc.stop();
			osc2.stop();
			osc.disconnect();
			osc2.disconnect();

			// remove oscs from active Map
			activeOscs.delete(code);
			activeOscs.delete(code2);
		}
	};

	// plays 2 oscillators simulataneously (base & transposed)
	const playNotes = (noteFreq: number): PlayReturn => {
		const osc: OscillatorNode = new OscillatorNode(audioCtx, {
			type: waveType,
			frequency: noteFreq,
		});
		const osc2: OscillatorNode = new OscillatorNode(audioCtx, {
			type: waveType,
			frequency: transpose(noteFreq, 12),
		});

		osc.connect(audioCtx.destination);
		osc2.connect(audioCtx.destination);

		osc.start();
		osc2.start();

		return {
			osc1: osc,
			osc2: osc2,
		};
	};

	// add event listeners
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			isMounted = false;
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		audioCtx: audioCtx,
		initSynth: initSynth,
		activeOscMap: activeOscMap?.current,
		playNotes: playNotes,
	};
};

export { useKeyboardSynth };
