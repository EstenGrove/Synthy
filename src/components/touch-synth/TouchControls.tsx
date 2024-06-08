import React, { ReactNode } from "react";
import styles from "../../css/touch-synth/TouchControls.module.scss";

type Props = {
	children: ReactNode;
};

const TouchControls = ({ children }: Props) => {
	return (
		<div className={styles.TouchControls}>
			{children}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default TouchControls;
