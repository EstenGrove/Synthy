import { ChangeEvent, useRef, useState } from "react";
import styles from "../../css/playground/DelayPlayground.module.scss";
import RangeInput from "../shared/RangeInput";
import { initAudio } from "../../utils/utils_audio";
import { Delay } from "../../audio/effects/Delay";
import { IKeyNote, getRandomKeyNote } from "../../audio/notes/notes";
import { VCO } from "../../audio/effects/VCO";
import { transpose } from "../../utils/utils_notes";
import { EnvelopeFilter } from "../../audio/effects/Filter";

let audioCtx: AudioContext;
let masterOut: GainNode;
const volume: number = 0.5;
const frequency = 440.0;

const DelayPlayground = () => {
	const osc = useRef<OscillatorNode | null>(null);
	// delay ms
	const [duration, setDuration] = useState<string>("0.5");
	// % of feedback
	const [feedback, setFeedback] = useState<string>("0.3");
	// attack time
	const [attack, setAttack] = useState("0.5");
	// release time
	const [release, setRelease] = useState("0.5");

	const handleDuration = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setDuration(value);
	};
	const handleFeedback = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFeedback(value);
	};
	// filter options
	const handleAttack = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAttack(value);
	};
	const handleRelease = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setRelease(value);
	};

	const init = () => {
		const { audioCtx: ctx, gainNode } = initAudio(volume);

		audioCtx = ctx;
		masterOut = gainNode;
	};

	const playVCO = () => {
		if (!audioCtx) {
			init();
		}

		// THIS IMPLEMENTATION USES CUSTOM:
		// - 'Delay' node class
		// - 'VCO' node(s) class
		const delay = new Delay(audioCtx, {
			level: 0.08,
			delayTime: Number(duration),
			feedback: Number(feedback),
		});
		const localOsc = new VCO(audioCtx, {
			freq: 440.0,
			semitones: 7,
			level: 0.5,
		});

		localOsc.connect(masterOut);
		delay.input = localOsc.nodes.vca;
		delay.output = masterOut;

		localOsc.start();
		localOsc.stop();
	};

	const playTone_WORKS = () => {
		if (!audioCtx) {
			init();
		}

		// THIS IMPLEMENTATION ONLY USES BROWSER-BASED NODE WITHOUT CUSTOMS WRAPPERS
		// - It's more verbose & easier to screw up the connections & such
		const delay = new DelayNode(audioCtx, { delayTime: Number(duration) });
		const feedbackNode = new GainNode(audioCtx, { gain: Number(feedback) });
		osc.current = new OscillatorNode(audioCtx, { frequency: frequency });
		// connect osc & delay & master
		osc.current.connect(masterOut);
		osc.current.connect(delay);
		delay.connect(masterOut);
		delay.connect(feedbackNode);
		feedbackNode.connect(delay);
		osc.current.start(audioCtx.currentTime);
		osc.current.stop(audioCtx.currentTime + 0.25);
	};

	const playTone = () => {
		if (!audioCtx) {
			init();
		}
		// const note: IKeyNote = getRandomKeyNote();

		// THIS IMPLEMENTATION USES A CUSTOM 'Delay' CLASS
		const delay = new Delay(audioCtx, {
			level: 0.03,
			delayTime: Number(duration),
			feedback: Number(feedback),
		});

		osc.current = new OscillatorNode(audioCtx, { frequency: frequency });
		delay.input = osc.current;
		delay.output = masterOut;
		// connect all the nodes
		osc.current.connect(masterOut);
		osc.current.start(audioCtx.currentTime);
		osc.current.stop(audioCtx.currentTime + 0.25);
	};

	const playRandom = () => {
		if (!audioCtx) {
			init();
		}
		// get a random note with C_MAJ scale
		const note = getRandomKeyNote();
		const freq = note.freq;
		// create ADSR filter
		const envelope = new EnvelopeFilter(audioCtx, {
			attack: Number(attack),
			release: Number(release),
		});
		// create osc1
		const osc1 = new OscillatorNode(audioCtx, {
			type: "sine",
			frequency: freq,
		});
		// create osc2
		const osc2 = new OscillatorNode(audioCtx, {
			type: "sine",
			frequency: transpose(freq, 7),
		});
		// add delay node & connect controls to it's settings for reactive changes
		const delay = new Delay(audioCtx, {
			level: 0.4,
			delayTime: Number(duration),
			feedback: Number(feedback),
		});

		envelope.input = osc1;
		envelope.input = osc2;
		envelope.output = delay.node;
		delay.input = osc1;
		delay.input = osc2;
		delay.output = masterOut;

		osc1.start();
		osc2.start();
		// gradually stop
		osc1.stop(audioCtx.currentTime + 0.25);
		osc2.stop(audioCtx.currentTime + 0.25);
	};

	const killAudio = () => {
		if (osc.current) {
			osc.current.stop(audioCtx.currentTime + 0.15);
			osc.current.disconnect();
		}
	};

	console.log("audioCtx", audioCtx);

	return (
		<div className={styles.DelayPlayground}>
			<div className={styles.DelayPlayground_actions}>
				<button type="button" onClick={playRandom}>
					Play Random Note
				</button>
				{/* <button type="button" onClick={playTone}> */}
				<button type="button" onClick={playVCO}>
					Play Osc
				</button>
				<button type="button" onClick={killAudio}>
					Kill Osc
				</button>
			</div>
			<div className={styles.DelayPlayground_settings}>
				{/* DELAY SETTINGS */}
				<div className={styles.DelayPlayground_settings_label}>
					Delay Settings
				</div>
				<RangeInput
					key="duration"
					name="duration"
					id="duration"
					val={duration}
					min={0.0}
					max={1.0}
					step={0.01}
					label={`Duration: ${Number(duration) * 1000} ms`}
					handleChange={handleDuration}
				/>
				<RangeInput
					key="feedback"
					name="feedback"
					id="feedback"
					val={feedback}
					min={0.0}
					max={1.0}
					step={0.01}
					label={`Feedback: ${Math.round(Number(feedback) * 100)}%`}
					handleChange={handleFeedback}
				/>
			</div>
			<div className={styles.DelayPlayground_settings}>
				{/* ENVELOPE-FILTER SETTINGS */}
				<div className={styles.DelayPlayground_settings_label}>
					Envelope (ADSR) Settings
				</div>
				<RangeInput
					key="attack"
					name="attack"
					id="attack"
					val={attack}
					min={0.0}
					max={1.0}
					step={0.01}
					label={`Attack: ${Number(attack) * 1000} ms`}
					handleChange={handleAttack}
				/>
				<RangeInput
					key="release"
					name="release"
					id="release"
					val={release}
					min={0.0}
					max={1.0}
					step={0.01}
					label={`Release: ${Math.round(Number(release) * 1000)} ms`}
					handleChange={handleRelease}
				/>
			</div>
		</div>
	);
};

export default DelayPlayground;
