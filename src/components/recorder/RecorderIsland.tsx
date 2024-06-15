import { useState } from "react";
import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/recorder/RecorderIsland.module.scss";

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

const RecorderIsland = () => {
	const [recordingState, setRecordingState] =
		useState<TRecordingState>("inactive");
	const [time, setTime] = useState<string>("0:37");

	const start = () => {
		setRecordingState("recording");
	};
	const stop = () => {
		setRecordingState("inactive");
	};
	const pause = () => {
		setRecordingState("paused");
	};
	const resume = () => {
		setRecordingState("recording");
	};

	return (
		<aside data-label="island" className={styles.RecorderIsland}>
			<RecordButton state={recordingState} onClick={start} />
			<Time time={time} />
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
