import React, { ReactNode } from "react";
import styles from "../../css/synth/EffectColumn.module.scss";

type Props = {
	label: string;
	children?: ReactNode;
};

const EffectColumn = ({ label, children }: Props) => {
	return (
		<fieldset className={styles.EffectColumn}>
			<legend>{label}</legend>
			<div className={styles.EffectColumn_main}>{children}</div>
		</fieldset>
	);
};

export default EffectColumn;
