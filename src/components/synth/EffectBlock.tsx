import { ReactNode } from "react";
import styles from "../../css/synth/EffectBlock.module.scss";

type Props = {
	label: string;
	rows?: number;
	cols?: number;
	children?: ReactNode;
};

const EffectBlock = ({ label, children }: Props) => {
	return (
		<fieldset className={styles.EffectBlock}>
			<legend>{label}</legend>
			{/* <div className={styles.EffectBlock_label}>{label}</div> */}
			<div className={styles.EffectBlock_main}>{children}</div>
		</fieldset>
	);
};

export default EffectBlock;
