/**
 * 'Triangle'
 */

import { WaveTable } from "./wavetables";

const imag = Array.from({ length: 8192 }, (_, n) =>
	n === 0 ? 0 : (8 * Math.sin((n * Math.PI) / 2)) / Math.pow(Math.PI * n, 2)
);

const real = imag.map(() => 0);

const triangle: WaveTable = {
	real: real,
	imag: imag,
};

export { triangle };
