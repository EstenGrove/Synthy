import React, { ReactNode } from "react";
import styles from "../../css/synth-panel/SynthyKeysPanel.module.scss";

type Props = {
	children?: ReactNode;
};

const SidePanel = () => {
	return (
		<div className={styles.SidePanel}>
			<div>Side</div>
		</div>
	);
};

const SynthyKeysPanel = ({ children }: Props) => {
	return (
		<div data-name="keys-panel" className={styles.SynthyKeysPanel}>
			<div className={styles.SynthyKeysPanel_inner}>{children}</div>
			<SidePanel />
		</div>
	);
};

export default SynthyKeysPanel;
