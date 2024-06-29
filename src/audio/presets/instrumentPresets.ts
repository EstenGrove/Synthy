// fuzzBass (358 Hz)
// - Reverb: Cathedral
// - Wet: .6

export interface ILFOPreset {
	level: number;
	type: OscillatorType;
	freq: number;
}

export interface IEnvelopePreset {
	level: number;
	attack: number;
	decay?: number;
	sustain?: number;
	release?: number;
}

// lpf, hpf, notch, bandpass
export type TFilterType = Partial<BiquadFilterType>;
export interface IFilterPreset {
	level: number;
	type: TFilterType;
	freq: number;
	q?: number;
}

export interface IDelayPreset {
	level: number;
	time: number;
	feedback: number;
}
export interface IReverbPreset {
	level: number;
	type: string; // IR sample
	time: number;
	wet?: number;
	dry?: number;
}

/**
 * Instrument Preset interface:
 * - The IInstrumentPreset contains the data for a specific instrument, w/ all included effects
 * - Interface that contains all possible fields that could be a part of the preset:
 *    - LFO, ADSR Envelope, Filter, Delay, Reverb
 */
export interface IInstrumentPreset {
	lfo?: ILFOPreset;
	envelope?: IEnvelopePreset;
	filter?: IFilterPreset;
	delay?: IDelayPreset;
	reverb?: IReverbPreset;
}
