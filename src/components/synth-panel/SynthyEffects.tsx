import styles from "../../css/synth-panel/SynthyEffects.module.scss";
import {
	ADSRSettings,
	DelaySettings,
	FilterSettings,
	ReverbSettings,
	VCOSettings,
} from "./types";
import Knob from "../controls/Knob";
import LPFWave from "../shapes/LPFWave";
import HPFWave from "../shapes/HPFWave";
import NotchWave from "../shapes/NotchWave";
import BandPassWave from "../shapes/BandPassWave";
import EffectBlock from "../synth/EffectBlock";
import EffectColumn from "../synth/EffectColumn";
import WaveformKnob from "../synth/WaveformKnob";
import MasterVolume from "../controls/MasterVolume";
import EffectDropdown, { IDropdownOption } from "../controls/EffectDropdown";
import EchoReverbWave from "../shapes/EchoReverbWave";
import DarkReverbWave from "../shapes/DarkReverbWave";
import CathedralReverbWave from "../shapes/CathedralReverbWave";
import RoomReverbWave from "../shapes/RoomReverbWave";

type Props = {
	vcoVals: VCOSettings;
	adsrVals: ADSRSettings;
	filterVals: FilterSettings;
	delayVals: DelaySettings;
	reverbVals: ReverbSettings;
	handleDelay: (name: string, value: number) => void;
	handleVCO: (name: string, value: string | number) => void;
	handleADSR: (name: string, value: string | number) => void;
	handleFilter: (name: string, value: string | number) => void;
	handleReverb: (name: string, value: string | number) => void;
	handleMasterVol: (name: string, value: number) => void;
};

const size = "XSM";

// Filter wave types
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
// Reverb wave types
const reverbOptions: IDropdownOption[] = [
	{
		value: "Echo",
		element: EchoReverbWave,
	},
	{
		value: "Dark",
		element: DarkReverbWave,
	},
	{
		value: "Cathedral",
		element: CathedralReverbWave,
	},
	{
		value: "Room",
		element: RoomReverbWave,
	},
];

const SynthyEffects = ({
	// grouped states
	vcoVals,
	adsrVals,
	delayVals,
	reverbVals,
	filterVals,
	// handlers
	handleVCO,
	handleADSR,
	handleFilter,
	handleDelay,
	handleReverb,
	handleMasterVol,
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
					value={vcoVals.waveType}
					onChange={handleVCO} // string
				/>
				<Knob
					label="Gain"
					key="Gain"
					name="gain"
					size={size}
					value={vcoVals?.gain}
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
					value={adsrVals?.attack}
					onChange={handleADSR}
				/>
				<Knob
					label="Decay"
					key="Decay"
					name="decay"
					size={size}
					value={adsrVals?.decay}
					onChange={handleADSR}
				/>
				<Knob
					label="Sustain"
					key="Sustain"
					name="sustain"
					size={size}
					value={adsrVals?.sustain}
					onChange={handleADSR}
				/>
				<Knob
					label="Release"
					key="Release"
					name="release"
					size={size}
					value={adsrVals?.release}
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
					value={filterVals?.freq}
					onChange={handleFilter}
				/>
				<Knob
					key="Semitones"
					label="Semi."
					name="semitones"
					size={size}
					value={filterVals?.semitones}
					onChange={handleFilter}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					value={filterVals?.level}
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
					value={delayVals?.time}
					onChange={handleDelay}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					value={delayVals?.feedback}
					onChange={handleDelay}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					value={delayVals?.level}
					onChange={handleDelay}
				/>
			</EffectBlock>

			{/* REVERB */}
			<EffectBlock label="Reverb">
				<EffectDropdown
					key="ReverbWave"
					label="IR Type"
					name="reverbWave"
					options={reverbOptions}
					onChange={handleReverb}
				/>

				<Knob
					key="Time."
					label="Time."
					name="time"
					size={size}
					value={reverbVals?.time}
					onChange={handleReverb}
				/>
				<Knob
					key="Feedback"
					label="Feedback"
					name="feedback"
					size={size}
					value={reverbVals?.feedback}
					onChange={handleReverb}
				/>
				<Knob
					label="Level"
					key="Level"
					name="level"
					size={size}
					value={reverbVals?.level}
					onChange={handleReverb}
				/>
			</EffectBlock>
			{/* MASTER VOLUME */}
			<MasterVolume handleMasterVol={handleMasterVol} />
		</div>
	);
};

export default SynthyEffects;
