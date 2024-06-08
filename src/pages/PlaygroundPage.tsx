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

const PlaygroundPage = () => {
	const isPlaying = useRef(false);
	const audioElem = useRef<HTMLMediaElement>(null);
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState("");

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

	console.log("fileUrl", fileUrl);
	console.log("file", file);

	return (
		<div className={styles.PlaygroundPage}>
			<h1>Playground Page</h1>
			<main className={styles.PlaygroundPage_main}>
				<input type="file" name="file" id="file" onChange={handleFile} />
				<audio ref={audioElem} src={fileUrl} controls loop></audio>

				{/* {audioCtx && sourceNode && (
					<PeakMeter audioCtx={audioCtx} sourceNode={sourceNode} />
				)} */}
				{/* <VUMeter /> */}
				<KeyboardSynth />
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
				<Knob />
			</main>
		</div>
	);
};

export default PlaygroundPage;
