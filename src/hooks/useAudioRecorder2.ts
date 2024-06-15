import { useState, useRef } from "react";

// NOTE:
// - Ideal audio format(s) for cross-browser compatibility:
//      - MP3, OGG, WAV

const AUDIO_TYPE = "audio/webm";

type TAudioType =
	| "audio/webm"
	| "audio/ogg; codec=opus"
	| "audio/mpeg"
	| "audio/wav"
	| "audio/aac"
	| "audio/ogg";
// Specific type: 'RecordingState' from mediaRecorder.state
type TRecordingState = "inactive" | "recording" | "paused";
// Supported action types for the 'action' handler
type TActionType = "start" | "stop" | "resume" | "pause";
type HookProps = {
	audioType: TAudioType | string;
	onDataAvailable?: (e: BlobEvent) => void;
	onFinished?: (audioBlob: Blob) => void;
};
// creates a stream node

const createAudioRecorder = (mediaStream: MediaStream): MediaRecorder => {
	const recorder = new MediaRecorder(mediaStream);
	return recorder;
};

interface IInit {
	audioCtx: AudioContext;
	mediaStream: MediaStream;
	startRecording?: boolean;
}

// Deps:
// - Input node
// - Audio Processing Callback
const chunks: Blob[] = [];

const useAudioRecorder2 = ({
	audioType = AUDIO_TYPE,
	onDataAvailable,
	onFinished,
}: HookProps) => {
	const stream = useRef<MediaStream>(); // our media stream, maybe from a stream node
	const audioContext = useRef<AudioContext>();
	const audioRecorder = useRef<MediaRecorder>();
	const [audioChunks, setAudioChunks] = useState<Blob[]>([]); // continuous flow of audio blob chunks
	const [audioBlob, setAudioBlob] = useState<Blob>(); // final audio blob result
	const [recordingState, setRecordingState] =
		useState<TRecordingState>("inactive");

	const initRecorder = ({
		audioCtx,
		mediaStream,
		startRecording = true,
	}: IInit) => {
		const recorder = createAudioRecorder(mediaStream);

		// set our nodes to our refs
		audioContext.current = audioCtx;
		audioRecorder.current = recorder;
		stream.current = mediaStream;

		// NO LONGER NEEDED!!!
		// connect our input source
		// this would have to happen outside of this hook & fn
		// inputNode.connect(streamDest);

		if (startRecording) {
			start();
		}
	};

	// supports: start, stop, resume, pause
	const action = (type: TActionType) => {
		const recorder = audioRecorder.current as MediaRecorder;
		// invoke recorder action type
		recorder?.[type]();
		setRecordingState(recorder.state as TRecordingState);
	};

	const start = () => {
		const recorder = audioRecorder.current as MediaRecorder;

		recorder.start();
		setRecordingState(recorder.state as TRecordingState);

		// apply event handler(s) for saving the audio chunks
		recorder.ondataavailable = (e) => {
			processAudioData(e);
			if (onDataAvailable) {
				onDataAvailable(e);
			}
		};
	};
	const stop = () => {
		const recorder = audioRecorder.current as MediaRecorder;

		recorder.stop();
		recorder.onstop = () => processAudioBlob();
		setRecordingState(recorder.state as TRecordingState);
	};
	const pause = () => {
		const recorder = audioRecorder.current as MediaRecorder;

		recorder.pause();
		setRecordingState(recorder.state as TRecordingState);
	};
	const resume = () => {
		const recorder = audioRecorder.current as MediaRecorder;

		recorder.resume();
		setRecordingState(recorder.state as TRecordingState);
	};

	// processes the final result
	const processAudioBlob = () => {
		const finalBlob = new Blob(chunks, { type: audioType });
		setAudioBlob(finalBlob);
		// check for handler & pass final result, if available
		if (onFinished) {
			onFinished(finalBlob);
		}
	};

	// takes the audio chunks from the recorder & pushes them to state
	const processAudioData = (e: BlobEvent) => {
		const chunk = e.data as Blob;
		// add new chunk to array
		chunks.push(chunk);
		// sync to state
		setAudioChunks(chunks);
	};

	return {
		initRecorder,
		start,
		stop,
		pause,
		resume,
		action,
		audioChunks,
		audioBlob,
		recordingState,
		recorder: audioRecorder?.current as MediaRecorder,
	};
};

export { useAudioRecorder2 };
