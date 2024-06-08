import { INote } from "../utils/utils_notes";
import { groupBy } from "../utils/utils_shared";
import { NOTES_LIST as notesList } from "./synthNotes";

// returns object like [octave1]: [...notesForOctave]
const getNotesByOctave = (notes: INote[]) => {
	const grouped = groupBy<INote, "octave">("octave", notes);

	return grouped;
};

const notesByOctave = getNotesByOctave(notesList);

// returns all notes for a given octave
const getNotesForOctave = (octave: number, notesList: INote[]): INote[] => {
	const octaveNotes = notesList.filter((note) => note.octave === octave);

	return octaveNotes;
};

const getNoteFromKey = (key: string, octaveNotes: INote[]) => {
	switch (key) {
		case "KeyA": {
			const note = octaveNotes[0];
			return note;
		}
		case "KeyS": {
			const note = octaveNotes[1];
			return note;
		}
		case "KeyD": {
			const note = octaveNotes[3];
			return note;
		}
		case "KeyF": {
			const note = octaveNotes[4];
			return note;
		}
		case "KeyG": {
			const note = octaveNotes[6];
			console.log("note(G)", note);
			return note;
		}
		case "KeyH": {
			const note = octaveNotes[7];
			console.log("note(G)", note);
			return note;
		}
		case "KeyJ": {
			const note = octaveNotes[9];
			return note;
		}
		case "KeyK": {
			const note = octaveNotes[10];
			return note;
		}
		case "KeyL": {
			const note = octaveNotes[11];
			return note;
		}
		case "Semicolon": {
			const note = octaveNotes[13];
			return note;
		}
		case "Quote": {
			const note = octaveNotes[14];
			return note;
		}

		default:
			return;
	}
};

export { getNotesByOctave, notesByOctave, getNotesForOctave, getNoteFromKey };
