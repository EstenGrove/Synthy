import React, { ReactNode } from "react";
import styles from "../../css/synth/EffectColumn.module.scss";

type Props = {
	id?: string;
	label: string;
	children?: ReactNode;
};

const EffectColumn = ({ id, label, children }: Props) => {
	return (
		<div className={styles.EffectColumn}>
			<label htmlFor={id} className={styles.EffectColumn_label}>
				{label}
			</label>
			{children}
		</div>
	);
};

export default EffectColumn;
