import { useRef, useMemo, useEffect, useCallback, RefObject } from "react";
import styles from "../../css/touch-osc/TouchOsc.module.scss";
import TouchPad from "./TouchPad";
import { useRelativeMousePosition } from "../../hooks/useRelativeMousePosition";
import { useRelativeTouchPosition } from "../../hooks/useRelativeTouchPosition";
import TouchOscControls from "./TouchOscControls";
import Canvas from "../canvas/Canvas";
import TouchOscCanvas from "./TouchOscCanvas";
import { radiansToDegrees } from "../../utils/utils_canvas";
import { initAudio } from "../../utils/utils_audio";
import { speller2 } from "../../data/speller.js";
import {
	NOTES_LIST,
	SCALES_MAP,
	getScaleByNotesList,
} from "../../data/synthNotes.js";
import { groupBy } from "../../utils/utils_shared.js";
import { INote } from "../../utils/utils_notes.js";
import { C_Maj } from "../../audio/notes/notes.js";

// 9x5
// 12x10
const GRID_SIZE = 60;

// Accounts for either mouse or touch position (relative to element)
interface IRelPosition {
	x: number;
	y: number;
}

interface ICellPosition {
	cellX: number;
	cellY: number;
}

const getRadians = (x: number, y: number): number => {
	const rads = Math.atan2(y, x);
	return rads;
};

const getCellFromCoords = (position: IRelPosition): ICellPosition => {
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

const notes = groupBy("label", NOTES_LIST);
const objKeys = Object.keys(notes);

const getNoteFromCellPosition = (cellPos: ICellPosition): number => {
	const { cellX, cellY } = cellPos;
	const key: string = objKeys?.[cellX - 1];
	const noteArray: INote[] = notes?.[key as keyof object];
	const note: INote = noteArray?.[cellY - 1];
	const freq = note?.freq;
	return freq;
};

const major_c = SCALES_MAP.Major.C as string[];
const scale1 = getScaleByNotesList(major_c, {
	baseOctave: 3,
});

const TouchOsc = () => {
	// synth states
	const isDragging = useRef<boolean>(false);
	const canvasCtx = useRef<CanvasRenderingContext2D>();
	const padRef = useRef<HTMLDivElement | HTMLCanvasElement>(null);
	// mouse/touch position
	const position = useRelativeMousePosition(padRef);
	const touchPos = useRelativeTouchPosition(padRef);
	const cellPosition = useMemo<ICellPosition>(() => {
		if (position.elementX < 0 || position.elementY < 0) {
			return {
				cellX: 0,
				cellY: 0,
			};
		}

		return getCellFromCoords({
			x: position.elementX,
			y: position.elementY,
		});
	}, [position]);
	const rads = getRadians(position.elementX, position.elementY) * 1000;
	const currentFreq = useMemo(() => {
		const newFreq = getNoteFromCellPosition(cellPosition);
		return newFreq;
	}, [cellPosition]);
	// update osc's frequency on mousemove/drag
	const updateFreq = useCallback(() => {
		if (!isDragging.current) return;
		const newFreq = getNoteFromCellPosition(cellPosition);
		console.log("newFreq", newFreq);

		// return is we're still on the same note
		// if (currentFreq === newFreq) return;
		osc.frequency.value = newFreq;
	}, [cellPosition]);

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
		<div className={styles.TouchOsc}>
			<div>
				Frequency: <b>{currentFreq}</b>
			</div>
			<div className={styles.TouchOsc_controls}>
				<TouchOscControls>
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
				</TouchOscControls>
			</div>
			<div className={styles.TouchOsc_pad}>
				{/* <Cursor x={position.elementX} y={position.elementY} /> */}
				{/* DIV VERSION */}
				{/* <TouchPad
					padRef={padRef}
					handleMouseDown={mouseDown}
					handleMouseUp={mouseUp}
					handleTouchStart={touchStart}
					handleTouchEnd={touchEnd}
				/> */}
				{/* CANVAS VERSION */}
				<TouchOscCanvas
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
			<div className={styles.TouchOsc_controls}>
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default TouchOsc;
