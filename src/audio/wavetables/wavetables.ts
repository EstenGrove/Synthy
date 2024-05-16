import { bass } from "./bass";
import { organ } from "./organ";
import { organ2 } from "./organ2";
import { sine } from "./sine";
import { triangle } from "./triangle";

export interface WaveTable {
	real: number[];
	imag: number[];
}

export type PresetName = "organ" | "organ2" | "bass";

export type PresetsMap = {
	[key in keyof PresetName]: WaveTable;
};

const PRESETS = {
	organ: organ,
	organ2: organ2,
	bass: bass,
	sine: sine,
	triangle: triangle,
};

export {
	// Presets map by instrument name
	PRESETS,
	// Individual table presets
	// organ,
	// organ2,
	// bass,
	// sine,
};
