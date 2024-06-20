import { useState } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/playground/UIPlayground.module.scss";
import Synthy from "../synth-panel/Synthy";
import EffectDropdown, { IDropdownOption } from "../controls/EffectDropdown";
import LPFWave from "../shapes/LPFWave";
import HPFWave from "../shapes/HPFWave";
import BandPassWave from "../shapes/BandPassWave";
import NotchWave from "../shapes/NotchWave";
import OctavesPicker from "../controls/OctavesPicker";
import RoomReverbWave from "../shapes/RoomReverbWave";
import DarkReverbWave from "../shapes/DarkReverbWave";
import CathedralReverbWave from "../shapes/CathedralReverbWave";
import CommandPalette from "../command-palette/CommandPalette";
import { useHotKeys } from "../../hooks/useHotKeys";
import { useKeyPress } from "../../hooks/useKeyPress";
import { ICommandMenuOption } from "../../utils/utils_commandPalette";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Props = {};

// 'Synthy' Requirements:
//
// - Oscillator(s):
//    - VCO 1 & 2
//        - Waveform/type
//        - Gain/level
//        - Freq???
//        - Transposed steps???
// - Effects:
//    - Envelope Filter (ADSR)
//    - Filter (LPF, HPF)
//    - Reverb (Dry/Wet, IIR sample (eg. room, cathedral etc), Level)
//    - Delay (Dry/Wet, Time, Feedback, Level)
//    - Distortion (Level, Oversamples??)
//    - Master Volume

const waveOptions: IDropdownOption[] = [
	{
		value: "LPF",
		element: LPFWave,
	},
	{
		value: "HPF",
		element: HPFWave,
	},
	{
		value: "Band-Pass",
		element: BandPassWave,
	},
	{
		value: "Notch",
		element: NotchWave,
	},
];

const octaves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type ItemProps = {
	label: string;
	icon: string;
};

const Item = ({ label, icon }: ItemProps) => {
	return (
		<div className={styles.Item}>
			<svg className={styles.Item_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
			<div>{label}</div>
		</div>
	);
};

const menuOptions: ICommandMenuOption[] = [
	{
		name: "recorder-page",
		label: "New Synth Preset",
		element: <Item icon="add" label="New Synth Preset" />,
		command: ["ctrl", "a"],
		route: "/recorder",
	},
	{
		name: "playground-page",
		label: "Open Audio Playground",
		element: <Item icon="speaker" label="Open Audio Playground" />,
		command: ["ctrl", "l"],
		route: "/module",
	},
	{
		name: "osc-builder-page",
		label: "Open Module Builder",
		element: <Item icon="collections_bookmark" label="Open Module Builder" />,
		command: ["ctrl", "b"],
	},
	{
		name: "synth-page",
		label: "Open Web Synth",
		element: <Item icon="favorite_outline" label="Open Web Synth" />,
		command: ["s"],
	},
];

const UIPlayground = ({}: Props) => {
	const [selected, setSelected] = useState("");
	const [showCommandPalette, setShowCommandPalette] = useState(true);
	const navigate = useNavigate();
	// trigger menu to open
	useHotKeys(["ctrl", "k"], () => {
		openCommandPalette();
	});

	const handleWave = (_: string, value: string) => {
		setSelected(value);
	};

	const openCommandPalette = () => {
		setShowCommandPalette(true);
	};
	const closeCommandPalette = () => {
		setShowCommandPalette(false);
	};

	const handleCommand = (option: ICommandMenuOption) => {
		console.log("option", option);
		// navigate(option?.route);
	};

	return (
		<div className={styles.UIPlayground}>
			<h1>UI Page</h1>
			<div className={styles.UIPlayground_main}>
				{showCommandPalette && (
					<CommandPalette
						onSelect={handleCommand}
						menuOptions={menuOptions}
						closeCommandPalette={closeCommandPalette}
					/>
				)}
				<br />
				<br />
				<br />
				<br />
				<Synthy />
				{/* <OctavesPicker octaves={octaves} /> */}
				{/* <EffectDropdown
					label="Reverb"
					name="reverbWave"
					options={waveOptions}
					onChange={handleWave}
				/> */}
			</div>
		</div>
	);
};

export default UIPlayground;
