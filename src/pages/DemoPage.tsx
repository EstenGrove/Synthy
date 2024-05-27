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
	faders: true,
	knobs: false,
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

	return (
		<div ref={divRef} className={styles.DemoPage}>
			<h1>Demo Page</h1>

			<div className={styles.DemoPage_main}>
				{/* <SineWave amplitude={30} freq={440} rarity={1} phase={180} /> */}

				{/* <CustomFader
					initialVal={"45"}
					stripeColor="var(--accent)"
					min={0}
					max={100}
				/> */}
				{/* <FxFader /> */}
				<Fader />
				<br />
				<br />
				<br />
				<br />
				<Knob key="test" size="LG" />
			</div>

			{/* SYNTH CONTROLS UI */}
			{/* {false && ( */}
			<div className={styles.SynthWrapper}>
				<ControlsPanel>
					<TopPanel>
						<PresetsSelector presets={presets} selectPreset={selectPreset} />
						<PowerButton isOn={isOn} togglePower={togglePower} />
					</TopPanel>

					<ControlsRow>
						{showStuff.knobs && (
							<>
								<EffectColumn label="Attack">
									<Knob key="Attack" size="XSM" />
								</EffectColumn>
								<EffectColumn label="Decay">
									<Knob key="Decay" size="XSM" />
								</EffectColumn>
								<EffectColumn label="Sustain">
									<Knob key="Sustain" size="XSM" />
								</EffectColumn>
								<EffectColumn label="Release">
									<Knob key="Release" size="XSM" />
								</EffectColumn>
							</>
						)}

						{showStuff.faders && (
							<>
								<EffectColumn label="Attack">
									<Fader size="SM" />
								</EffectColumn>
								<EffectColumn label="Decay">
									<Fader size="SM" />
								</EffectColumn>
								<EffectColumn label="Sustain">
									<Fader size="SM" />
								</EffectColumn>
								<EffectColumn label="Release">
									<Fader size="SM" />
								</EffectColumn>
							</>
						)}
					</ControlsRow>
				</ControlsPanel>
			</div>
			{/* )} */}

			{showStuff.controls && (
				<div className={styles.DemoPage_main}>
					<Fader
						val={val}
						id="volume"
						name="volume"
						label="Master"
						min={0.0}
						max={1.0}
						step={0.01}
						handleChange={handleVal}
					/>

					<Select
						id="key"
						name="key"
						val={key}
						options={keys}
						handleChange={handleKey}
						customStyles={customCSS.keys}
						disabledOptions={[]}
					/>
				</div>
			)}
		</div>
	);
};

export default DemoPage;
