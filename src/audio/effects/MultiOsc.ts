import { LocalNodes } from "../nodes/nodes";
import { ISettings } from "./Effect";

export interface OscSettings extends ISettings {
	freq?: number;
	steps?: number;
}
class MultiOsc {
	private _audioCtx: AudioContext;
	// Settings, config
	private _level: number;
	private _freq: number;
	private _steps: number;

	public node: GainNode;
	public nodes: LocalNodes = {};

	constructor(audioCtx: AudioContext, settings: ISettings) {
		this._audioCtx = audioCtx;
		this._level = (settings?.level ?? 0.5) as number;
		this._freq = (settings?.freq ?? 440.0) as number;
		this._steps = settings?.steps ?? (12 as number);

		this.nodes = {
			osc1: new OscillatorNode(this._audioCtx, {
				frequency: this._freq,
			}) as OscillatorNode,
			osc2: new OscillatorNode(this._audioCtx, {
				frequency: this._transpose(this._freq, 12),
			}) as OscillatorNode,
		};

		// Set main effect out node
		this.node = this._audioCtx.createGain() as GainNode;

		const main = this.node as GainNode;
		const osc1 = this.nodes.osc1 as OscillatorNode;
		const osc2 = this.nodes.osc2 as OscillatorNode;

		osc1.connect(main);
		osc2.connect(main);

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

	private _transpose(freq: number, steps: number): number {
		const stepped = freq * Math.pow(2, steps / 12);
		return stepped;
	}
}

export { MultiOsc };
