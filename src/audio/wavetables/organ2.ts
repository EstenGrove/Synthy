import { WaveTable } from "./wavetables";

/**
 * 'Organ2' sounds
 * - Preset 2
 */

const real: number[] = [0, 0.8, 0.6, 0.6, 0.7, 0.6, 0, 0.8, 0.3, 1];

const imag: number[] = real.map(() => 0);

const organ2: WaveTable = { real: real, imag: imag };

export { organ2 };
