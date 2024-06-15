import { useRef, useState } from "react";
import { useAudioRecorder } from "./useAudioRecorder";

// webm, wav, mp3 etc

// Specific type: 'RecordingState' from mediaRecorder.state
type TRecordingState = "inactive" | "recording" | "paused";

type HookProps = {
	audioType?: string;
	onFinished?: (blob: Blob) => void;
};

interface IHookReturn {
	audioBlob: Blob;
	recordingState: TRecordingState;
	startRecording: () => void;
	stopRecording: () => void;
	pauseRecording: () => void;
	resumeRecording: () => void;
	getPermission: () => void;
}

const useVoiceRecorder = ({
	audioType = "audio/webm",
	onFinished,
}: HookProps): IHookReturn => {
	const audioCtx = useRef<AudioContext>();
	const [audioBlob, setAudioBlob] = useState<Blob>();
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	// audio recorder hook; handles all the actual recording process
	const audioRecorder = useAudioRecorder({
		audioType: audioType as string,
		onFinished: (blob: Blob) => {
			// audioBlob.current = blob;
			setAudioBlob(blob);

			// if we have a handler, call it
			if (onFinished) {
				onFinished(blob);
			}
		},
	});

	// asks for mic permission, creates MediaStream & sets state(s)
	const getPermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				audioCtx.current = new AudioContext();
				const ctx = audioCtx.current;

				// initialize recorder
				audioRecorder.initRecorder({
					audioCtx: ctx,
					mediaStream: streamData,
					startRecording: false,
				});
				return setHasPermission(true);
			} catch (error) {
				return error;
			}
		}
	};

	const startRecording = () => {
		if (hasPermission) {
			audioRecorder.start();
		} else {
			alert("Need permission to record!");
		}
	};
	const stopRecording = () => {
		if (hasPermission) {
			audioRecorder.stop();
		} else {
			alert("Need permission to stop a recording!");
		}
	};
	const pauseRecording = () => {
		if (hasPermission) {
			audioRecorder.pause();
		} else {
			alert("Need permission to stop a recording!");
		}
	};
	const resumeRecording = () => {
		if (hasPermission) {
			audioRecorder.resume();
		} else {
			alert("Need permission to stop a recording!");
		}
	};

	return {
		startRecording,
		stopRecording,
		resumeRecording,
		pauseRecording,
		getPermission,
		recordingState: audioRecorder?.recordingState,
		audioBlob: audioBlob as Blob,
	};
};

export { useVoiceRecorder };
