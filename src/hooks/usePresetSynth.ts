import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { transpose } from "../utils/utils_notes";
import { Reverb } from "../audio/effects/Reverb";
import {
	PRESETS as presetWaves,
	PresetsMap,
	WaveTable,
} from "../audio/wavetables/wavetables";
import { PresetSettings } from "../audio/nodes/Preset";
import {
	IReverbPreset,
	TReverbPresetName,
	reverbPresets,
} from "../audio/presets/reverbPresets";
import { createCustomWave, fadeOutOsc } from "../utils/utils_audio";
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
	changePreset: (preset: string) => void;
	killSynth: () => void;
}

export interface PlayReturn {
	osc1: OscillatorNode;
	osc2: OscillatorNode;
}

export interface KeySynthOptions {
	keyMap?: IKeyMap;
	preset?: PresetSettings;
	onNoteChange?: (activeOscs: ActiveOscMap) => void;
}

export interface EffectLevels {
	distortion: number;
	reverb: number;
	reverbName: TReverbPresetName;
	reverbLevel: number;
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
	preset: {},
	keyMap: defaultKeyMap,
};

const fallback = "organ";

let audioCtx: AudioContext;

const usePresetSynth = (options: KeySynthOptions = {}): KeySynthReturn => {
	const { keyMap = defaultKeyMap, preset = {}, onNoteChange } = options;
	const activeOscMap = useRef<ActiveOscMap>(new Map());
	const [instrument, setInstrument] = useState<string>(fallback);
	const [effects, setEffects] = useState<EffectLevels>({
		distortion: 0.7,
		reverb: 0.8,
		reverbName: "Room",
		reverbLevel: 0.8,
	});

	const initSynth = (providedCtx: AudioContext) => {
		// set our audio context from the consumer of the hook
		audioCtx = providedCtx;
	};

	// plays 2 oscillators simulataneously (base & transposed)
	const playNotes = useCallback(
		(noteFreq: number): PlayReturn => {
			const altWave: WaveTable = presetWaves.organ;
			const curWave: WaveTable =
				presetWaves?.[instrument as keyof object] ?? altWave;
			const customWave: PeriodicWave = createCustomWave(audioCtx, curWave);
			const verbPreset: IReverbPreset = reverbPresets[effects.reverbName];

			const reverb = new Reverb(audioCtx, {
				time: 500,
				wet: effects.reverbLevel,
				level: effects.reverb,
				src: verbPreset.src,
			});
			// define custom osc & set wave
			const osc = new OscillatorNode(audioCtx, {
				type: "custom",
				frequency: noteFreq,
				periodicWave: customWave,
			});

			// NOT CURRENTLY IN-USE!!!
			const osc2: OscillatorNode = new OscillatorNode(audioCtx, {
				type: "square",
				frequency: transpose(noteFreq, 12),
			});

			osc.connect(reverb.node);
			osc.connect(audioCtx.destination);
			// osc2.connect(audioCtx.destination);

			osc.start();
			// osc2.start();

			return {
				osc1: osc,
				osc2: osc2,
			};
		},
		[effects.reverb, effects.reverbLevel, effects.reverbName, instrument]
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent): void => {
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
		},
		[keyMap, onNoteChange, playNotes]
	);

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

			fadeOutOsc(osc);
			// fadeOutOsc(osc2);

			// osc.stop();
			// osc2.stop();
			osc.disconnect();
			// osc2.disconnect();

			// remove oscs from active Map
			activeOscs.delete(code);
			activeOscs.delete(code2);
		}
	};

	const killSynth = () => {
		if (audioCtx) {
			audioCtx.close();
		}
	};

	const changePreset = (presetName: string) => {
		setInstrument(presetName);
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
	}, [handleKeyDown]);

	return {
		audioCtx: audioCtx,
		initSynth: initSynth,
		activeOscMap: activeOscMap?.current,
		playNotes: playNotes,
		changePreset: changePreset,
		killSynth: killSynth,
	};
};

export { usePresetSynth };
