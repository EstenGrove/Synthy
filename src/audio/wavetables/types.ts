export interface PresetWave {
	real: Float32Array;
	imag: Float32Array;
}

export interface InstrumentPreset {
	name?: string;
	freq?: number;
	waveData: PresetWave;
}
