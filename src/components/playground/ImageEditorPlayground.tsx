import React, { useState } from "react";
import styles from "../../css/playground/ImageEditorPlayground.module.scss";
import ImageResizer from "../image-resizer/ImageResizer";
import ImageConverter from "../image-resizer/ImageConverter";
import CustomSelect from "../shared/CustomSelect";

const ImageEditorPlayground = () => {
	return (
		<div className={styles.ImageEditorPlayground}>
			<h1>Image Editor</h1>
			<div className={styles.ImageEditorPlayground_main}>
				<ImageConverter width="100%" height="90rem" />
			</div>
		</div>
	);
};

export default ImageEditorPlayground;
