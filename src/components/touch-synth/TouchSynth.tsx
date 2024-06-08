import { useRef, useMemo, useEffect, useCallback, RefObject } from "react";
import styles from "../../css/touch-synth/TouchSynth.module.scss";
import TouchPad from "./TouchPad";
import { useRelativeMousePosition } from "../../hooks/useRelativeMousePosition";
import { useRelativeTouchPosition } from "../../hooks/useRelativeTouchPosition";
import TouchControls from "./TouchControls";
import Canvas from "../canvas/Canvas";
import TouchCanvas from "./TouchCanvas";
import { radiansToDegrees } from "../../utils/utils_canvas";
import { initAudio } from "../../utils/utils_audio";

// 9x5
const GRID_SIZE = 60;

// Accounts for either mouse or touch position (relative to element)
interface IRelPosition {
	x: number;
	y: number;
}

const getRadians = (x: number, y: number): number => {
	const rads = Math.atan2(y, x);
	return rads;
};

const calcFreqFromPosition = (position: IRelPosition) => {
	const { x: rawX, y: rawY } = position;
	const half = GRID_SIZE / 2;
	const x = Math.round(rawX + half);
	const y = Math.round(rawY + half);
	const cellX = Math.round(x / GRID_SIZE);
	const cellY = Math.round(y / GRID_SIZE);

	return {
		cellX,
		cellY,
	};
};

let audioCtx: AudioContext;
let masterOut: GainNode;
let osc: OscillatorNode;

const TouchSynth = () => {
	// synth states
	const isDragging = useRef<boolean>(false);
	const canvasCtx = useRef<CanvasRenderingContext2D>();
	const padRef = useRef<HTMLDivElement | HTMLCanvasElement>(null);
	// mouse/touch position
	const position = useRelativeMousePosition(padRef);
	const touchPos = useRelativeTouchPosition(padRef);
	const cellPosition = useMemo(() => {
		if (position.elementX < 0 || position.elementY < 0) {
			return {
				cellX: 0,
				cellY: 0,
			};
		}

		return calcFreqFromPosition({
			x: position.elementX,
			y: position.elementY,
		});
	}, [position]);
	const rads = getRadians(position.elementX, position.elementY) * 1000;
	// update osc's frequency on mousemove/drag
	const updateFreq = useCallback(() => {
		if (!isDragging.current) return;
		osc.frequency.value = rads;
	}, [rads]);

	const engage = () => {
		const result = initAudio(0.5);
		return result;
	};

	// MouseEvent: down
	const mouseDown = () => {
		console.log("ran");
		isDragging.current = true;
		if (!audioCtx) {
			const { audioCtx: ctx, gainNode } = engage();
			audioCtx = ctx;
			masterOut = gainNode;
		}
		osc = new OscillatorNode(audioCtx, {
			type: "triangle",
			frequency: rads,
		});
		osc.connect(masterOut);
		osc.start();
		// masterOut.connect(audioCtx.destination);
	};
	// MouseEvent: up
	const mouseUp = () => {
		isDragging.current = false;
		if (osc) {
			osc.stop();
		}
	};

	// UIEvent: start
	const touchStart = () => {
		isDragging.current = true;
	};
	// UIEvent: end
	const touchEnd = () => {
		isDragging.current = false;
	};

	// set canvas rendering context from node
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (padRef.current) {
			const canvas = padRef.current as HTMLCanvasElement;
			const ctx = canvas.getContext("2d");
			canvasCtx.current = ctx as CanvasRenderingContext2D;
		}

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		updateFreq();

		return () => {
			isMounted = false;
		};
	}, [updateFreq]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		document.addEventListener("mouseup", mouseUp);

		return () => {
			isMounted = false;
			document.removeEventListener("mouseup", mouseUp);
		};
	}, []);

	return (
		<div className={styles.TouchSynth}>
			<div className={styles.TouchSynth_controls}>
				<TouchControls>
					<div>
						<h2>Mouse Position:</h2>
						<div>
							X: {position.elementX}, Y: {position.elementY}
						</div>
					</div>
					<div>
						<h2>Touch Position:</h2>
						<div>
							X: {touchPos.elementX}, Y: {touchPos.elementY}
						</div>
					</div>
					<div>
						<h2>Cell Position:</h2>
						<div>
							X: {cellPosition.cellX}, Y: {cellPosition.cellY}
						</div>
					</div>
					<div>
						<h2>Radians (from mouse position):</h2>
						<div>Radians: {rads}</div>
					</div>
				</TouchControls>
			</div>
			<div className={styles.TouchSynth_pad}>
				{/* DIV VERSION */}
				{/* <TouchPad
					padRef={padRef}
					handleMouseDown={mouseDown}
					handleMouseUp={mouseUp}
					handleTouchStart={touchStart}
					handleTouchEnd={touchEnd}
				/> */}
				{/* CANVAS VERSION */}
				<TouchCanvas
					width={600}
					height={600}
					canvasCtx={canvasCtx as RefObject<CanvasRenderingContext2D>}
					canvasRef={padRef as RefObject<HTMLCanvasElement>}
					handleMouseDown={mouseDown}
					handleMouseUp={mouseUp}
				/>

				{/* <Canvas
					width={600}
					height={600}
          canvasRef={padRef as RefObject<HTMLCanvasElement>}
          
				/> */}
			</div>
			<div className={styles.TouchSynth_controls}>
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default TouchSynth;
