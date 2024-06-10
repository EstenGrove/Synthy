import React, { useState } from "react";
import styles from "../css/pages/ModulePage.module.scss";
import RackMount from "../components/visuals/RackMount";
import KnotchedKnob, { IOption } from "../components/controls/KnotchedKnob";
import Knob from "../components/controls/Knob";
import TriangleWave from "../components/shapes/TriangleWave";
import SquareWave from "../components/shapes/SquareWave";
import SineWave from "../components/shapes/SineWave";
import SawtoothWave from "../components/shapes/SawtoothWave";

const options: IOption[] = [
	{
		value: "Triangle",
		element: TriangleWave,
	},
	{
		value: "Square",
		element: SquareWave,
	},
	{
		value: "Sine",
		element: SineWave,
	},
	{
		value: "Sawtooth",
		element: SawtoothWave,
	},
];

const ModulePage = () => {
	const [waveType, setWaveType] = useState<string>("Sine");
	const [oscSettings, setOscSettings] = useState({
		freq: 440,
		lpf: 820,
		reverb: 0.5,
	});

	const handleKnob = (name: string, val: number) => {
		// do stuff
		setOscSettings({
			...oscSettings,
			[name]: val,
		});
	};
	const handleWaveType = (type: string) => {
		setWaveType(type);
	};

	return (
		<div className={styles.ModulePage}>
			<h1>Module(s) Page</h1>
			<main className={styles.ModulePage_main}>
				<RackMount title="Osc-1" subtitle="Low-Freq Oscillator">
					<KnotchedKnob options={options} onChange={handleWaveType} />
					<Knob name="freq" size="SM" label="Freq" onChange={handleKnob} />
					<Knob name="lpf" size="SM" label="LPF" onChange={handleKnob} />
					<Knob name="reverb" size="SM" label="Reverb" onChange={handleKnob} />
				</RackMount>
				<RackMount title="Osc-2" subtitle="Hi-Freq Oscillator">
					<KnotchedKnob options={options} onChange={handleWaveType} />
					<Knob name="freq2" size="SM" label="Freq" onChange={handleKnob} />
					<Knob name="hpf" size="SM" label="HPF" onChange={handleKnob} />
					<Knob name="reverb2" size="SM" label="Reverb" onChange={handleKnob} />
				</RackMount>
			</main>
		</div>
	);
};

export default ModulePage;
