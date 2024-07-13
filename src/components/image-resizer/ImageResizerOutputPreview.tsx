import React, { RefObject, useRef } from "react";
import styles from "../../css/image-resizer/ImageResizerOutputPreview.module.scss";
import { drawImageToCanvas } from "../../utils/utils_resizer";

type Props = {
	width?: number;
	height?: number;
	canvasRef: RefObject<HTMLCanvasElement>;
};
type CanvasProps = {
	width: number;
	height: number;
	imgSrc?: string;
	canvasRef: RefObject<HTMLCanvasElement>;
};

const Canvas = ({
	width = 700,
	height = 500,
	imgSrc,
	canvasRef,
}: CanvasProps) => {
	return (
		<canvas
			ref={canvasRef}
			className={styles.Canvas}
			width={width}
			height={height}
		></canvas>
	);
};

const ImageResizerOutputPreview = ({
	width = 700,
	height = 500,
	canvasRef,
}: Props) => {
	return (
		<div className={styles.ImageResizerOutputPreview}>
			<Canvas width={width} height={height} canvasRef={canvasRef} />
		</div>
	);
};

export default ImageResizerOutputPreview;
