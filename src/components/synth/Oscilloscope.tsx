import React, { useRef } from "react";
import styles from "../../css/synth/Oscilloscope.module.scss";

type Props = {
	waveType?: OscillatorType;
	frequency: number;
	width?: number; // in px
	height?: number; // in px
};

const defaultWidth: number = 700;
const defaultHeight: number = 500;

const TIME_CONSTANT: number = 1;
const FFT_SIZE: number = 2048;

let audioCtx: AudioContext;
let analyser: AnalyserNode;
let oscillator: OscillatorNode;
let dataArray: Uint8Array;

// canvas context
let ctx: CanvasRenderingContext2D;

const Oscilloscope = ({
	waveType = "sine",
	frequency,
	width,
	height,
}: Props) => {
	const isPlaying = useRef<boolean>(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const startOsc = () => {
		const canvas = canvasRef?.current as HTMLCanvasElement;
		// initialize nodes & context
		audioCtx = new AudioContext();
		oscillator = new OscillatorNode(audioCtx, {
			type: waveType,
			frequency: frequency ?? 440,
		});
		analyser = new AnalyserNode(audioCtx, {
			smoothingTimeConstant: TIME_CONSTANT,
			fftSize: FFT_SIZE,
		});
		// set initial dataset
		dataArray = new Uint8Array(analyser.frequencyBinCount);

		// connect nodes
		oscillator.connect(analyser);
		oscillator.start();
		isPlaying.current = true;

		ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		ctx.clearRect(0, 0, canvas.width as number, canvas.height as number);
		draw();
	};

	const stopOsc = () => {
		if (!audioCtx || !oscillator) return;
		oscillator.stop();
		isPlaying.current = false;
	};

	const draw = () => {
		analyser.getByteTimeDomainData(dataArray);
		const canvas = canvasRef.current as HTMLCanvasElement;
		// const segWidth = canvas.width / analyser.frequencyBinCount;
		const segWidth = canvas.width / analyser.frequencyBinCount;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.moveTo(-100, canvas.height / 2);
		if (isPlaying.current) {
			for (let i = 1; i < analyser.frequencyBinCount; i += 1) {
				const x = i * segWidth;
				// wave height (original size/dimensions)
				const vOrigin = dataArray[i] / 128.0;
				// This shortens each wave's height by 30% (eg. waves are 30% of canvas height)
				const v = vOrigin - vOrigin * 0.3;
				const cHeight = canvas.height;
				// Where the waves will be positioned (eg. in the middle 30%)
				const y = (v * cHeight) / 2 + cHeight * 0.15;
				ctx.lineTo(x, y);
				ctx.lineWidth = 2;
			}
		}
		ctx.lineTo(canvas.width + 100, canvas.height / 2);
		ctx.stroke();
		ctx.strokeStyle = "slateblue";
		requestAnimationFrame(draw);
	};

	return (
		<div className={styles.Oscilloscope}>
			<canvas
				ref={canvasRef}
				width={width ?? defaultWidth}
				height={height ?? defaultHeight}
				data-label="oscilloscope"
				className={styles.Oscilloscope_canvas}
			></canvas>
			<div className={styles.Oscilloscope_actions}>
				<button type="button" onClick={startOsc}>
					Start
				</button>
				<button type="button" onClick={stopOsc}>
					Stop
				</button>
			</div>
		</div>
	);
};

export default Oscilloscope;
