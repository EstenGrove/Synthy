import { useState, useEffect } from "react";
import styles from "../../css/playground/MultiRecorderPlayground.module.scss";
import Button from "../shared/Button";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { saveFile } from "../../utils/utils_files";
import { formatDateTime, formatTime } from "../../utils/utils_dates";
import { queryNavigatorPermissions } from "../../utils/utils_audio";

const customCSS = {
	perms: {
		backgroundColor: "#000",
		border: "1px solid var(--border)",
	},
	record: {
		backgroundColor: "var(--accent-green)",
		margin: "0 2rem",
	},
	stop: {
		backgroundColor: "var(--accent-blue)",
	},
	save: {
		backgroundColor: "var(--accent-bright-red)",
		margin: "0 2rem",
	},
};

const MultiRecorderPlayground = () => {
	const [localBlob, setLocalBlob] = useState<Blob>();
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const voiceRecorder = useVoiceRecorder({
		audioType: "audio/webm",
		onFinished: (blob: Blob) => {
			setLocalBlob(blob);
		},
	});
	const { audioBlob, recordingState } = voiceRecorder;
	const isRecording = recordingState === "recording";
	const isPaused = recordingState === "paused";

	const askPermission = () => {
		voiceRecorder.getPermission();
	};

	const enable = () => {
		voiceRecorder.startRecording();
	};
	const disable = () => {
		voiceRecorder.stopRecording();
	};

	const downloadFile = () => {
		const blob = localBlob as Blob;
		const filename = formatTime(new Date(), "short");
		saveFile(blob, `Audio_${filename}.webm`);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		const resolvePerms = async (permName: PermissionName) => {
			const perms = await queryNavigatorPermissions(permName);
			const isGranted = perms === "granted";
			console.log("perms", perms);
			setHasPermission(isGranted);
		};
		resolvePerms("microphone" as PermissionName);

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className={styles.MultiRecorderPlayground}>
			<div className={styles.MultiRecorderPlayground_state}>
				{isRecording && (
					<b style={{ color: "var(--accent-bright-red)" }}>Recording...</b>
				)}
				{recordingState === "inactive" && (
					<b style={{ color: "var(--border)" }}>Inactive</b>
				)}
				{isPaused && (
					<b style={{ color: "var(--accent-green)" }}>Recording is PAUSED!</b>
				)}
			</div>
			<Button
				isDisabled={isRecording || isPaused || hasPermission}
				styles={customCSS.perms}
				onClick={askPermission}
			>
				Ask Permission
			</Button>
			<Button
				isDisabled={isRecording || isPaused}
				styles={customCSS.record}
				onClick={enable}
			>
				Record
			</Button>
			<Button
				isDisabled={!isRecording}
				styles={customCSS.stop}
				onClick={disable}
			>
				Stop
			</Button>
			<Button
				isDisabled={isRecording || isPaused || !localBlob}
				styles={customCSS.save}
				onClick={downloadFile}
			>
				Save File
			</Button>
		</div>
	);
};

export default MultiRecorderPlayground;
