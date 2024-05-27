import React, { ReactNode } from "react";
import styles from "../../css/controls/ControlsRow.module.scss";

type Props = { children?: ReactNode };

const ControlsRow = ({ children }: Props) => {
	return (
		<div className={styles.ControlsRow}>
			<div className={styles.ControlsRow_inner}>{children}</div>
		</div>
	);
};

export default ControlsRow;
