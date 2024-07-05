import { ReactNode } from "react";
import styles from "../../css/synth-panel/SynthyKeysPanel.module.scss";

type Props = {
	children?: ReactNode;
};

type SideProps = {
	children?: ReactNode;
};
// ##TODOS:
// - Add <PeakMeter/> OR <Oscilloscope/>
const SidePanel = ({ children }: SideProps) => {
	return (
		<div className={styles.SidePanel}>
			{children}
			{/*  */}
			{/*  */}
		</div>
	);
};

const SynthyKeysPanel = ({ children }: Props) => {
	return (
		<div data-name="keys-panel" className={styles.SynthyKeysPanel}>
			<div className={styles.SynthyKeysPanel_inner}>{children}</div>
			<SidePanel>
				{/*  */}
				{/*  */}
			</SidePanel>
		</div>
	);
};

export default SynthyKeysPanel;
