import { IBitCrusherSettings } from "../effects/BitCrusher";
import { Delay, IDelaySettings } from "../effects/Delay";
import { Distortion, IDistortionSettings } from "../effects/Distortion";
import { Envelope, IEnvelopeSettings } from "../effects/Envelope";
import { Filter, IFilterSettings } from "../effects/Filter";
import { IReverbSettings, Reverb } from "../effects/Reverb";
import { WaveTable } from "../wavetables/wavetables";
// import { IInstrumentPreset } from "../presets/instrumentPresets";
import { Effect } from "../effects/Effect";
import { TAudioNode } from "./nodes";

export type IEffectInput =
	| AudioNode
	| OscillatorNode
	| GainNode
	| MediaStreamAudioSourceNode;
export type IEffectOutput =
	| AudioNode
	| OscillatorNode
	| GainNode
	| MediaStreamAudioSourceNode;

export interface ReverbSettings extends IReverbSettings {}
export interface ADSRSettings extends IEnvelopeSettings {}
export interface DelaySettings extends IDelaySettings {}
export interface DistortionSettings extends IDistortionSettings {}
export interface FilterSettings extends IFilterSettings {}
export interface BitCrusherSettings extends IBitCrusherSettings {}

export interface InstrumentPreset {
	name: string;
	waveTable: WaveTable;
}

export interface PresetSettings {
	instrument: InstrumentPreset;
	effects: {
		adsr?: ADSRSettings;
		delay?: DelaySettings;
		reverb?: ReverbSettings;
		filter?: FilterSettings;
		distortion?: DistortionSettings;
		bitCrusher?: BitCrusherSettings;
	};
}

export type LocalNode = InstanceType<typeof Effect> | TAudioNode;

export interface LocalNodes {
	[key: string]: LocalNode;
}

// REQUIREMENTS:
// - Implement the various AudioNodes for each effect & instrument & their related connections
// - This should abstract the complexity of applying, modifying & switching between various audio FX

class Preset {
	private _audioCtx: AudioContext;
	private _name: string;
	// instrument (name & wave-table)
	private _instrument: InstrumentPreset;
	// effects (by type/name)
	private _reverb: ReverbSettings;
	private _delay: DelaySettings;
	private _adsr: ADSRSettings;
	private _filter: FilterSettings;
	private _distortion: DistortionSettings;

	// All effect-related nodes
	public nodes: LocalNodes = {};
	// Our main output gain node, where all other nodes are connected to it
	public node!: TAudioNode;

	constructor(audioCtx: AudioContext, presetSettings: PresetSettings) {
		this._audioCtx = audioCtx;

		const { instrument, effects } = presetSettings;
		// Preset name: 'organ', 'fuzzBass' etc
		this._name = instrument.name;
		this._instrument = instrument;
		// effects
		this._adsr = effects?.adsr as ADSRSettings;
		this._delay = effects?.delay as DelaySettings;
		this._reverb = effects?.reverb as ReverbSettings;
		this._filter = effects?.filter as FilterSettings;
		this._distortion = effects?.distortion as DistortionSettings;

		// Main output node
		this.node = this._audioCtx.createGain() as GainNode;

		// FX nodes
		this.nodes = {
			adsr: new Envelope(audioCtx, {
				attack: this._adsr.attack,
				decay: this._adsr.decay,
				sustain: this._adsr.sustain,
				release: this._adsr.release,
			}),
			delay: new Delay(audioCtx, {
				delayTime: this._delay.delayTime,
				feedback: this._delay.feedback,
			}),
			reverb: new Reverb(audioCtx, {
				time: this._reverb.time,
				src: this._reverb.src,
				wet: this._reverb.wet,
				dry: this._reverb.dry,
			}),
			filter: new Filter(audioCtx, {
				freq: this._filter.freq,
				type: this._filter.type,
				gain: this._filter.gain,
				q: this._filter.q,
			}),
			distortion: new Distortion(audioCtx, {
				freq: this._distortion.level,
				type: this._distortion.oversamples,
			}),
		};
	}
}

export { Preset };
