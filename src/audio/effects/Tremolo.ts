import { Effect, ISettings } from "./Effect";

export interface TremoloSettings extends ISettings {
	depth?: number;
	freq?: number;
	spread?: number;
	speed?: number;
	waveType?: OscillatorType;
}

class Tremolo extends Effect {
	private _depth: number;
	private _freq: number;
	private _spread: number;
	private _speed?: number;
	private _waveType: OscillatorType;

	constructor(audioCtx: AudioContext, settings: ISettings) {
		super(audioCtx, settings);

		// apply settings
		this._depth = settings?.depth ?? 0.5;
		this._freq = settings?.freq ?? 440;
		this._speed = settings?.speed ?? 20;
		this._spread = settings?.spread ?? 0.5;
		this._waveType = settings?.waveType ?? "sine";
		this.level = settings?.level ?? 0.5;

		this.nodes = {
			lfo: new OscillatorNode(this.audioCtx, {
				frequency: this._freq,
				type: this._waveType,
			}),
			gain: new GainNode(this.audioCtx, {
				gain: 0.5,
			}),
		};

		// this.node = new OscillatorNode()
	}
}

export { Tremolo };
