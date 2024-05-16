// isolated gain node (could also use audioCtx.createGain())
const createGain = (audioCtx: AudioContext, initialVol: number): GainNode => {
	const gain = new GainNode(audioCtx, {
		gain: initialVol,
	});
	return gain;
};

// Cross-browser audio context
const createAudioContext = (): AudioContext => {
	const Context = AudioContext || window.AudioContext;
	const audioCtx = new Context();
	return audioCtx;
};

// Waveforms
const createCustomWave = (audioCtx: AudioContext): PeriodicWave => {
	const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	const cosineTerms = new Float32Array(sineTerms.length);
	return audioCtx.createPeriodicWave(cosineTerms, sineTerms);
};

const createAnalyser = (audioCtx: AudioContext): AnalyserNode => {
	const analyser = new AnalyserNode(audioCtx, {
		smoothingTimeConstant: 1,
		fftSize: 2048,
	});

	return analyser;
};

const fadeOutAudio = (gainNode: GainNode, audioCtx: AudioContext) => {
	if (!gainNode) return;
	// 0.0001 is the ramp value
	// audioCtx.currentTime + 0.05 means start ramping at 5secs before end of audio
	gainNode.gain.exponentialRampToValueAtTime(
		0.0001,
		audioCtx.currentTime + 0.05
	);
};

const fadeOutOsc = (osc: OscillatorNode, time: number = 0.015) => {
	if (!osc) return;
	osc.stop(time);
};

export interface AudioChain {
	audioCtx: AudioContext;
	gainNode: GainNode;
}

// creates AudioContext & GainNode & connects them to each & output
const initAudio = (initialVol: number = 0.7): AudioChain => {
	const audioCtx = new AudioContext();
	const gainNode = audioCtx.createGain();
	gainNode.connect(audioCtx.destination);
	gainNode.gain.value = initialVol;

	return {
		audioCtx: audioCtx,
		gainNode: gainNode,
	};
};

export {
	createAudioContext,
	createGain,
	createAnalyser,
	createCustomWave,
	fadeOutAudio,
	fadeOutOsc,
	// Custom audio
	initAudio,
};
