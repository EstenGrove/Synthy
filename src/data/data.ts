/**
 * - Each horizontal row is a single octave of notes
 * - Each vertical col is a single note in an multiple octaves
 * Eg. 1,1 => A#1 (eg A# in octave1)
 * Eg. 1,2 => A#2 (eg. A# in octave2)
 *
 * Grid is 10x10
 * - Consider changing grid to 12x10
 *    - Eg. 12 notes (1 scale/octave) x 10 octaves
 */
const notesGrid = {
	["1,1"]: {
		note: "A#",
		freq: 16.35,
		octave: 1,
	},
	["1,2"]: {
		note: "A#",
		freq: 32.7,
		octave: 2,
	},
	["1,3"]: {
		note: "A#",
		freq: 49.05,
		octave: 3,
	},
};
