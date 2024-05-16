import React, { ReactNode } from "react";
import styles from "../../css/controls/MasterPanel.module.scss";
import Fader from "./Fader";

type Props = {
	children?: ReactNode;
};

const MasterPanel = ({ children }: Props) => {
	return (
		<div className={styles.MasterPanel}>
			<div className={styles.MasterPanel_inner}>{children}</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default MasterPanel;
