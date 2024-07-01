import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "../../css/visuals/VUMeter.module.scss";
import Button from "../shared/Button";

const getBaseLog = (x, y) => Math.log(y) / Math.log(x);
const getDb = (val) => getBaseLog(10, val) * 20;
const getMaskSize = (val) =>
	Math.min(Math.floor((getDb(val) * 100) / -42), 100);

let sourceNode: MediaElementAudioSourceNode;
let audioCtx: AudioContext;
let analyser: AnalyserNode;
let meterNode: ScriptProcessorNode;
let canvasCtx: CanvasRenderingContext2D;
// data values
let bufferLength: number;
let dataArray: Uint8Array;

type MeterProps = {
	percentage: number;
	minColor?: string;
	maxColor?: string;
};

const getMeterStyles = (minColor: string, maxColor: string) => {
	const css = {
		backgroundImage: `linear-gradient(
			to bottom in oklch,
			${maxColor} 0%,
			${minColor} 100%
		)
		`,
	};
	return css;
};

const MeterLeft = ({
	minColor = "var(--border)",
	maxColor = "#fff",
	percentage,
}: MeterProps) => {
	const percent = useMemo(() => {
		const level = {
			height: `${percentage}%`,
			backgroundImage: `linear-gradient(
			to bottom in oklch,
			${maxColor} 0%,
			${minColor} 100%
		)
		`,
		};

		return level;
	}, [percentage, minColor, maxColor]);

	return (
		<div
			data-channel-left={percentage.toString()}
			className={styles.MeterLeft}
			style={percent}
		>
			<div className={styles.MeterLeft_lines}></div>
		</div>
	);
};
const MeterRight = ({
	minColor = "var(--border)",
	maxColor = "#fff",
	percentage,
}: MeterProps) => {
	const percent = useMemo(() => {
		const level = {
			height: `${percentage}%`,
			backgroundImage: `linear-gradient(
			to bottom in oklch,
			${maxColor} 0%,
			${minColor} 100%
		)
		`,
		};

		return level;
	}, [percentage, minColor, maxColor]);

	return (
		<div
			data-channel-right={percentage.toString()}
			className={styles.MeterRight}
			style={percent}
		>
			<div className={styles.MeterRight_lines}></div>
		</div>
	);
};

const VUMeter = () => {
	const audioElem = useRef<HTMLMediaElement>(null);
	const [file, setFile] = useState(null);
	const fileUrl = useMemo(() => {
		if (!file) return;
		return URL.createObjectURL(file);
	}, [file]);
	const [channelMasks, setChannelMasks] = useState({
		left: 100,
		right: 100,
	});

	const handleFile = (e) => {
		const rawFile = e.target.files[0];
		setFile(rawFile);
	};

	const initMeter = () => {
		if (!audioCtx) {
			const audioEl = audioElem.current as HTMLMediaElement;
			// set audio nodes
			audioCtx = new AudioContext();
			meterNode = audioCtx.createScriptProcessor(2048, 2, 2);
			meterNode.onaudioprocess = draw;
			sourceNode = audioCtx.createMediaElementSource(audioEl);
			sourceNode.connect(meterNode);
			meterNode.connect(audioCtx.destination);
		}
	};

	const draw = (e: AudioProcessingEvent) => {
		const inputBuffer = e.inputBuffer;
		const lChannelData = inputBuffer.getChannelData(0);
		const rChannelData = inputBuffer.getChannelData(1);
		let lChannelMax = 0.0;
		let rChannelMax = 0.0;

		for (let sample = 0; sample < inputBuffer.length; sample++) {
			const lPoint = Math.abs(lChannelData[sample]);
			const rPoint = Math.abs(rChannelData[sample]);

			if (lPoint > lChannelMax) lChannelMax = lPoint;
			if (rPoint > rChannelMax) rChannelMax = rPoint;
		}
		setChannelMasks({
			left: getMaskSize(lChannelMax),
			right: getMaskSize(rChannelMax),
		});
	};

	console.log("sourceNode", sourceNode);

	return (
		<div className={styles.VUMeter}>
			<input type="file" name="file" id="file" onChange={handleFile} />
			{fileUrl && <audio ref={audioElem} src={fileUrl} controls loop></audio>}
			<div className={styles.VUMeter_inner}>
				{/* <MeterLeft percentage={channelMasks.left} /> */}
				{/* <MeterRight percentage={channelMasks.right} /> */}
				<div
					className={styles.VUMeter_inner_left}
					style={{ height: `${channelMasks.left}%` }}
				>
					<div className={styles.VUMeter_inner_left_lines}></div>
				</div>
				<div
					className={styles.VUMeter_inner_right}
					style={{ height: `${channelMasks.right}%` }}
				></div>
			</div>

			<Button onClick={initMeter}>Start Meter</Button>
		</div>
	);
};

export default VUMeter;
