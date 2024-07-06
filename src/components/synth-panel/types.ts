/**
 * 'Synthy' Type Declarations
 */

export interface VCOSettings {
	waveType: OscillatorType;
	gain: number;
}
export interface ADSRSettings {
	attack: number;
	decay: number;
	sustain: number;
	release: number;
}
export interface FilterSettings {
	filterType: string; // 'lpf', 'hpf', 'notch', 'bandpass'
	freq: number; // filter cutoff
	semitones: number;
	level: number;
}
export interface ReverbSettings {
	reverbWave: string;
	time: number;
	feedback: number;
	level: number;
	src?: string;
}
export interface DelaySettings {
	time: number;
	feedback: number;
	level: number;
}
