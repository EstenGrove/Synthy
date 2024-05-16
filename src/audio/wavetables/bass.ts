import { WaveTable } from "./wavetables";

/**
 * 'Bass' sounds
 * - Preset 1
 */

const real = [
	0, 1, 0.8144329896907216, 0.20618556701030927, 0.020618556701030927,
];

const imag = real.map(() => 0);

const bass: WaveTable = { real, imag };

export { bass };
