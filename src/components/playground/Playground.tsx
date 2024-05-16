import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import styles from "../../css/playground/Playground.module.scss";
import RangeInput from "../shared/RangeInput";
import Select from "../shared/Select";
import { createCustomWave, initAudio } from "../../utils/utils_audio";

const waveTypes = ["Sine", "Square", "Triangle", "Sawtooth", "Custom"];
const disabledWaves = ["Custom"];

let audioCtx: AudioContext;
let gainNode: GainNode;

const Playground = () => {
	const currentOscillator = useRef<OscillatorNode>();
	const [freq, setFreq] = useState<string>("440");
	const [waveType, setWaveType] = useState<string>("Sine");
	const [volume, setVolume] = useState<string>("0.7");
	const updateVolume = useCallback(() => {
		if (audioCtx) {
			gainNode.gain.value = Number(volume);
		}
	}, [volume]);
	const updateOsc = useCallback(() => {
		if (audioCtx && currentOscillator.current) {
			const currentOsc = currentOscillator.current;
			currentOsc.type = waveType.toLowerCase() as OscillatorType;
			// handle custom wave type
			if (waveType === "custom") {
				const custom: PeriodicWave = createCustomWave(audioCtx);
				currentOsc.setPeriodicWave(custom);
			}
			currentOsc.frequency.value = Number(freq);
		}
	}, [freq, waveType]);

	const handleFreq = (e: ChangeEvent<HTMLInputElement>) => {
		setFreq(e.target.value);
	};
	const handleWaves = (e: ChangeEvent<HTMLSelectElement>) => {
		setWaveType(e.target.value);
	};
	const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
		setVolume(e.target.value);
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
		currentOscillator.current = osc;

		// set frequency to osc & start
		osc.frequency.value = Number(freq);
		osc.start();
		return osc;
	};

	const startPlaying = () => {
		const vol = Number(volume);
		if (!audioCtx) {
			const { audioCtx: ctx, gainNode: gain } = initAudio(vol);
			audioCtx = ctx;
			gainNode = gain;
		}
		const numFreq = Number(freq);
		playNote(numFreq);
	};
	const stopPlaying = () => {
		const active = currentOscillator.current;
		if (!active) return;
		active.stop();
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

	// watches for frequency & waveType changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		updateOsc();

		return () => {
			isMounted = false;
		};
	}, [updateOsc]);

	return (
		<div className={styles.Playground}>
			<div className={styles.Playground_actions}>
				<button type="button" onClick={startPlaying}>
					Start
				</button>
				<button type="button" onClick={stopPlaying}>
					Stop
				</button>
			</div>
			<div className={styles.Playground_settings}>
				<RangeInput
					key="frequency"
					name="freq"
					id="freq"
					val={freq}
					min={110}
					max={1760}
					step={1}
					label={`Frequency: ${freq} Hz`}
					handleChange={handleFreq}
				/>

				<Select
					name="waveType"
					id="waveType"
					label={`Waveform: ${waveType}`}
					val={waveType}
					options={waveTypes}
					disabledOptions={disabledWaves}
					handleChange={handleWaves}
				/>
				<RangeInput
					key="volume"
					name="volume"
					id="volume"
					val={volume}
					min={0}
					max={1}
					step={0.01}
					label={`Gain: ${volume} dB`}
					handleChange={handleVolume}
				/>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Playground;
