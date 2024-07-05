import React, { useState } from "react";
import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/synth-panel/SynthyRecordingPanel.module.scss";
import { useTimer } from "../../hooks/useTimer";

type Props = {
	start: () => void;
	stop: () => void;
	pause?: () => void;
	resume?: () => void;
};

type TRecordingState = "inactive" | "recording" | "paused";

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

// const defaultTime = "1:36";

const SynthyRecordingPanel = ({ start, stop, pause, resume }: Props) => {
	const timer = useTimer();
	const time: string = timer.time;
	const [recordingState, setRecordingState] =
		useState<TRecordingState>("inactive");

	const startTimer = () => {
		timer.startTimer();
		setRecordingState("recording");

		if (start) {
			start();
		}
	};
	const stopTimer = () => {
		timer.stopTimer();
		setRecordingState("inactive");

		if (stop) {
			stop();
		}
	};
	const pauseTimer = () => {
		timer.pauseTimer();
		setRecordingState("paused");

		if (pause) {
			pause();
		}
	};
	const resumeTimer = () => {
		timer.startTimer();
		setRecordingState("recording");

		if (resume) {
			resume();
		}
	};

	return (
		<div data-name="recording-panel" className={styles.SynthyRecordingPanel}>
			<div className={styles.SynthyRecordingPanel_inner}>
				<Time time={time} />
				<StopButton state={recordingState} onClick={stopTimer} />
				<PauseButton state={recordingState} onClick={pauseTimer} />
				<ResumeButton state={recordingState} onClick={resumeTimer} />
				<RecordButton state={recordingState} onClick={startTimer} />
			</div>
		</div>
	);
};

export default SynthyRecordingPanel;
