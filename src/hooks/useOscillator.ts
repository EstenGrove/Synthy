import { useState, useRef, useCallback } from "react";

type ActiveOscs = {
	[key: string]: OscillatorNode;
};

let audioCtx: AudioContext;
let gainNode: GainNode;

const useOscillator = () => {
	const [waveform, setWaveform] = useState<OscillatorType>("sine");
	const [volume, setVolume] = useState<string>("0.7");

	return {
		waveform,
		volume,
		audioCtx,
		gainNode,
	};
};

export { useOscillator };
