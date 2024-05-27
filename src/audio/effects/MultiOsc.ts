import { LocalNodes } from "../nodes/nodes";
import { ISettings, TLevel } from "./Effect";

class MultiOsc {
	private _node: GainNode;
	private _audioCtx: AudioContext;
	// Settings, config
	private _level: number;
	private _oscCount!: number;
	private _freq: number;

	public nodes: LocalNodes = {};

	constructor(audioCtx: AudioContext, settings: ISettings) {
		this._audioCtx = audioCtx;
		this._level = (settings?.level ?? 0.5) as TLevel;
		this._oscCount = (settings?.oscCount ?? 1) as number;
		this._freq = (settings?.freq ?? 440.0) as number;

		this.nodes = {
			osc1: new OscillatorNode(this._audioCtx, {
				frequency: this._freq,
			}) as OscillatorNode,
			osc2: new OscillatorNode(this._audioCtx, {
				frequency: this._freq,
			}) as OscillatorNode,
		};

		// Set main effect out node
		this._node = this._audioCtx.createGain() as GainNode;

		const main = this._node as GainNode;
		main.gain.value = this._level;

		// Connect nodes
	}

	// Play all oscillators at once
	public start() {
		if (Object.keys(this.nodes)?.length > 0) {
			Object.keys((key: string) => {
				const currentOsc = this.nodes[key] as OscillatorNode;
				currentOsc.start();
			});
		}
	}
	// Stop all oscillators at once
	public stop() {
		if (Object.keys(this.nodes)?.length > 0) {
			Object.keys((key: string) => {
				const currentOsc = this.nodes[key] as OscillatorNode;
				currentOsc.stop(this._audioCtx.currentTime + 0.015);
			});
		}
	}

	public transpose(freq: number, steps: number): number {
		const stepped = freq * Math.pow(2, steps / 12);
		return stepped;
	}
}

export { MultiOsc };
