// CREATE A CLOCK TIMER OUTSIDE THE MAIN THREAD IN A WEB WORKER
// - Adapted from: https://github.com/cwilso/metronome/blob/main/js/metronome.js#L38

// IDEA/CONCEPT:
// - We want to create an AudioContext, a "dummy" AudioBuffer to "unlock" access to the audioCtx.currentTime property for a more accurate timing mechanism

// creates a 'dummy/silent' audio buffer
const createBuffer = (audioCtx: AudioContext): AudioBuffer => {
	const buffer = audioCtx.createBuffer(1, 1, 22050);

	return buffer;
};
// creates AudioBufferSourceNode & applies our 'dummy/silent' buffer to it
const createBufferSource = (
	audioCtx: AudioContext,
	buffer: AudioBuffer
): AudioBufferSourceNode => {
	const sourceNode = audioCtx.createBufferSource();
	sourceNode.buffer = buffer;
	return sourceNode;
};
// creates both our audio buffer & buffer source node & applies our audiobuffer to the node
const createDummyBufferAndSource = (
	audioCtx: AudioContext
): AudioBufferSourceNode => {
	const audioBuffer = createBuffer(audioCtx);
	const bufferSource = createBufferSource(audioCtx, audioBuffer);
	return bufferSource;
};
