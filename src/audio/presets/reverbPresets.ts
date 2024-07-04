import ir_echo from "../../data/echo-chamber.wav";
import ir_dark from "../../data/dark-cathedral.wav";
import ir_cathedral from "../../data/cathedral.wav";
import ir_room from "../../data/room.wav";

export interface IReverbPreset {
	name: string;
	desc: string;
	src: string;
}

export type TReverbPresetName =
	| "Echo"
	| "Room"
	| "Dark Cathedral"
	| "Cathedral";

export interface IReverbPresets {
	[key: string]: IReverbPreset;
}

const echo1: IReverbPreset = {
	name: "Echo",
	src: ir_echo,
	desc: "Spacious high-end reverb",
};
const room1: IReverbPreset = {
	name: "Room",
	src: ir_room,
	desc: "Small room reverb, w/ dampened spread",
};
const darkCathedral: IReverbPreset = {
	name: "Dark Cathedral",
	src: ir_dark,
	desc: "Dark large cathedral, w/ spacious sounds",
};
const cathedral: IReverbPreset = {
	name: "Cathedral",
	src: ir_cathedral,
	desc: "Large cathedral, w/ top-end tails",
};

const reverbPresets: IReverbPresets = {
	Echo: echo1,
	Room: room1,
	"Dark Cathedral": darkCathedral,
	Cathedral: cathedral,
};

export { reverbPresets };
