import { RefObject } from "react";
import styles from "../../css/image-resizer/ImageCanvasPreview.module.scss";
import Canvas from "../canvas/Canvas";

type Props = {
	src?: string;
	width?: number | string;
	height?: number | string;
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
			<Canvas width={width} height={height} canvasRef={previewRef} />
		</div>
	);
};

export default ImageCanvasPreview;
