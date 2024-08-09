const queryNavigatorPermissions = async (
	target: PermissionName
): Promise<string | null> => {
	try {
		const perms = await navigator.permissions.query({
			name: target as PermissionName,
		});
		const permsState = perms.state;
		return permsState;
	} catch (error) {
		return null;
	}
};

// isolated gain node (could also use audioCtx.createGain())
const createGain = (audioCtx: AudioContext, initialVol: number): GainNode => {
	const gain = new GainNode(audioCtx, {
		gain: initialVol,
	});
	return gain;
};

// latencyHint: "balanced" | "interactive" | "playback"
// sampleRate: 44100 (range: 8000-96000)
export interface IAudioOpts {
	latencyHint?: AudioContextLatencyCategory;
	sampleRate?: number;
}
// Cross-browser audio context
const createAudioContext = (options: IAudioOpts = {}): AudioContext => {
	const Context = AudioContext || window.AudioContext;

	if (options && Object.keys(options)?.length > 0) {
		const audioCtx = new Context(options);
		return audioCtx;
	} else {
		const audioCtx = new Context();
		return audioCtx;
	}
};

// Waveforms
const createDefaultCustomWave = (audioCtx: AudioContext): PeriodicWave => {
	const sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	const cosineTerms = new Float32Array(sineTerms.length);
	return audioCtx.createPeriodicWave(cosineTerms, sineTerms);
};

export interface WaveTable {
	real: number[];
	imag: number[];
}

const defaultTerms: WaveTable = {
	real: [0, 0, 1, 0, 1],
	imag: [0, 0, 1, 0, 1],
};

// accepts a custom wavetable dataset to generate a custom PeriodicWave w/ that dataset
const createCustomWave = (
	audioCtx: AudioContext,
	waveTerms: WaveTable = defaultTerms
): PeriodicWave => {
	const real: Float32Array = new Float32Array(waveTerms.real);
	const imag: Float32Array = new Float32Array(waveTerms.imag);
	const customWave = audioCtx.createPeriodicWave(real, imag);

	return customWave;
};

// Note: 'base' MUST be at least 2 as that's the minimum bound for a wave
const generateCustomWave = (
	audioCtx: AudioContext,
	base: number = 4096
): PeriodicWave => {
	const real = new Float32Array(base);
	const imag = new Float32Array(base);

	for (let i = 1; i < base; i += 2) {
		imag[i] = 4.0 / (Math.PI * i);
	}

	const wave = audioCtx.createPeriodicWave(real, imag);

	return wave;
};

const createAnalyser = (audioCtx: AudioContext): AnalyserNode => {
	const analyser = new AnalyserNode(audioCtx, {
		smoothingTimeConstant: 1,
		fftSize: 2048,
	});

	return analyser;
};

// Create a media stream node (used with oscillators to create a stream source)
const createStreamNode = (
	audioCtx: AudioContext
): MediaStreamAudioDestinationNode => {
	const streamNode = audioCtx.createMediaStreamDestination();

	return streamNode;
};

// Creates a media stream source from a media stream destination node
const createStreamSource = (
	audioCtx: AudioContext,
	destNode: MediaStreamAudioDestinationNode
): MediaStreamAudioSourceNode => {
	const mediaStreamSource = audioCtx.createMediaStreamSource(destNode.stream);
	return mediaStreamSource;
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

const getReverbArrayBuffer = async (
	url: string
): Promise<ArrayBuffer | unknown> => {
	try {
		const request = await fetch(url);
		const arrayBuffer = await request.arrayBuffer();
		return arrayBuffer;
	} catch (error: unknown) {
		return error;
	}
};

// accepts an array buffer & decode's it's audio data
const convertBufferToAudioBuffer = async (
	audioCtx: AudioContext,
	arrayBuffer: ArrayBuffer
): Promise<AudioBuffer> => {
	const decoded = await audioCtx.decodeAudioData(arrayBuffer);
	return decoded;
};

const getReverbIR = async (
	audioCtx: AudioContext,
	url: string
): Promise<AudioBuffer> => {
	const arrayBuffer = (await getReverbArrayBuffer(url)) as ArrayBuffer;
	const audioBuffer = await convertBufferToAudioBuffer(audioCtx, arrayBuffer);

	// return the impulse response as an AudioBuffer
	return audioBuffer;
};

// VU/PEAK METER UTILS //

const getBaseLog = (x: number, y: number): number => {
	return Math.log(y) / Math.log(x);
};
const getDecibelsFromFloat = (float: number) => {
	return getBaseLog(10, float) * 20;
};

// AUDIO PLAYER UTILS //

// converts seconds to mins & returns a number (eg 92 secs => 1.53 mins)
const secondsToMins = (secs: number): number => {
	const mins = secs / 60;
	return mins;
};

interface IFloorMins {
	mins: number;
	secs: number;
}
const secondsToMinsFloor = (secs: number): IFloorMins => {
	const mins = Math.floor(secs / 60);
	const remainSecs = secs - mins * 60;

	return {
		mins,
		secs: remainSecs,
	};
};

// converts seconds to mins
const formatDuration = (durationInSecs: number): string => {
	const mins = Math.floor(durationInSecs / 60);
	const remainingSecs = durationInSecs - mins * 60;

	if (mins <= 0 && remainingSecs <= 0) {
		return `0:00`;
	}

	const time = `${mins}:${remainingSecs}`;
	return time;
};

export {
	// Navigator Permissions (eg. mic, camera etc)
	queryNavigatorPermissions,
	// Audio Player Utils
	secondsToMins,
	secondsToMinsFloor,
	formatDuration,
	// Audio Node Utils
	createAudioContext,
	createGain,
	createAnalyser,
	createStreamNode,
	createStreamSource,
	fadeOutAudio,
	fadeOutOsc,
	// Wavetables & Periodic waves
	generateCustomWave,
	createDefaultCustomWave,
	createCustomWave,
	// Reverb Utils
	convertBufferToAudioBuffer,
	getReverbArrayBuffer,
	getReverbIR,
	// Peak Meter Utils
	getBaseLog,
	getDecibelsFromFloat,
	// Custom audio
	initAudio,
};
