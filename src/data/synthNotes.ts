import { IScalesMap, TScaleType } from "../scales/allScales";
import { INote } from "../utils/utils_notes";

const NOTES_LIST: INote[] = [
	{
		type: "white",
		label: "C",
		octave: 1,
		freq: 16.35,
	},
	{
		type: "black",
		label: "C#",
		octave: 1,
		freq: 17.32,
	},
	{
		type: "black",
		label: "Db",
		octave: 1,
		freq: 17.32,
	},
	{
		type: "white",
		label: "D",
		octave: 1,
		freq: 18.35,
	},
	{
		type: "black",
		label: "D#",
		octave: 1,
		freq: 19.45,
	},
	{
		type: "black",
		label: "Eb",
		octave: 1,
		freq: 19.45,
	},
	{
		type: "white",
		label: "E",
		octave: 1,
		freq: 20.6,
	},
	{
		type: "white",
		label: "F",
		octave: 1,
		freq: 21.83,
	},
	{
		type: "black",
		label: "F#",
		octave: 1,
		freq: 23.12,
	},
	{
		type: "black",
		label: "Gb",
		octave: 1,
		freq: 23.12,
	},
	{
		type: "white",
		label: "G",
		octave: 1,
		freq: 24.5,
	},
	{
		type: "black",
		label: "G#",
		octave: 1,
		freq: 25.96,
	},
	{
		type: "black",
		label: "Ab",
		octave: 1,
		freq: 25.96,
	},
	{
		type: "white",
		label: "A",
		octave: 1,
		freq: 27.5,
	},
	{
		type: "black",
		label: "A#",
		octave: 1,
		freq: 29.14,
	},
	{
		type: "black",
		label: "Bb",
		octave: 1,
		freq: 29.14,
	},
	{
		type: "white",
		label: "B",
		octave: 1,
		freq: 30.87,
	},
	{
		type: "white",
		label: "C",
		octave: 2,
		freq: 32.7,
	},
	{
		type: "black",
		label: "C#",
		octave: 2,
		freq: 34.65,
	},
	{
		type: "black",
		label: "Db",
		octave: 2,
		freq: 34.65,
	},
	{
		type: "white",
		label: "D",
		octave: 2,
		freq: 36.71,
	},
	{
		type: "black",
		label: "D#",
		octave: 2,
		freq: 38.89,
	},
	{
		type: "black",
		label: "Eb",
		octave: 2,
		freq: 38.89,
	},
	{
		type: "white",
		label: "E",
		octave: 2,
		freq: 41.2,
	},
	{
		type: "white",
		label: "F",
		octave: 2,
		freq: 43.65,
	},
	{
		type: "black",
		label: "F#",
		octave: 2,
		freq: 46.25,
	},
	{
		type: "black",
		label: "Gb",
		octave: 2,
		freq: 46.25,
	},
	{
		type: "white",
		label: "G",
		octave: 2,
		freq: 49,
	},
	{
		type: "black",
		label: "G#",
		octave: 2,
		freq: 51.91,
	},
	{
		type: "black",
		label: "Ab",
		octave: 2,
		freq: 51.91,
	},
	{
		type: "white",
		label: "A",
		octave: 2,
		freq: 55,
	},
	{
		type: "black",
		label: "A#",
		octave: 2,
		freq: 58.27,
	},
	{
		type: "black",
		label: "Bb",
		octave: 2,
		freq: 58.27,
	},
	{
		type: "white",
		label: "B",
		octave: 2,
		freq: 61.74,
	},
	{
		type: "white",
		label: "C",
		octave: 3,
		freq: 65.41,
	},
	{
		type: "black",
		label: "C#",
		octave: 3,
		freq: 69.3,
	},
	{
		type: "black",
		label: "Db",
		octave: 3,
		freq: 69.3,
	},
	{
		type: "white",
		label: "D",
		octave: 3,
		freq: 73.42,
	},
	{
		type: "black",
		label: "D#",
		octave: 3,
		freq: 77.78,
	},
	{
		type: "black",
		label: "Eb",
		octave: 3,
		freq: 77.78,
	},
	{
		type: "white",
		label: "E",
		octave: 3,
		freq: 82.41,
	},
	{
		type: "white",
		label: "F",
		octave: 3,
		freq: 87.31,
	},
	{
		type: "black",
		label: "F#",
		octave: 3,
		freq: 92.5,
	},
	{
		type: "black",
		label: "Gb",
		octave: 3,
		freq: 92.5,
	},
	{
		type: "white",
		label: "G",
		octave: 3,
		freq: 98,
	},
	{
		type: "black",
		label: "G#",
		octave: 3,
		freq: 103.83,
	},
	{
		type: "black",
		label: "Ab",
		octave: 3,
		freq: 103.83,
	},
	{
		type: "white",
		label: "A",
		octave: 3,
		freq: 110,
	},
	{
		type: "black",
		label: "A#",
		octave: 3,
		freq: 116.54,
	},
	{
		type: "black",
		label: "Bb",
		octave: 3,
		freq: 116.54,
	},
	{
		type: "white",
		label: "B",
		octave: 3,
		freq: 123.47,
	},
	{
		type: "white",
		label: "C",
		octave: 4,
		freq: 130.81,
	},
	{
		type: "black",
		label: "C#",
		octave: 4,
		freq: 138.59,
	},
	{
		type: "black",
		label: "Db",
		octave: 4,
		freq: 138.59,
	},
	{
		type: "white",
		label: "D",
		octave: 4,
		freq: 146.83,
	},
	{
		type: "black",
		label: "D#",
		octave: 4,
		freq: 155.56,
	},
	{
		type: "black",
		label: "Eb",
		octave: 4,
		freq: 155.56,
	},
	{
		type: "white",
		label: "E",
		octave: 4,
		freq: 164.81,
	},
	{
		type: "white",
		label: "F",
		octave: 4,
		freq: 174.61,
	},
	{
		type: "black",
		label: "F#",
		octave: 4,
		freq: 185,
	},
	{
		type: "black",
		label: "Gb",
		octave: 4,
		freq: 185,
	},
	{
		type: "white",
		label: "G",
		octave: 4,
		freq: 196,
	},
	{
		type: "black",
		label: "G#",
		octave: 4,
		freq: 207.65,
	},
	{
		type: "black",
		label: "Ab",
		octave: 4,
		freq: 207.65,
	},
	{
		type: "white",
		label: "A",
		octave: 4,
		freq: 220,
	},
	{
		type: "black",
		label: "A#",
		octave: 4,
		freq: 233.08,
	},
	{
		type: "black",
		label: "Bb",
		octave: 4,
		freq: 233.08,
	},
	{
		type: "white",
		label: "B",
		octave: 4,
		freq: 246.94,
	},
	{
		type: "white",
		label: "C",
		octave: 5,
		freq: 261.63,
	},
	{
		type: "black",
		label: "C#",
		octave: 5,
		freq: 277.18,
	},
	{
		type: "black",
		label: "Db",
		octave: 5,
		freq: 277.18,
	},
	{
		type: "white",
		label: "D",
		octave: 5,
		freq: 293.66,
	},
	{
		type: "black",
		label: "D#",
		octave: 5,
		freq: 311.13,
	},
	{
		type: "black",
		label: "Eb",
		octave: 5,
		freq: 311.13,
	},
	{
		type: "white",
		label: "E",
		octave: 5,
		freq: 329.63,
	},
	{
		type: "white",
		label: "F",
		octave: 5,
		freq: 349.23,
	},
	{
		type: "black",
		label: "F#",
		octave: 5,
		freq: 369.99,
	},
	{
		type: "black",
		label: "Gb",
		octave: 5,
		freq: 369.99,
	},
	{
		type: "white",
		label: "G",
		octave: 5,
		freq: 392,
	},
	{
		type: "black",
		label: "G#",
		octave: 5,
		freq: 415.3,
	},
	{
		type: "black",
		label: "Ab",
		octave: 5,
		freq: 415.3,
	},
	{
		type: "white",
		label: "A",
		octave: 5,
		freq: 440,
	},
	{
		type: "black",
		label: "A#",
		octave: 5,
		freq: 466.16,
	},
	{
		type: "black",
		label: "Bb",
		octave: 5,
		freq: 466.16,
	},
	{
		type: "white",
		label: "B",
		octave: 5,
		freq: 493.88,
	},
	{
		type: "white",
		label: "C",
		octave: 6,
		freq: 523.25,
	},
	{
		type: "black",
		label: "C#",
		octave: 6,
		freq: 554.37,
	},
	{
		type: "black",
		label: "Db",
		octave: 6,
		freq: 554.37,
	},
	{
		type: "white",
		label: "D",
		octave: 6,
		freq: 587.33,
	},
	{
		type: "black",
		label: "D#",
		octave: 6,
		freq: 622.25,
	},
	{
		type: "black",
		label: "Eb",
		octave: 6,
		freq: 622.25,
	},
	{
		type: "white",
		label: "E",
		octave: 6,
		freq: 659.26,
	},
	{
		type: "white",
		label: "F",
		octave: 6,
		freq: 698.46,
	},
	{
		type: "black",
		label: "F#",
		octave: 6,
		freq: 739.99,
	},
	{
		type: "black",
		label: "Gb",
		octave: 6,
		freq: 739.99,
	},
	{
		type: "white",
		label: "G",
		octave: 6,
		freq: 783.99,
	},
	{
		type: "black",
		label: "G#",
		octave: 6,
		freq: 830.61,
	},
	{
		type: "black",
		label: "Ab",
		octave: 6,
		freq: 830.61,
	},
	{
		type: "white",
		label: "A",
		octave: 6,
		freq: 880,
	},
	{
		type: "black",
		label: "A#",
		octave: 6,
		freq: 932.33,
	},
	{
		type: "black",
		label: "Bb",
		octave: 6,
		freq: 932.33,
	},
	{
		type: "white",
		label: "B",
		octave: 6,
		freq: 987.77,
	},
	{
		type: "white",
		label: "C",
		octave: 7,
		freq: 1046.5,
	},
	{
		type: "black",
		label: "C#",
		octave: 7,
		freq: 1108.73,
	},
	{
		type: "black",
		label: "Db",
		octave: 7,
		freq: 1108.73,
	},
	{
		type: "white",
		label: "D",
		octave: 7,
		freq: 1174.66,
	},
	{
		type: "black",
		label: "D#",
		octave: 7,
		freq: 1244.51,
	},
	{
		type: "black",
		label: "Eb",
		octave: 7,
		freq: 1244.51,
	},
	{
		type: "white",
		label: "E",
		octave: 7,
		freq: 1318.51,
	},
	{
		type: "white",
		label: "F",
		octave: 7,
		freq: 1396.91,
	},
	{
		type: "black",
		label: "F#",
		octave: 7,
		freq: 1479.98,
	},
	{
		type: "black",
		label: "Gb",
		octave: 7,
		freq: 1479.98,
	},
	{
		type: "white",
		label: "G",
		octave: 7,
		freq: 1567.98,
	},
	{
		type: "black",
		label: "G#",
		octave: 7,
		freq: 1661.22,
	},
	{
		type: "black",
		label: "Ab",
		octave: 7,
		freq: 1661.22,
	},
	{
		type: "white",
		label: "A",
		octave: 7,
		freq: 1760,
	},
	{
		type: "black",
		label: "A#",
		octave: 7,
		freq: 1864.66,
	},
	{
		type: "black",
		label: "Bb",
		octave: 7,
		freq: 1864.66,
	},
	{
		type: "white",
		label: "B",
		octave: 7,
		freq: 1975.53,
	},
	{
		type: "white",
		label: "C",
		octave: 8,
		freq: 2093,
	},
	{
		type: "black",
		label: "C#",
		octave: 8,
		freq: 2217.46,
	},
	{
		type: "black",
		label: "Db",
		octave: 8,
		freq: 2217.46,
	},
	{
		type: "white",
		label: "D",
		octave: 8,
		freq: 2349.32,
	},
	{
		type: "black",
		label: "D#",
		octave: 8,
		freq: 2489.02,
	},
	{
		type: "black",
		label: "Eb",
		octave: 8,
		freq: 2489.02,
	},
	{
		type: "white",
		label: "E",
		octave: 8,
		freq: 2637.02,
	},
	{
		type: "white",
		label: "F",
		octave: 8,
		freq: 2793.83,
	},
	{
		type: "black",
		label: "F#",
		octave: 8,
		freq: 2959.96,
	},
	{
		type: "black",
		label: "Gb",
		octave: 8,
		freq: 2959.96,
	},
	{
		type: "white",
		label: "G",
		octave: 8,
		freq: 3135.96,
	},
	{
		type: "black",
		label: "G#",
		octave: 8,
		freq: 3322.44,
	},
	{
		type: "black",
		label: "Ab",
		octave: 8,
		freq: 3322.44,
	},
	{
		type: "white",
		label: "A",
		octave: 8,
		freq: 3520,
	},
	{
		type: "black",
		label: "A#",
		octave: 8,
		freq: 3729.31,
	},
	{
		type: "black",
		label: "Bb",
		octave: 8,
		freq: 3729.31,
	},
	{
		type: "white",
		label: "B",
		octave: 8,
		freq: 3951.07,
	},
	{
		type: "white",
		label: "C",
		octave: 9,
		freq: 4186.01,
	},
	{
		type: "black",
		label: "C#",
		octave: 9,
		freq: 4434.92,
	},
	{
		type: "black",
		label: "Db",
		octave: 9,
		freq: 4434.92,
	},
	{
		type: "white",
		label: "D",
		octave: 9,
		freq: 4698.64,
	},
	{
		type: "black",
		label: "D#",
		octave: 9,
		freq: 4978.03,
	},
	{
		type: "black",
		label: "Eb",
		octave: 9,
		freq: 4978.03,
	},
];

const SCALE_NAMES: string[] = [
	"Major",
	"Minor",
	"HarmonicMinor",
	"Ionian",
	"Dorian",
	"Phrygian",
	"Lydian",
	"Mixolydian",
	"Aeolian",
	"Locrian",
	"MajorPentatonic",
	"MinorPentatonic",
	"MajorBlues",
	"MinorBlues",
	"WholeTone",
	"DiminishedW-H",
	"DiminishedH-W",
	"Chromatic",
];

const SCALES_MAP: IScalesMap = {
	Major: {
		C: ["C", "D", "E", "F", "G", "A", "B", "C"],
		D: ["D", "E", "F#", "G", "A", "B", "C#", "D"],
		E: ["E", "F#", "G#", "A", "B", "C#", "D#", "E"],
		F: ["F", "G", "A", "Bb", "C", "D", "E", "F"],
		G: ["G", "A", "B", "C", "D", "E", "F#", "G"],
		A: ["A", "B", "C#", "D", "E", "F#", "G#", "A"],
		B: ["B", "C#", "D#", "E", "F#", "G#", "A#", "B"],
		// 🔻 MIGHT REMOVE THESE FOR EASE-OF-USE 🔻
		"F#": ["F#", "G#", "A#", "B", "C#", "D#", "Db", "F#"],
		Gb: ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F", "Gb"],
	},
	Minor: {
		A: ["A", "B", "C", "D", "E", "F", "G", "A"],
		B: ["B", "C", "D", "E", "F", "G", "A", "B"],
		C: ["C", "D", "Eb", "F", "G", "Ab", "Bb", "C"],
		D: ["D", "E", "F", "G", "A", "B", "C", "D"],
		E: ["E", "F♯", "G", "A", "B", "C", "D", "E"],
		F: ["F", "G", "Ab", "Bb", "C", "Db", "Eb", "F"],
		G: ["G", "A", "Bb", "C", "D", "Eb", "F", "G"],
		Gb: [],
		"F#": [],
	},
	// 6th note is different: W-W-H-W-H-W&H-H
	// - Whole, Whole, Half, Whole, Half, Whole & a Half, Half
	HarmonicMajor: {
		C: ["C", "D", "E", "F", "G", "Ab", "B", "C"],
		D: ["D", "E", "F#", "G", "A", "Bb", "C#", "D"],
		E: ["E", "F#", "G#", "A", "B", "C", "D#", "E"],
		F: ["F", "G", "A", "Bb", "C", "Db", "E", "F"],
		G: ["G", "A", "B", "C", "D", "Eb", "F#", "G"],
		A: ["A", "B", "C#", "D", "E", "F", "G#", "A"],
		B: ["B", "C#", "D#", "E", "F#", "G", "A#", "B"],
	},
	HarmonicMinor: {
		C: ["C", "D", "Eb", "F", "G", "Ab", "B", "C"],
		D: ["D", "E", "Fb", "G", "A", "Bb", "C#", "D"],
		E: ["E", "F#", "Gb", "A", "B", "C", "D#", "E"],
		F: ["F", "G", "Ab", "Bb", "C", "Db", "E", "F"],
		G: ["G", "A", "Bb", "C", "D", "Eb", "F#", "G"],
		A: ["A", "B", "Cb", "D", "E", "F", "G#", "A"],
		B: ["B", "C#", "Db", "E", "F#", "G", "A#", "B"],
	},
	Ionian: {
		A: ["A", "B", "C♯", "D", "E", "F♯", "G♯"],
		C: ["C", "D", "E", "F", "G", "A", "B"],
		D: ["D", "E", "F♯", "G", "A", "B", "C♯"],
		E: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯"],
	},
};

// Contains extra info about each scale type
// - 'label': human-readable alias
// - 'desc': descriptive tone pattern for scale type
// - 'scales': the actual scales under that type
const SCALES_INFO_MAP = {
	Major: {
		label: "Major",
		desc: "Major scales: W-W-H-W-W-W-H",
		scales: { ...SCALES_MAP?.Major },
	},
	Minor: {
		label: "Minor",
		desc: "Minor scales: ",
		scales: { ...SCALES_MAP?.Minor },
	},
	HarmonicMajor: {
		label: "Harmonic-Major",
		desc: "Major scales: ",
		scales: { ...SCALES_MAP?.HarmonicMajor },
	},
	HarmonicMinor: {
		label: "Harmonic-Minor",
		desc: "Minor scales: ",
		scales: { ...SCALES_MAP?.HarmonicMinor },
	},
	Ionian: {
		label: "Ionian",
		desc: "Ionian scales: ",
		scales: { ...SCALES_MAP?.Ionian },
	},
};

// C_Major: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
// A_Minor: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']
export type TScale = Array<string>;

export interface IScaleOpts {
	baseOctave: number;
}

const getScaleByNotesList = (scale: TScale, options: IScaleOpts) => {
	const { baseOctave } = options;
	// find our starting point by finding the 1st occurrence of our base octave (eg 1st note of base octave)
	const baseIdx = NOTES_LIST.findIndex((note) => note.octave === baseOctave);
	// trim off all notes before our baseIdx since they're out of scope
	const candidates = NOTES_LIST.slice(baseIdx);
	const notesScale = candidates.filter((note) => {
		const isMatch = note.octave === baseOctave && scale.includes(note.label);
		// handle last note, in next octave
		const isLastNote =
			note.octave === baseOctave + 1 && note.label === scale[scale.length - 1];
		return isMatch || isLastNote;
	});

	return notesScale;
};

export {
	NOTES_LIST,
	// Scales & Utils
	SCALES_MAP,
	SCALE_NAMES,
	SCALES_INFO_MAP,
	getScaleByNotesList,
};
