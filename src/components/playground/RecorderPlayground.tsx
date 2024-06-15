import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/playground/RecorderPlayground.module.scss";
import { initAudio } from "../../utils/utils_audio";
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
// mock tracks
import sample_1 from "../../assets/audio/SmoothGTR-1.mp3";
import sample_2 from "../../assets/audio/audio-sample-2.mp3";
import Track from "../recorder/Track";
import Button from "../shared/Button";
import { useKeyboardSynth } from "../../hooks/useKeyboardSynth";
import { saveFile } from "../../utils/utils_files";

type Props = {};

const tracks = [
	{
		id: 1,
		title: "Soft-Tone Guitar",
		src: sample_1,
		duration: 97,
	},
	{
		id: 2,
		title: "Trip-Hop Groove",
		src: sample_2,
		duration: 48,
	},
];

let audioCtx: AudioContext = new AudioContext();
let masterOut: GainNode;
const sourceStream: MediaStreamAudioDestinationNode =
	audioCtx.createMediaStreamDestination();
const stream = sourceStream.stream;

const RecorderPlayground = () => {
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const audioCtxRef = useRef<AudioContext>();
	const synth = useKeyboardSynth({ waveType: "sine" });
	const recorder = useAudioRecorder({
		audioCtx: audioCtxRef?.current as AudioContext,
		inputNode: masterOut,
		onFinished: getAudioBlob,
	});

	function getAudioBlob(blob: Blob) {
		console.log("blob", blob);
		saveFile(blob, "MyFile");
	}

	const initializeAudio = () => {
		const { initRecorder } = recorder;
		const { audioCtx: ctx, gainNode: gain } = initAudio(0.5);
		audioCtx = ctx;
		masterOut = gain;
		initRecorder();
	};

	const enable = () => {
		initializeAudio();
	};
	const disable = () => {
		recorder.stop();
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (synth?.activeOscillators) {
			const oscs = Object.values(synth?.activeOscillators);
			oscs.forEach((osc) => {
				osc.connect(masterOut);
			});
		}

		return () => {
			isMounted = false;
		};
	}, [synth?.activeOscillators]);

	return (
		<div className={styles.RecorderPlayground}>
			<div className={styles.RecorderPlayground_main}>
				{tracks &&
					tracks.map((track, idx) => (
						<Track key={`${track.id}-${idx}`} track={track} />
					))}
				<Button isDisabled={hasPermission} onClick={enable}>
					Record
				</Button>
				<Button isDisabled={hasPermission} onClick={disable}>
					Stop
				</Button>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default RecorderPlayground;
