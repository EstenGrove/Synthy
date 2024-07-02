import { useEffect, useRef, useState } from "react";
import styles from "../css/pages/AudioPage.module.scss";
import { ActiveOscMap, useKeyboardSynth } from "../hooks/useKeyboardSynth";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { createStreamNode } from "../utils/utils_audio";
import { capitalize } from "../utils/utils_shared";
import { saveFile } from "../utils/utils_files";
import Button from "../components/shared/Button";
import { useTimer } from "../hooks/useTimer";
import RecorderIsland from "../components/recorder/RecorderIsland";
import FullPageOverlay from "../components/shared/FullPageOverlay";

// Resource:
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination

const customCSS = {
	save: {
		backgroundColor: "var(--accent)",
		marginBottom: "3rem",
	},
	engage: {
		backgroundColor: "var(--accent-blue)",
		padding: "1rem 2rem",
	},
};

let audioCtx: AudioContext;
let masterOut: GainNode;

const AudioPage = () => {
	const [isOn, setIsOn] = useState<boolean>(false);
	const [waveType, setWaveType] = useState<OscillatorType>("square");
	const audioDestNode = useRef<MediaStreamAudioDestinationNode>();
	// LIKELY NOT NEEDED
	const [audioFileBlob, setAudioFileBlob] = useState<Blob>();
	const keySynth = useKeyboardSynth(waveType, {
		onNoteChange: (activeMap: ActiveOscMap) => {
			connectOscToStream(activeMap);
		},
	});
	const recorder = useAudioRecorder({
		audioType: "audio/ogg; codec=opus",
		onFinished: (audioBlob: Blob) => {
			setAudioFileBlob(audioBlob);
		},
	});
	// recorder states
	const status = recorder?.recordingState;
	const isRecording: boolean = recorder?.recordingState === "recording";

	const engageSynth = () => {
		const ctx = new AudioContext();
		audioCtx = ctx;

		keySynth.initSynth(ctx);
		initialize();
		setIsOn(true);
	};

	const startRecording = () => {
		if (!audioCtx) {
			initialize();
		}
		// create new Audio element
		recorder.start();
	};

	const stopRecording = () => {
		if (!audioCtx) return;
		recorder.stop();
	};

	const saveRecording = () => {
		if (!audioFileBlob) return alert("No audio file blob available!!!");

		const filename = `Recording-${Date.now().toString()}.ogg`;
		const fileBlob = audioFileBlob as Blob;
		saveFile(fileBlob, filename);
	};

	const initialize = () => {
		const destNode = createStreamNode(
			audioCtx
		) as MediaStreamAudioDestinationNode;

		// store in our ref(s)
		audioDestNode.current = destNode;

		// // Connect the osc to the destNode: oscNode.connect(destNode)
		recorder.initRecorder({
			audioCtx: audioCtx,
			mediaStream: destNode.stream,
			startRecording: false,
		});
	};

	// each time the list of oscillators changes (ie add/remove an osc) we connect the current list of oscillators to our recorder's destination node to record them
	const connectOscToStream = (activeMap: ActiveOscMap) => {
		if (activeMap?.size <= 0) return;
		const destNode = audioDestNode?.current as MediaStreamAudioDestinationNode;
		// connect active osc(s) to stream node
		for (const [, osc] of activeMap) {
			osc.connect(destNode);
		}
	};

	// this will destroy & close the AudioContext, which frees up memory for it's related resources
	const destroyAndReleaseResources = () => {
		if (!audioCtx) return;
		audioCtx.close();
	};

	return (
		<div className={styles.AudioPage}>
			<h1>Audio Experiments: Recording a Keyboard Synth (Multi-Oscs)</h1>
			<div className={styles.AudioPage_top}>
				<Button
					isDisabled={isOn}
					styles={customCSS.engage}
					onClick={engageSynth}
				>
					Engage Synth
				</Button>
			</div>
			<main className={styles.AudioPage_main}>
				{/* RECORDER CONTROLS */}
				<RecorderIsland
					startRecording={startRecording}
					stopRecording={stopRecording}
				/>

				{/* SAVE/DOWNLOAD FILE */}
				<Button styles={customCSS.save} onClick={saveRecording}>
					Save & Download
				</Button>

				{isRecording && (
					<>
						<div className={styles.AudioPage_main_recording}>Recording...</div>
					</>
				)}
				<div className={styles.AudioPage_main_status}>
					Status:{" "}
					<b>
						{capitalize(status)}
						{status === "recording" && "..."}
					</b>
				</div>
			</main>

			{!isOn && <FullPageOverlay onClick={engageSynth} />}
		</div>
	);
};

export default AudioPage;
