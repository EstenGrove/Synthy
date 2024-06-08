import { RefObject, UIEvent, MouseEvent } from "react";
import styles from "../../css/canvas/Canvas.module.scss";

type Props = {
	canvasRef: RefObject<HTMLCanvasElement>;
	width: number;
	height: number;
	handleMouseDown: (e: MouseEvent<HTMLCanvasElement>) => void;
	handleMouseUp: (e: MouseEvent<HTMLCanvasElement>) => void;
	handleTouchStart: (e: UIEvent<HTMLCanvasElement>) => void;
	handleTouchEnd: (e: UIEvent<HTMLCanvasElement>) => void;
};

const Canvas = ({
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
	return (
		<div className={styles.Canvas}>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				className={styles.Canvas_canvas}
			></canvas>
		</div>
	);
};

export default Canvas;
