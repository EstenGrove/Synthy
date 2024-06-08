import { RefObject, UIEvent, MouseEvent, useEffect } from "react";
import styles from "../../css/touch-synth/TouchCanvas.module.scss";

type Props = {
	canvasCtx: RefObject<CanvasRenderingContext2D>;
	canvasRef: RefObject<HTMLCanvasElement>;
	width: number;
	height: number;
	handleMouseDown: (e: MouseEvent<HTMLCanvasElement>) => void;
	handleMouseUp: (e: MouseEvent<HTMLCanvasElement>) => void;
	handleTouchStart: (e: UIEvent<HTMLCanvasElement>) => void;
	handleTouchEnd: (e: UIEvent<HTMLCanvasElement>) => void;
};

interface CanvasDimensions {
	width: number;
	height: number;
}

const drawGrid = (
	ctx: CanvasRenderingContext2D,
	dimensions: CanvasDimensions
) => {
	const { width, height } = dimensions;
	const offsetWidth = width - 2;
	const offsetHeight = height - 2;
	const gridSize = { x: 10, y: 10 };
	const divisorX = offsetWidth / gridSize.x;
	const divisorY = offsetHeight / gridSize.y;

	for (let x = 1; x < width; x += divisorX) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, width);
	}

	for (let y = 1; y < height; y += divisorY) {
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
	}
	ctx.strokeStyle = "rgba(180, 140, 255, .1)";
	ctx.stroke();
};

const TouchCanvas = ({
	canvasCtx,
	canvasRef,
	width = 600,
	height = 600,
	// mouse events
	handleMouseDown,
	handleMouseUp,
	// touch events
	handleTouchStart,
	handleTouchEnd,
}: Props) => {
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (canvasRef.current && canvasCtx.current) {
			const ctx = canvasCtx.current as CanvasRenderingContext2D;
			const dims = { width, height };
			drawGrid(ctx, dims);
		}
		return () => {
			isMounted = false;
		};
	}, [canvasCtx, canvasRef, height, width]);
	return (
		<div className={styles.TouchCanvas}>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				className={styles.TouchCanvas_canvas}
			></canvas>
		</div>
	);
};

export default TouchCanvas;
