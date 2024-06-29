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
	handleSynthFX: () => void;
	handleDelayFX: () => void;
	handleReverbFX: () => void;
	handleEnvelopeFX: () => void;
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
	handleSynthFX,
	handleDelayFX,
	handleReverbFX,
	handleEnvelopeFX,
}: Props) => {
	return (
		<div data-name="effects-panel" className={styles.SynthyEffects}>
			<EffectColumn label="VCO">
				<WaveformKnob
					key="VCO"
					size="SM"
					label="Waveform"
					onChange={handleSynthFX}
				/>
				<Knob
					label="Gain"
					key="Gain"
					name="gain"
					size={size}
					onChange={handleSynthFX}
				/>
			</EffectColumn>
			{/* ADSR ENVELOPE  */}
			<EffectBlock label="Envelope">
				<Knob
					label="Attack"
					key="Attack"
					name="attack"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Decay"
					key="Decay"
					name="decay"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Sustain"
					key="Sustain"
					name="sustain"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Release"
					key="Release"
					name="release"
					size={size}
					onChange={handleSynthFX}
				/>
			</EffectBlock>

			{/* FILTER (LPF/HPF) */}
			<EffectBlock label="Filter">
				<EffectDropdown
					label="Filter"
					name="filterType"
					options={waveOptions}
					onChange={handleWave}
				/>
				<Knob
					key="Freq."
					label="Freq."
					name="freq"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					key="Semitones"
					label="Semi."
					name="semitones"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleSynthFX}
				/>
			</EffectBlock>

			{/* DELAY  */}
			<EffectBlock label="Delay">
				<Knob
					key="Time."
					label="Time."
					name="time"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleSynthFX}
				/>
			</EffectBlock>

			{/* REVERB */}
			<EffectBlock label="Reverb">
				<WaveformKnob key="VCO" label="IR Type" onChange={handleSynthFX} />
				<Knob
					key="Time."
					label="Time."
					name="time"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					onChange={handleSynthFX}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					onChange={handleSynthFX}
				/>
			</EffectBlock>
			{/* MASTER VOLUME */}
			<MasterVolume />
		</div>
	);
};

export default SynthyEffects;
