import styles from "../../css/controls/MasterVolume.module.scss";
import Knob from "./Knob";

type Props = {
	handleMasterVol: (name: string, vol: number) => void;
};

const MasterVolume = ({ handleMasterVol }: Props) => {
	return (
		<fieldset className={styles.MasterVolume}>
			<legend>Master</legend>
			<div className={styles.MasterVolume_main}>
				<Knob
					key="MasterVolume"
					label="Volume"
					name="masterVolume"
					size="MD"
					onChange={handleMasterVol}
				/>
			</div>
		</fieldset>
	);
};

export default MasterVolume;
