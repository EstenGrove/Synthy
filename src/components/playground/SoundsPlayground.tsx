import React, { ChangeEvent, useState } from "react";
import styles from "../../css/playground/SoundsPlayground.module.scss";
import RangeInput from "../shared/RangeInput";
import { initAudio } from "../../utils/utils_audio";
import { Distortion } from "../../audio/effects/Distortion";

let audioCtx: AudioContext;
let masterOut: GainNode;
const volume: number = 0.5;
const frequency = 440.0;

interface EffectLevels {
	distortion: number;
}

const SoundsPlayground = () => {
	const [freq, setFreq] = useState<number>(frequency);
	const [effects, setEffects] = useState<EffectLevels>({
		distortion: 0.7,
	});

	const playTone = () => {
		if (!audioCtx) {
			const { audioCtx: ctx, gainNode } = initAudio(volume);
			audioCtx = ctx;
			masterOut = gainNode;
		}

		const osc = new OscillatorNode(audioCtx, {
			type: "sine",
			frequency: freq,
		});
		const distortion = new Distortion(audioCtx, {
			level: effects.distortion * 100,
			oversamples: "4x",
		});

		osc.connect(distortion.node);
		distortion.output = audioCtx.destination;
		// osc.connect(distortion.node);
		// distortion.connect(audioCtx.destination);

		osc.start();
		osc.stop(audioCtx.currentTime + 0.25);
	};

	const killAudio = () => {
		//
		//
	};

	const handleEffects = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setEffects({
			...effects,
			[name]: value,
		});
	};
	const handleFreq = (e: ChangeEvent<HTMLInputElement>) => {
		const val = Number(e.target.value);
		setFreq(val);
	};

	return (
		<div className={styles.SoundsPlayground}>
			<div className={styles.SoundsPlayground_actions}>
				<button data-label="start" type="button" onClick={playTone}>
					Play Osc
				</button>
				<button data-label="stop" type="button" onClick={killAudio}>
					Kill Osc
				</button>
			</div>
			<div className={styles.SoundsPlayground_settings}>
				{/* DISTORTION SETTINGS */}
				<div className={styles.SoundsPlayground_settings_label}>
					Oscillator Settings
				</div>
				<RangeInput
					key="freq"
					name="freq"
					id="freq"
					val={freq.toString()}
					min={80}
					max={1000}
					step={1}
					label={`Frequency: ${freq}`}
					handleChange={handleFreq}
				/>
			</div>
			<div className={styles.SoundsPlayground_settings}>
				{/* DISTORTION SETTINGS */}
				<div className={styles.SoundsPlayground_settings_label}>
					{"---"} Distortion Settings {"---"}
				</div>
				<RangeInput
					key="distortion"
					name="distortion"
					id="distortion"
					val={effects.distortion.toString()}
					min={0.0}
					max={1}
					step={0.01}
					label={`Distortion: ${effects.distortion}`}
					handleChange={handleEffects}
				/>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SoundsPlayground;
