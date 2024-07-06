import { useState, ChangeEvent, useRef } from "react";
import styles from "../css/pages/DemoPage.module.scss";
import Fader from "../components/controls/Fader";
import Select from "../components/shared/Select";
import ControlsPanel from "../components/controls/ControlsPanel";
import PowerButton from "../components/controls/PowerButton";
import TopPanel from "../components/synth/TopPanel";
import PresetsSelector from "../components/controls/PresetsSelector";
import ControlsRow from "../components/controls/ControlsRow";
import FxFader from "../components/controls/FxFader";
import CustomFader from "../components/controls/CustomFader";
import SineWave from "../components/visuals/SineWave";
import EffectColumn from "../components/synth/EffectColumn";
import Knob from "../components/controls/Knob";
import TouchSynth from "../components/touch-synth/TouchSynth";
import TouchOsc from "../components/touch-osc/TouchOsc";
// reverb shapes
import RoomReverbWave from "../components/shapes/RoomReverbWave";
import CathedralReverbWave from "../components/shapes/CathedralReverbWave";
import EchoReverbWave from "../components/shapes/EchoReverbWave";
import DarkReverbWave from "../components/shapes/DarkReverbWave";

type Props = {};

const customCSS = {
	preset: {
		width: "20rem",
	},
	keys: {
		width: "8rem",
	},
};

const presets = [
	"Slow Burn",
	"Sawtooth Harp",
	"Buzzing Saw",
	"Vibes",
	"Organ",
	"Piano",
	"Custom",
];

const keys = ["Am", "C#", "Db", "G#", "F#", "Bb"];

const showStuff = {
	controls: false,
	faders: false,
	knobs: true,
};

// const hunny = range(0, 50, 3);
// console.log("hunny", hunny);

const DemoPage = ({}: Props) => {
	const divRef = useRef(null);
	const [isOn, setIsOn] = useState<boolean>(false);
	const [val, setVal] = useState("0.5");
	const [angle, setAngle] = useState("0");
	const [preset, setPreset] = useState<string>("");
	const [key, setKey] = useState<string>("");
	const [values, setValues] = useState({
		attack: 0.5,
		decay: 0.5,
		sustain: 0.5,
		release: 0.5,
	});

	const handleVal = (e: ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value);
	};

	const selectPreset = (option: string) => {
		console.log("option", option);
		setPreset(option);
	};
	const handleKey = (e: ChangeEvent<HTMLSelectElement>) => {
		setKey(e.target.value);
	};

	const togglePower = () => {
		setIsOn(!isOn);
	};

	const handleVals = (name: string, val: number) => {
		setValues({
			...values,
			[name]: val,
		});
	};

	return (
		<div ref={divRef} className={styles.DemoPage}>
			<h1>Demo Page</h1>

			<div className={styles.DemoPage_main}>
				<CathedralReverbWave />
				<DarkReverbWave />
				<RoomReverbWave />
				<EchoReverbWave />
			</div>

			{/* SYNTH CONTROLS UI */}
			<div className={styles.SynthWrapper}>
				{/* <SineWave amplitude={30} freq={440} rarity={1} phase={180} /> */}
				{/* <TouchSynth /> */}
				{/* <TouchOsc /> */}
			</div>
		</div>
	);
};

export default DemoPage;
