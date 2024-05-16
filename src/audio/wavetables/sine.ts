import { WaveTable } from "./wavetables";

const imag = Array.from({ length: 8192 }, (_, n) => (n === 1 ? 1 : 0));

const real = imag.map(() => 0);

const sine: WaveTable = { real, imag };

export { sine };
