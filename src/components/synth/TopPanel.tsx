import React, { ReactNode } from "react";
import styles from "../../css/synth/TopPanel.module.scss";

type Props = {
	children?: ReactNode;
};

const TopPanel = ({ children }: Props) => {
	return (
		<div className={styles.TopPanel}>
			<div className={styles.TopPanel_inner}>{children}</div>
		</div>
	);
};

export default TopPanel;
