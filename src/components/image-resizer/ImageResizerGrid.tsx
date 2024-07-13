import { ReactNode } from "react";
import styles from "../../css/image-resizer/ImageResizerGrid.module.scss";

type Props = { children?: ReactNode };

const ImageResizerGrid = ({ children }: Props) => {
	return (
		<div className={styles.ImageResizerGrid}>
			<div className={styles.ImageResizerGrid_inner}>{children}</div>
		</div>
	);
};

export default ImageResizerGrid;
