import React, { ReactNode } from "react";
import styles from "../../css/synth/EffectColumn.module.scss";

type Props = {
	label: string;
	children?: ReactNode;
};

const EffectColumn = ({ label, children }: Props) => {
	return (
		<div className={styles.EffectColumn}>
			<div className={styles.EffectColumn_label}>{label}</div>
			<div className={styles.EffectColumn_main}>{children}</div>
		</div>
	);
};

export default EffectColumn;
