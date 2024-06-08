import { Effect, ISettings } from "./Effect";

class BitCrusher extends Effect {
	private _buffer: number = 256;
	private _bitDepth: number = 8;

	constructor(audioCtx: AudioContext, settings: ISettings) {
		super(audioCtx, settings);

		this._buffer = settings?.buffer ?? 256;
		this._bitDepth = settings?.bitDepth ?? 8;

		this.nodes = {
			dry: this.audioCtx.createGain() as GainNode,
			wet: this.audioCtx.createGain() as GainNode,
		};

		this.node = this.audioCtx.createScriptProcessor(
			this._buffer,
			1,
			1
		) as ScriptProcessorNode;

		const bitCrusher = this.node as ScriptProcessorNode;
		const wetNode = this.nodes.wet as GainNode;
		const dryNode = this.nodes.dry as GainNode;

		bitCrusher.connect(wetNode);
	}

	private _setBitDepth(bitDepth: number) {
		this._bitDepth = bitDepth;
		const bitCrusher = this.node as ScriptProcessorNode;
		const step = Math.pow(0.75, this._bitDepth);
		let phaser = 0;
		let last = 0;

		bitCrusher.onaudioprocess = (e) => {
			const input = e.inputBuffer.getChannelData(0);
			const output = e.outputBuffer.getChannelData(0);
			for (let i = 0; i < this._buffer; i++) {
				phaser += this.node.normfreq;
				if (phaser >= 1.0) {
					phaser -= 1.0;
					last = step * Math.floor(input[i] / step + 0.5);
				}
				output[i] = last;
			}
		};
	}
}
export { BitCrusher };
