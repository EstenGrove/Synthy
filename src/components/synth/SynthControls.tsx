import { ChangeEvent } from "react";
import styles from "../../css/synth/SynthControls.module.scss";
import RangeInput from "../shared/RangeInput";
import Select from "../shared/Select";

type Props = {
	isOn: boolean;
	volume: string;
	waveType: string;
	killAudio: () => void;
	togglePower: () => void;
	handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
	handleWaves: (e: ChangeEvent<HTMLSelectElement>) => void;
};

type PowerProps = {
	isOn: boolean;
	togglePower: () => void;
};

const waveTypes: string[] = [
	"Square",
	"Sine",
	"Triangle",
	"Sawtooth",
	"Custom",
];
const disabledWaves: string[] = ["Custom"];

const PowerButton = ({ isOn = false, togglePower }: PowerProps) => {
	return (
		<button
			data-on={isOn}
			type="button"
			onClick={togglePower}
			className={styles.PowerButton}
		>
			{isOn ? "On" : "Off"}
		</button>
	);
};

const SynthControls = ({
	volume,
	waveType,
	handleVolume,
	handleWaves,
	isOn,
	killAudio,
	togglePower,
}: Props) => {
	console.log("waveType", waveType);
	return (
		<div className={styles.SynthControls}>
			<div className={styles.SynthControls_row}>
				<button type="button" onClick={killAudio}>
					Kill Audio
				</button>
				<PowerButton isOn={isOn} togglePower={togglePower} />
			</div>

			<div className={styles.SynthControls_row}>
				<RangeInput
					key="volume"
					name="volume"
					id="volume"
					val={volume}
					min={0}
					max={1}
					step={0.01}
					label={`Gain: ${volume} dB`}
					handleChange={handleVolume}
				/>
				<Select
					name="waveType"
					id="waveType"
					label={`Waveform: ${waveType}`}
					val={waveType}
					options={waveTypes}
					disabledOptions={disabledWaves}
					handleChange={handleWaves}
				/>
			</div>
		</div>
	);
};

export default SynthControls;
