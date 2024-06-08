import React, { ReactNode } from "react";
import styles from "../../css/touch-osc/TouchOscControls.module.scss";

type Props = {
	children: ReactNode;
};

const TouchOscControls = ({ children }: Props) => {
	return (
		<div className={styles.TouchOscControls}>
			{children}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default TouchOscControls;
