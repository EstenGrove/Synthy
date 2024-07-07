import styles from "../../css/controls/MasterVolume.module.scss";
import Knob from "./Knob";

type Props = {
	value: number;
	handleMasterVol: (name: string, vol: number) => void;
};

const MasterVolume = ({ value, handleMasterVol }: Props) => {
	return (
		<fieldset className={styles.MasterVolume}>
			<legend>Master</legend>
			<div className={styles.MasterVolume_main}>
				<Knob
					key="MasterVolume"
					label="Volume"
					name="masterVolume"
					size="MD"
					value={value}
					onChange={handleMasterVol}
					enableArc={true}
				/>
			</div>
		</fieldset>
	);
};

export default MasterVolume;
