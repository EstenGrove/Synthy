import { ChangeEvent, useState } from "react";
import styles from "../../css/playground/CustomOscPlayground.module.scss";
import RangeInput from "../shared/RangeInput";
import {
	createCustomWave,
	fadeOutOsc,
	generateCustomWave,
	initAudio,
} from "../../utils/utils_audio";
import { PRESETS as instrumentWaves } from "../../audio/wavetables/wavetables";
import Select from "../shared/Select";
import { generateRandomList } from "../../utils/utils_shared";
import { fuzzBass } from "../../audio/wavetables/bass-fuzz";
import { Reverb } from "../../audio/effects/Reverb";
import { reverbPresets } from "../../audio/presets/reverbPresets";
// reverb sources

// just add random numbers to the 'real' float array
const pickCustomWave = (audioCtx: AudioContext): PeriodicWave => {
	const real = new Float32Array([50, 5, 100, 35, 12]);
	const imag = new Float32Array(real.length);
	const customWave = audioCtx.createPeriodicWave(real, imag);

	return customWave;
};

// const customWave = generateCustomWave(audioCtx, 2);
// const list = generateRandomList(0, 1, 20);
// console.log("list", list);

let audioCtx: AudioContext;
let masterOut: GainNode;
const volume: number = 0.5;
const frequency = 440.0;

interface EffectLevels {
	distortion: number;
	reverb: number;
	reverbName: string;
	reverbLevel: number;
}

const CustomOscPlayground = () => {
	const [instrument, setInstrument] = useState<string>("organ");
	const [freq, setFreq] = useState<number>(frequency);
	const [effects, setEffects] = useState<EffectLevels>({
		distortion: 0.7,
		reverb: 0.8,
		reverbName: "Echo",
		reverbLevel: 0.8,
	});

	const playSound = () => {
		if (!audioCtx) {
			const { audioCtx: ctx, gainNode } = initAudio(volume);
			audioCtx = ctx;
			masterOut = gainNode;
		}
		const curWave = instrumentWaves?.[instrument as keyof object] ?? "organ2";
		const customWave = createCustomWave(audioCtx, curWave);

		// const customWave = generateCustomWave(audioCtx, 2);
		// const list = generateRandomList(0, 1, 20);
		// console.log("list", list);

		const verbPreset = reverbPresets[effects.reverbName];

		const reverb = new Reverb(audioCtx, {
			time: 500,
			wet: effects.reverbLevel,
			level: effects.reverb,
			src: verbPreset.src,
		});
		// define custom osc & set wave
		const osc = new OscillatorNode(audioCtx, {
			type: "custom",
			frequency: freq,
			periodicWave: customWave,
		});
		osc.connect(reverb.node);
		osc.connect(masterOut);
		masterOut.connect(audioCtx.destination);

		osc.start();

		osc.stop(audioCtx.currentTime + 0.3);
	};

	const killAudio = () => {
		//
		//
	};

	const handleInstrument = (e: ChangeEvent<HTMLSelectElement>) => {
		const val = e.target.value;
		setInstrument(val);
	};
	const handleFreq = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		console.log("val", val);
		setFreq(Number(val));
	};

	const handleEffects = (e: ChangeEvent) => {
		const { name, value } = e.target;

		setEffects({
			...effects,
			[name]: value,
		});
	};

	return (
		<div className={styles.CustomOscPlayground}>
			<div className={styles.CustomOscPlayground_actions}>
				<button data-label="start" type="button" onClick={playSound}>
					Play Osc
				</button>
				<button data-label="stop" type="button" onClick={killAudio}>
					Kill Osc
				</button>
			</div>
			<fieldset>
				<div className={styles.CustomOscPlayground_settings}>
					<div className={styles.CustomOscPlayground_settings_label}>
						Instruments
					</div>

					<Select
						id="instrument"
						name="instrument"
						val={instrument}
						handleChange={handleInstrument}
						options={[...Object.keys(instrumentWaves)]}
					/>
				</div>
				<div className={styles.CustomOscPlayground_settings}>
					<div className={styles.CustomOscPlayground_settings_label}>
						Frequency: {freq}
					</div>

					<RangeInput
						id="freq"
						name="freq"
						min={30}
						max={1500}
						step={1}
						val={freq.toString()}
						handleChange={handleFreq}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className={styles.CustomOscPlayground_settings}>
					<div className={styles.CustomOscPlayground_settings_label}>
						Reverb: {effects.reverbName}
					</div>
					<Select
						id="reverbName"
						name="reverbName"
						val={effects.reverbName}
						handleChange={handleEffects}
						options={[...Object.keys(reverbPresets)]}
					/>
					<div className={styles.CustomOscPlayground_settings_label}>
						Reverb (Wet): {effects.reverb}
					</div>
					<RangeInput
						id="reverb"
						name="reverb"
						min={0.0}
						max={1.0}
						step={0.01}
						val={effects.reverb.toString()}
						handleChange={handleEffects}
					/>
					<div className={styles.CustomOscPlayground_settings_label}>
						Reverb - Level: {effects.reverbLevel}
					</div>
					<RangeInput
						id="reverbLevel"
						name="reverbLevel"
						min={0.0}
						max={1.0}
						step={0.01}
						val={effects.reverbLevel.toString()}
						handleChange={handleEffects}
					/>
				</div>
			</fieldset>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default CustomOscPlayground;
