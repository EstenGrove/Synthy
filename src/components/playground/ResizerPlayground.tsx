import styles from "../../css/playground/ResizerPlayground.module.scss";
import ImageResizer from "../image-resizer/ImageResizer";

const ResizerPlayground = () => {
	return (
		<div className={styles.ResizerPlayground}>
			<h1>Image Resizer</h1>
			<main className={styles.ResizerPlayground_main}>
				<ImageResizer />
			</main>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ResizerPlayground;
