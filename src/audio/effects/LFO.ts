import { Effect, ISettings } from "./Effect";

class LFO extends Effect {
	constructor(audioCtx: AudioContext, settings: ISettings) {
		super(audioCtx, settings);

		this.level = settings?.level ?? 0.5;
	}
}
