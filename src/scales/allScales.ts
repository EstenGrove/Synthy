export type TScaleType =
	| "Major"
	| "Minor"
	| "HarmonicMajor"
	| "HarmonicMinor"
	| "Ionian";
// | "Dorian"
// | "Phrygian"
// | "Lydian"
// | "Mixolydian"
// | "Aeolian"
// | "Locrian"
// | "MajorPentatonic"
// | "MinorPentatonic"
// | "MajorBlues"
// | "MinorBlues"
// | "WholeTone"
// | "DiminishedW-H"
// | "DiminishedH-W"
// | "Chromatic";

export type TNote = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "Gb" | "F#";

export type IScalesMap = {
	[Type in TScaleType]: {
		[Type in TNote]?: Array<string>;
	};
};
