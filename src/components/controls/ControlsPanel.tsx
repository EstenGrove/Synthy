import React, { ReactNode } from "react";
import styles from "../../css/controls/ControlsPanel.module.scss";

type Props = {
	title?: string;
	children?: ReactNode;
};

const ControlsPanel = ({ title, children }: Props) => {
	return (
		<div className={styles.ControlsPanel}>
			<div className={styles.ControlsPanel_top}>
				<h4 className={styles.ControlsPanel_top_title}>{title}</h4>
			</div>
			<div className={styles.ControlsPanel_main}>{children}</div>
		</div>
	);
};

export default ControlsPanel;
