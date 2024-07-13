import React, { RefObject } from "react";
import styles from "../../css/image-resizer/ImageStaticPreview.module.scss";

type Props = {
	src: string;
	width?: number;
	height?: number;
	imgRef?: RefObject<HTMLImageElement>;
};

const ImageStaticPreview = ({
	src,
	width = 500,
	height = 500,
	imgRef,
}: Props) => {
	return (
		<div className={styles.ImageStaticPreview}>
			<img
				ref={imgRef}
				src={src}
				alt="Image Preview"
				width={width}
				height={height}
				className={styles.ImageStaticPreview_img}
			/>
		</div>
	);
};

export default ImageStaticPreview;
