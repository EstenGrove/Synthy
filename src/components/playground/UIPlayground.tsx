import { useState } from "react";
import styles from "../../css/playground/UIPlayground.module.scss";
import Synthy from "../synth-panel/Synthy";
import EffectDropdown, { IDropdownOption } from "../controls/EffectDropdown";
import LPFWave from "../shapes/LPFWave";
import HPFWave from "../shapes/HPFWave";
import BandPassWave from "../shapes/BandPassWave";
import NotchWave from "../shapes/NotchWave";
import OctavesPicker from "../controls/OctavesPicker";

type Props = {};

// 'Synthy' Requirements:
//
// - Oscillator(s):
//    - VCO 1 & 2
//        - Waveform/type
//        - Gain/level
//        - Freq???
//        - Transposed steps???
// - Effects:
//    - Envelope Filter (ADSR)
//    - Filter (LPF, HPF)
//    - Reverb (Dry/Wet, IIR sample (eg. room, cathedral etc), Level)
//    - Delay (Dry/Wet, Time, Feedback, Level)
//    - Distortion (Level, Oversamples??)
//    - Master Volume

const waveOptions: IDropdownOption[] = [
	{
		value: "LPF",
		element: LPFWave,
	},
	{
		value: "HPF",
		element: HPFWave,
	},
	{
		value: "Band-Pass",
		element: BandPassWave,
	},
	{
		value: "Notch",
		element: NotchWave,
	},
];

const octaves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const UIPlayground = ({}: Props) => {
	const [selected, setSelected] = useState("");

	const handleWave = (_: string, value: string) => {
		setSelected(value);
	};

	return (
		<div className={styles.UIPlayground}>
			<h1>UI Page</h1>
			<div className={styles.UIPlayground_main}>
				<Synthy />
				{/* <OctavesPicker octaves={octaves} /> */}
				{/* <EffectDropdown
					label="Reverb"
					name="reverbWave"
					options={waveOptions}
					onChange={handleWave}
				/> */}
			</div>
		</div>
	);
};

export default UIPlayground;
