import React from "react";
import styles from "../../css/synth-panel/SynthyEffects.module.scss";
import EffectColumn from "../synth/EffectColumn";
import EffectBlock from "../synth/EffectBlock";
import Knob from "../controls/Knob";
import WaveformKnob from "../synth/WaveformKnob";
import MasterVolume from "../controls/MasterVolume";
import EffectDropdown, { IDropdownOption } from "../controls/EffectDropdown";
import LPFWave from "../shapes/LPFWave";
import HPFWave from "../shapes/HPFWave";
import NotchWave from "../shapes/NotchWave";
import BandPassWave from "../shapes/BandPassWave";

type Props = {
	delayVals: object;
	reverbVals: object;
	filterVals: object;
	envelopeVals: object;
	handleWave: () => void;
	handleVCO: (name: string, value: string | number) => void;
	handleADSR: (name: string, value: string | number) => void;
	handleFilter: (name: string, value: string | number) => void;
	handleDelay: (name: string, value: number) => void;
	handleReverb: (name: string, value: string | number) => void;
	handleMasterVol: (name: string, value: number) => void;
};

const size = "XSM";

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

const SynthyEffects = ({
	delayVals,
	reverbVals,
	filterVals,
	envelopeVals,
	handleWave,
	handleVCO,
	handleADSR,
	handleFilter,
	handleMasterVol,
	handleDelay,
	handleReverb,
}: Props) => {
	return (
		<div data-name="effects-panel" className={styles.SynthyEffects}>
			{/* VCO CONTROLS */}
			<EffectColumn label="VCO">
				<WaveformKnob
					key="VCO"
					size="SM"
					name="waveType"
					label="Waveform"
					onChange={handleVCO} // string
				/>
				<Knob
					label="Gain"
					key="Gain"
					name="gain"
					size={size}
					onChange={handleVCO} // number
				/>
			</EffectColumn>
			{/* ADSR ENVELOPE  */}
			<EffectBlock label="Envelope">
				<Knob
					label="Attack"
					key="Attack"
					name="attack"
					size={size}
					onChange={handleADSR}
				/>
				<Knob
					label="Decay"
					key="Decay"
					name="decay"
					size={size}
					onChange={handleADSR}
				/>
				<Knob
					label="Sustain"
					key="Sustain"
					name="sustain"
					size={size}
					onChange={handleADSR}
				/>
				<Knob
					label="Release"
					key="Release"
					name="release"
					size={size}
					onChange={handleADSR}
				/>
			</EffectBlock>

			{/* FILTER (LPF/HPF) */}
			<EffectBlock label="Filter">
				<EffectDropdown
					label="Filter"
					name="filterType"
					options={waveOptions}
					onChange={handleFilter}
				/>
				<Knob
					key="Freq."
					label="Freq."
					name="freq"
					size={size}
					onChange={handleFilter}
				/>
				<Knob
					key="Semitones"
					label="Semi."
					name="semitones"
					size={size}
					onChange={handleFilter}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleFilter}
				/>
			</EffectBlock>

			{/* DELAY  */}
			<EffectBlock label="Delay">
				<Knob
					key="Time."
					label="Time."
					name="time"
					size={size}
					onChange={handleDelay}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					onChange={handleDelay}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleDelay}
				/>
			</EffectBlock>

			{/* REVERB */}
			<EffectBlock label="Reverb">
				<WaveformKnob
					key="VCO"
					label="IR Type"
					name="reverbWave"
					onChange={handleReverb}
				/>
				<Knob
					key="Time."
					label="Time."
					name="time"
					size={size}
					onChange={handleReverb}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					onChange={handleReverb}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleReverb}
				/>
			</EffectBlock>
			{/* MASTER VOLUME */}
			<MasterVolume handleMasterVol={handleMasterVol} />
		</div>
	);
};

export default SynthyEffects;
