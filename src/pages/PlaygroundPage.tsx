import React, {
	useRef,
	useMemo,
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
} from "react";
import styles from "../css/pages/PlaygroundPage.module.scss";
import Playground from "../components/playground/Playground";
import Knob from "../components/controls/Knob";
import DelayPlayground from "../components/playground/DelayPlayground";
import Fader from "../components/controls/Fader";
import SinePlayground from "../components/playground/SinePlayground";
import OscilloscopePlayground from "../components/playground/OscilloscopePlayground";
import SoundsPlayground from "../components/playground/SoundsPlayground";
import CustomOscPlayground from "../components/playground/CustomOscPlayground";
import KeyboardSynth from "../components/keyboard-synth/KeyboardSynth";
import { useKeyboardSynth } from "../hooks/useKeyboardSynth";
import Button from "../components/shared/Button";
import VUMeter from "../components/visuals/VUMeter";
import PeakMeter from "../components/visuals/PeakMeter";
import MyKnob from "../components/controls/MyKnob";
import AltKnob from "../components/controls/AltKnob";
import KnobArc from "../components/controls/KnobArc";
import EffectColumn from "../components/synth/EffectColumn";
import EffectBlock from "../components/synth/EffectBlock";
import RackMount from "../components/visuals/RackMount";
import KnotchedKnob, { IOption } from "../components/controls/KnotchedKnob";
import Bubbles from "../components/shapes/Bubbles";
import WaveForms from "../components/shapes/WaveForms";
// notch wave options
import SquareWave from "../components/shapes/SquareWave";
import TriangleWave from "../components/shapes/TriangleWave";
import SawtoothWave from "../components/shapes/SawtoothWave";
import SineWave from "../components/shapes/SineWave";

const customCSS = {
	on: {
		backgroundColor: "var(--accent-green)",
		margin: "1rem 1rem",
	},
	off: {
		backgroundColor: "var(--accent-red)",
		margin: "1rem 1rem",
	},
};

let sourceNode: MediaElementAudioSourceNode;
let audioCtx: AudioContext;

const options: IOption[] = [
	{
		value: "Triangle",
		element: TriangleWave,
	},
	{
		value: "Square",
		element: SquareWave,
	},
	{
		value: "Sine",
		element: SineWave,
	},
	{
		value: "Sawtooth",
		element: SawtoothWave,
	},
];

const PlaygroundPage = () => {
	const isPlaying = useRef(false);
	const audioElem = useRef<HTMLMediaElement>(null);
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState("");
	// knob val
	const [value, setValue] = useState<number>(15);
	const [waveType, setWaveType] = useState<string>("Sine");

	const setupMeter = () => {
		console.log("WAS RUN");

		const audioEl = audioElem.current as HTMLMediaElement;
		audioCtx = new AudioContext();
		sourceNode = audioCtx.createMediaElementSource(audioEl);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	const handleFile = (e) => {
		const rawFile = e.target.files[0];
		const url = URL.createObjectURL(rawFile);
		setFile(rawFile);
		setFileUrl(url);
		setupMeter();
		// const audioEl = audioElem.current as HTMLMediaElement;
		// audioCtx = new AudioContext();
		// sourceNode = audioCtx.createMediaElementSource(audioEl);
	};

	const handleVal = (val) => {
		setValue(val);
	};

	const handleWaveType = (type: string) => {
		setWaveType(type);
		console.log("type", type);
	};

	return (
		<div className={styles.PlaygroundPage}>
			<h1>Playground Page</h1>
			<main className={styles.PlaygroundPage_main}>
				<SquareWave color="var(--accent-red)" />
				<TriangleWave color="var(--accent-red)" />
				<SawtoothWave color="var(--accent-red)" />
				<SineWave color="var(--accent-red)" />
			</main>
			<main className={styles.PlaygroundPage_main}>
				<RackMount title="Osc-1">
					<KnotchedKnob options={options} onChange={handleWaveType} />
					<Knob size="SM" name="freq" label="Freq" onChange={handleVal} />
					<Knob size="SM" name="lpf" label="LPF" onChange={handleVal} />
					<Knob size="SM" name="reverb" label="Reverb" onChange={handleVal} />
				</RackMount>
				<RackMount title="Osc-2" subtitle="Hi-Freq Oscillator">
					<KnotchedKnob options={options} onChange={handleWaveType} />
					<Knob size="SM" name="freq2" label="Freq" onChange={handleVal} />
					<Knob size="SM" name="lpf2" label="LPF" onChange={handleVal} />
					<Knob size="SM" name="reverb2" label="Reverb" onChange={handleVal} />
				</RackMount>

				<div className={styles.KnobWrapper}>
					{/* <KnobArc value={15} /> */}

					<EffectBlock label="Reverb">
						<Knob name="time" label="Time" size="SM" onChange={handleVal} />
						<Knob name="decay" label="Decay" size="SM" onChange={handleVal} />
						<Knob name="wet" label="Wet" size="SM" onChange={handleVal} />
						<Knob name="dry" label="Dry" size="SM" onChange={handleVal} />
					</EffectBlock>

					<EffectColumn label="Osc">
						<Knob name="freq3" label="Freq." size="SM" onChange={handleVal} />
						<Knob name="flevel" label="Level" size="SM" onChange={handleVal} />
					</EffectColumn>
					<EffectColumn label="Delay">
						<Knob name="time2" size="SM" label="Time" onChange={handleVal} />
						<Knob name="wet2" size="SM" label="Wet" onChange={handleVal} />
					</EffectColumn>
					<EffectColumn label="Osc">
						<Knob name="gain1" size="SM" label="Gain" onChange={handleVal} />
					</EffectColumn>
					<EffectColumn label="Osc">
						<Knob name="gain2" size="SM" label="Gain" onChange={handleVal} />
					</EffectColumn>
				</div>
				{/* {audioCtx && sourceNode && (
					<PeakMeter audioCtx={audioCtx} sourceNode={sourceNode} />
				)} */}
				{/* <VUMeter /> */}
				{/* <KeyboardSynth /> */}
				{/* <CustomOscPlayground /> */}
				{/* <SoundsPlayground /> */}
				{/* <Playground /> */}
				{/* <DelayPlayground /> */}
				{/* <SinePlayground /> */}
				{/* <OscilloscopePlayground /> */}
				<br />
				<br />
				<br />
				{/* <Fader
					val={val}
					id="volume"
					name="volume"
					label="Master"
					handleChange={handleVal}
				/> */}
				{/* <Knob /> */}
			</main>
		</div>
	);
};

export default PlaygroundPage;
