import { ISettings } from "../effects/Effect";

/**
 * SharedNode:
 * - This is a light wrapper around the 'ConstantSourceNode' audio node
 * - It's purpose is to enable sharing/controlling a given value for multiple nodes simultaneously
 *
 * Eg. Two nodes whose volume/gain level you want to control with a single value
 * Control-Flow:
 *
 *              Input (osc, mic, audio sample)
 *                |
 *            SharedNode (eg. volume/gain)
 *            |        |
 *          Node1    Node2
 */
class SharedNode {
	private _node: ConstantSourceNode;
	private _audioCtx: AudioContext;
	private _offset: number;
	private _settings: ISettings;

	constructor(audioCtx: AudioContext, settings: ISettings) {
		this._audioCtx = audioCtx;
		this._offset = settings.offset ?? 0;
		this._settings = settings;

		this._node = new ConstantSourceNode(this._audioCtx, {
			offset: this._offset,
		});
	}

	public set offset(offset: number) {
		this._offset = offset;
		this._node.offset.value = offset;
	}

	public get audioCtx(): AudioContext {
		return this._audioCtx;
	}
	public get node(): ConstantSourceNode {
		return this._node;
	}

	public connect(node: AudioNode) {
		this._node.connect(node);
	}
	public connectMany(nodes: AudioNode[]) {
		nodes.forEach((node) => {
			this._node.connect(node);
		});
	}
	public disconnect() {
		this._node.disconnect();
	}
}

export { SharedNode };
