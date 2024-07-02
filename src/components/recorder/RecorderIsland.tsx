import { useState } from "react";
import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/recorder/RecorderIsland.module.scss";
import { useTimer } from "../../hooks/useTimer";

type BtnProps = {
	onClick: () => void;
	state: TRecordingState;
};

enum ERecordingStates {
	inactive = "inactive",
	recording = "recording",
	paused = "paused",
}

const RecordButton = ({ onClick, state }: BtnProps) => {
	const isRecording = state === ERecordingStates.recording;
	const iconFill = {
		fill: isRecording ? "#fff" : "var(--accent-bright-red)",
	};
	return (
		<button
			onClick={onClick}
			disabled={isRecording}
			className={styles.RecordButton}
		>
			<svg className={styles.RecordButton_icon} style={iconFill}>
				<use xlinkHref={`${sprite}#icon-stop_circle`}></use>
			</svg>
		</button>
	);
};

const StopButton = ({ onClick, state }: BtnProps) => {
	const isRecording = state === ERecordingStates.recording;
	const iconFill = {
		fill: isRecording ? "var(--accent-bright-red)" : "#fff",
	};
	return (
		<button onClick={onClick} className={styles.StopButton}>
			<svg className={styles.StopButton_icon} style={iconFill}>
				<use xlinkHref={`${sprite}#icon-controller-stop`}></use>
			</svg>
		</button>
	);
};
const PauseButton = ({ onClick, state }: BtnProps) => {
	const isRecording = state === ERecordingStates.recording;
	return (
		<button
			onClick={onClick}
			disabled={!isRecording}
			className={styles.PauseButton}
		>
			<svg className={styles.PauseButton_icon}>
				<use xlinkHref={`${sprite}#icon-pause`}></use>
			</svg>
		</button>
	);
};
const ResumeButton = ({ onClick, state }: BtnProps) => {
	const isPaused = state === ERecordingStates.paused;
	return (
		<button
			onClick={onClick}
			disabled={!isPaused}
			className={styles.ResumeButton}
		>
			<svg className={styles.ResumeButton_icon}>
				<use xlinkHref={`${sprite}#icon-controller-play`}></use>
			</svg>
		</button>
	);
};

type TRecordingState = "inactive" | "recording" | "paused";

type TimeProps = {
	time?: string | number;
};
const Time = ({ time }: TimeProps) => {
	return (
		<div className={styles.Time}>
			<div className={styles.Time_value}>{time}</div>
		</div>
	);
};

type Props = {
	startRecording: () => void;
	stopRecording: () => void;
	pauseRecording?: () => void;
	resumeRecording?: () => void;
};

const RecorderIsland = ({
	startRecording,
	stopRecording,
	pauseRecording,
	resumeRecording,
}: Props) => {
	const timer = useTimer();
	const [recordingState, setRecordingState] =
		useState<TRecordingState>("inactive");

	const start = () => {
		setRecordingState("recording");
		if (startRecording) {
			startRecording();
			timer.startTimer();
		}
	};
	const stop = () => {
		setRecordingState("inactive");
		if (stopRecording) {
			stopRecording();
			timer.stopTimer();
		}
	};
	const pause = () => {
		setRecordingState("paused");
		if (pauseRecording) {
			pauseRecording();
			timer.pauseTimer();
		}
	};
	const resume = () => {
		setRecordingState("recording");
		if (resumeRecording) {
			resumeRecording();
			timer.startTimer();
		}
	};

	return (
		<aside data-label="island" className={styles.RecorderIsland}>
			<RecordButton state={recordingState} onClick={start} />
			<Time time={timer.time} />
			<StopButton state={recordingState} onClick={stop} />
			{false && (
				<>
					<ResumeButton state={recordingState} onClick={resume} />
					<PauseButton state={recordingState} onClick={pause} />
				</>
			)}
		</aside>
	);
};

export default RecorderIsland;
