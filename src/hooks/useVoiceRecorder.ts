import { useEffect, useRef, useState } from "react";
import { useAudioRecorder } from "./useAudioRecorder";
import { queryNavigatorPermissions } from "../utils/utils_audio";

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
	const mediaStream = useRef<MediaStream>();
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

	const setupRecorder = async () => {
		if (!mediaStream?.current) {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			});
			mediaStream.current = stream;
		}
		audioCtx.current = new AudioContext();
		const ctx = audioCtx.current;

		// initialize recorder w/ our media stream
		audioRecorder.initRecorder({
			audioCtx: ctx,
			mediaStream: mediaStream.current,
			startRecording: false,
		});
	};

	// asks for mic permission, creates MediaStream & sets permissions' state
	const getPermission = async () => {
		if ("MediaRecorder" in window) {
			try {
				// check for existing permissions
				const permsState = await queryNavigatorPermissions(
					"microphone" as PermissionName
				);
				const isGranted = permsState === "granted";
				// return early if we have them
				if (isGranted) return setHasPermission(isGranted);

				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				});
				mediaStream.current = stream;
				setHasPermission(isGranted);
			} catch (error) {
				setHasPermission(false);
				return error;
			}
		}
	};

	const startRecording = async () => {
		// if no stream exists, then we wont' have an audioCtx or recorder either...
		// ...so we create them & initialize a recorder instance & wait til it's ready
		if (!mediaStream.current) {
			await setupRecorder();
		}

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

	// we want to check if mic access is already granted
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// query for mic permission on mount
		const checkDefaultPerms = async () => {
			const perms = await queryNavigatorPermissions(
				"microphone" as PermissionName
			);
			const isGranted = perms === "granted";

			setHasPermission(isGranted);
		};

		checkDefaultPerms();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
