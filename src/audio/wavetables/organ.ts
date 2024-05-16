import { WaveTable } from "./wavetables";

/**
 * 'Organ' sounds
 * - Preset 1
 */

const imag = [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1];

const real = imag.map(() => 0);

const organ: WaveTable = { real, imag };

export { organ };
