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
		<div className={styles.EffectBlock}>
			<div className={styles.EffectBlock_label}>{label}</div>
			<div className={styles.EffectBlock_main}>{children}</div>
		</div>
	);
};

export default EffectBlock;
