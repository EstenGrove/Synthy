import { Effect, ISettings } from "./Effect";

class Distortion extends Effect {
	private _level: number;
	constructor(audioCtx: AudioContext, settings: ISettings) {
		super(audioCtx, settings);

		this._level = settings?.level ?? 0.5;

		this.nodes = {
			pre: this.audioCtx.createGain() as GainNode,
			post: this.audioCtx.createGain() as GainNode,
			waveshaper: this.audioCtx.createWaveShaper() as WaveShaperNode,
		};

		const waveshaper = this.nodes.waveshaper as WaveShaperNode;
		const pre = this.nodes.pre as GainNode;
		const post = this.nodes.post as GainNode;

		pre.gain.value = this._level;
		post.gain.value = this._level;
		waveshaper.curve = this._createDistCurve(this._level * 10);

		pre.connect(waveshaper);
		post.connect(waveshaper);
	}

	// Adapted from: https://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
	// Tranfergraph for testing: https://kevincennis.github.io/transfergraph/
	private _createDistCurve(level: number = 50): Float32Array {
		const DEG = Math.PI / 180;
		const samples = 44100;
		const curve = new Float32Array(samples);
		curve.forEach((_, i: number) => {
			const x = (i * 2) / samples - 1;
			curve[i] = ((3 + level) * x * 20 * DEG) / (Math.PI + level * Math.abs(x));
		});

		return curve;
	}
}

export { Distortion };
