import { Effect, ISettings } from "./Effect";

export interface IEnvelopeSettings extends ISettings {
	attack: number;
	decay?: number;
	sustain?: number;
	release?: number;
	multiplier?: number;
}

class Envelope extends Effect {
	// Scale multiplier (eg. currentTime * timeScale)
	private _multiplier: number;
	private _volume!: number;
	// ADSR settings
	private _attack: number;
	private _decay: number;
	private _sustain: number;
	private _release: number;

	constructor(audioCtx: AudioContext, settings: IEnvelopeSettings) {
		super(audioCtx);

		// Effect settings
		this._volume = settings.volume ?? 0.7;
		this._multiplier = settings.multiplier ?? 2.0;
		// Envelope settings
		this._attack = settings.attack ?? 0.8;
		this._decay = settings.decay ?? 0.0;
		this._sustain = settings.sustain ?? 0.0;
		this._release = settings.release ?? 0.0;
	}

	public get multiplier(): number {
		return this._multiplier;
	}
	public set multiplier(scale: number | string) {
		const num = Number(scale);
		this._multiplier = num;
	}
	public get volume(): number {
		return this._volume;
	}
	public set volume(vol: number | string) {
		const num = Number(vol);
		this._volume = num;
		const gainNode = this.nodes.gainNode as GainNode;
		gainNode.gain.value = num;
	}
	public get attack(): number {
		return this._attack;
	}
	public set attack(value: number | string) {
		const val = Number(value);
		this._attack = val;
		const gainNode = this.nodes.gainNode as GainNode;
		gainNode.gain.value = val * this._multiplier;
		this.applyADSR();
	}
	public get decay(): number {
		return this._decay;
	}
	public set decay(value: number | string) {
		const val = Number(value);
		this._decay = val;
	}
	public get sustain(): number {
		return this._sustain;
	}
	public set sustain(value: number | string) {
		const val = Number(value);
		this._sustain = val;
	}
	public get release(): number {
		return this._release;
	}
	public set release(value: number | string) {
		const val = Number(value);
		this._release = val;
	}
	public applyADSR() {
		// eg (.8 * 2)
		const vol: number = this._volume;
		const currentTime: number = this.audioCtx.currentTime;
		const gainNode = this.nodes.gainNode as GainNode;
		// ADSR settings
		const attack: number = this._attack * this._multiplier;
		// const decay: number = this._decay;
		// const sustain: number = this._sustain;
		// const release: number = this._release;
		// apply settings
		console.log("attack", attack);
		gainNode.gain.setValueAtTime(0, currentTime);
		gainNode.gain.linearRampToValueAtTime(vol, currentTime + attack);
		// gainNode.gain.setTargetAtTime(sustain * vol, currentTime + attack, decay);
	}
}

export { Envelope };
