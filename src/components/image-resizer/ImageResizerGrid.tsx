import { ReactNode, RefObject } from "react";
import styles from "../../css/image-resizer/ImageResizerGrid.module.scss";

type Props = {
	children?: ReactNode;
	gridRef: RefObject<HTMLDivElement>;
};

const ImageResizerGrid = ({ children, gridRef, ...rest }: Props) => {
	return (
		<div className={styles.ImageResizerGrid} {...rest} ref={gridRef}>
			<div className={styles.ImageResizerGrid_inner}>{children}</div>
		</div>
	);
};

export default ImageResizerGrid;
