import { RefObject, useCallback, useEffect } from "react";
import styles from "../../css/image-resizer/ImageCanvasPreview.module.scss";
import Canvas from "../canvas/Canvas";

type Props = {
	src: string;
	width?: number;
	height?: number;
	previewRef: RefObject<HTMLCanvasElement>;
};
//k

const ImageCanvasPreview = ({
	previewRef,
	width = 500,
	height = 500,
}: Props) => {
	return (
		<div className={styles.ImageCanvasPreview}>
			<canvas
				ref={previewRef}
				width={width}
				height={height}
				className={styles.ImageCanvasPreview_canvas}
			></canvas>
			{/* <Canvas width={width} height={height} canvasRef={previewRef} /> */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ImageCanvasPreview;
