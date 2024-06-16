import React, { ReactNode } from "react";
import styles from "../../css/synth/EffectRow.module.scss";

type Props = {
	label: string;
	children: ReactNode;
};

const EffectRow = ({ label, children }: Props) => {
	return (
		<div className={styles.EffectRow}>
			<div className={styles.EffectRow_label}>{label}</div>
			<div className={styles.EffectRow_inner}>{children}</div>
		</div>
	);
};

export default EffectRow;
