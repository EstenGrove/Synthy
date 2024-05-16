import { NumericRange, TVolumeRange } from "../effects/Effect";

export type TAudioNode =
	| AudioNode
	| GainNode
	| DelayNode
	| WaveShaperNode
	| BiquadFilterNode
	| OscillatorNode
	| ConvolverNode;

export interface LocalNodes {
	[key: string]: TAudioNode;
}

class SingleAudioNode {
	private _audioCtx: AudioContext;
	private _node!: AudioNode;

	// Map of active audio nodes in this chain
	public nodes: LocalNodes = {};

	constructor(audioCtx: AudioContext) {
		this._audioCtx = audioCtx;
	}

	public get audioCtx(): AudioContext {
		return this._audioCtx;
	}
	public set audioCtx(audioCtx: AudioContext) {
		this._audioCtx = audioCtx;
	}
	public get node(): AudioNode {
		return this._node;
	}
	public set node(node: AudioNode) {
		this._node = node;
	}
	public connect(node: AudioNode): AudioNode {
		this._node.connect(node);
		return this._node;
	}
	public disconnect(): AudioNode {
		this._node.disconnect();
		return this._node;
	}
	public destroy(): AudioNode {
		return this.disconnect();
	}
}

class MultiAudioNode extends SingleAudioNode {
	private _outputNode!: AudioNode;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);
	}

	public get output(): AudioNode {
		return this._outputNode;
	}
	public set output(output: AudioNode) {
		this._outputNode = output;
	}
	public destroyAll() {
		if (Object.keys(this.nodes)) {
			Object.keys(this.nodes).forEach((nodeKey) => {
				this.nodes[nodeKey].disconnect();
			});
		}
	}
}

class Tremolo extends SingleAudioNode {
	private _speed: number;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this.nodes = {
			gainNode: audioCtx.createGain(),
			oscNode: audioCtx.createOscillator(),
		};

		// Connect nodes
		this.nodes.oscNode.connect(this.nodes.gainNode);

		// Setup osc
		const osc = this.nodes.oscNode as OscillatorNode;
		osc.type = "sine";

		this._speed = 20; // Default speed
	}

	public get speed(): number {
		return this._speed;
	}
	public set speed(value: number | string) {
		this._speed = Number(value);
		// set speed to oscillator
		const osc = this.nodes.oscNode as OscillatorNode;
		osc.frequency.value = this._speed;
	}
}

class Filter extends SingleAudioNode {
	private _intensity!: number;
	private _gain!: number;
	private _filterType!: BiquadFilterType;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this.nodes = {
			gainNode: this.audioCtx.createGain() as GainNode,
			waveShaper: this.audioCtx.createWaveShaper() as WaveShaperNode,
			biquadFilterNode: this.audioCtx.createBiquadFilter() as BiquadFilterNode,
		};

		// Default oversample to '4x'
		const waveShaper = this.nodes.waveShaper as WaveShaperNode;
		waveShaper.oversample = "4x";

		// Set filter type defaults to 'lowpass'
		const filter = this.nodes.biquadFilterNode as BiquadFilterNode;
		filter.type = "lowpass";
	}

	// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
	private calculateCurve(intensity: number | string): Float32Array {
		const num: number = Number(intensity);
		const intenseVal: number = num || 100;
		const samples: number = 44100;
		const degrees: number = Math.PI / 180;
		const curve: Float32Array = new Float32Array(samples);

		let i: number = 0;
		let x: number;

		for (i < samples; i++; ) {
			x = (i * 2) / samples - 1;
			curve[i] =
				((3 + intenseVal) * x * 20 * degrees) /
				(Math.PI + intenseVal * Math.abs(x));
		}

		return curve;
	}

	public get filterType(): BiquadFilterType {
		if (!this._filterType) {
			return "lowpass";
		} else {
			return this._filterType;
		}
	}
	public set filterType(type: BiquadFilterType) {
		this._filterType = type;
		// apply filter type to BiquadFilterNode
		const filter = this.nodes.biquadFilterNode as BiquadFilterNode;
		filter.type = type;
	}
	public get intensity(): number {
		return this._intensity;
	}
	public set intensity(value: number | string) {
		const val = Number(value);
		this._intensity = val;

		// apply filter type to BiquadFilterNode
		const waveShaper = this.nodes.waveShaper as WaveShaperNode;
		waveShaper.curve = this.calculateCurve(val);
	}
	public get gain(): number {
		return this._gain;
	}
	public set gain(value: number | string) {
		const val = Number(value);
		this._gain = val;

		const gainNode = this.nodes.gainNode as GainNode;
		gainNode.gain.value = val;
	}
}

class Output extends SingleAudioNode {
	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		if (this.audioCtx) {
			this.node = audioCtx.destination;
		}
	}
}

class Input extends SingleAudioNode {
	private _hasPermission: boolean;

	constructor(audioCtx: AudioContext) {
		super(audioCtx);

		this._hasPermission = false;
	}

	public hasPermission(): boolean {
		return this._hasPermission;
	}

	public get input(): AudioNode | MediaStream {
		return this.node;
	}
	public set input(stream: MediaStream) {
		this.node = this.audioCtx.createMediaStreamSource(stream);
	}

	public async getUserMedia(): Promise<MediaStream> {
		const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		this._hasPermission = !!stream;
		this.input = stream;
		return stream;
	}
	public async getAudioDevices(): Promise<Array<unknown>> {
		const deviceKinds = ["audioinput", "audiooutput"];
		if (this._hasPermission) {
			// returns an array of available audio devices such as mic, speakers, earbuds etc
			const devices: Array<MediaDeviceInfo | InputDeviceInfo> = (
				await navigator.mediaDevices.enumerateDevices()
			).filter((device) => deviceKinds.includes(device.kind));
			return devices;
		} else {
			return [];
		}
	}
}

class MasterVolume {
	private _audioCtx: AudioContext;
	private _node: GainNode;
	private _level: number;

	constructor(audioCtx: AudioContext, initialVol: number = 0.5) {
		this._audioCtx = audioCtx;
		this._level = initialVol as number;
		this._node = this._audioCtx.createGain() as GainNode;
		// Apply volume level & connect to output
		this._node.gain.value = this._level;
		this._node.connect(this._audioCtx.destination);
	}
	public get level(): number {
		return this._level;
	}
	public set level(vol: number | string) {
		const num = Number(vol);
		this._level = num;
		this._node.gain.value = num;
	}
	public fadeOut(when: number = 0.05) {
		if (!this._audioCtx || !this._node) return;

		// Fade out will begin at the current time + N
		const startAt = this._audioCtx.currentTime + when;

		// 1st arg is the exponent value for the fade out ramp down
		this._node.gain.exponentialRampToValueAtTime(0.0001, startAt);
	}
	// ##TODOS:
	// - Fix this to actually fade in
	public fadeIn(startAt: number = 0.05) {
		if (!this._audioCtx || !this._node) return;

		// Fade out will begin at the current time + N
		const when = this._audioCtx.currentTime + startAt;

		// 1st arg is the exponent value for the fade out ramp down
		// This will fade in volume to this._level in N seconds
		this._node.gain.exponentialRampToValueAtTime(this._level, when);
	}
}

export {
	// Input/Output nodes
	Input,
	Output,
	MasterVolume,
	// Reusable utility nodes
	SingleAudioNode,
	MultiAudioNode,
	// Audio Effect nodes
	Tremolo,
	Filter,
};
