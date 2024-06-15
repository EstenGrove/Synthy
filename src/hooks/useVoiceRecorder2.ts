import { useEffect, useRef, useState } from "react";
import { useAudioRecorder2 } from "./useAudioRecorder2";

// webm, wav, mp3 etc

type HookProps = {
	audioType?: string;
	onFinished?: (blob: Blob) => void;
};

const useVoiceRecorder2 = ({
	audioType = "audio/webm",
	onFinished,
}: HookProps) => {
	const audioCtx = useRef<AudioContext>();
	// const audioBlob = useRef<Blob>();
	const [audioBlob, setAudioBlob] = useState<Blob>();
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	// audio recorder hook; handles all the actual recording process
	const audioRecorder = useAudioRecorder2({
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
		audioBlob: audioBlob,
		// audioBlob: audioBlob.current,
	};
};

export { useVoiceRecorder2 };
