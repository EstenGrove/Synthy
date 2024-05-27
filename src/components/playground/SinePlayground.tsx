import React from "react";
import styles from "../../css/playground/SinePlayground.module.scss";
import SineWave from "../visuals/SineWave";

type Props = {};

const exampleSettings = [
	{
		amplitude: 30,
		freq: 440,
		rarity: 1,
		phase: 180,
		showAxes: false,
		stroke: "var(--accent-red)",
	},
	{
		amplitude: 5,
		freq: 0.2,
		rarity: 1,
		phase: 20,
		showAxes: false,
		stroke: "var(--accent-blue)",
	},
	{
		amplitude: 90,
		freq: 80,
		rarity: 30,
		phase: 20,
		showAxes: false,
		stroke: "var(--accent-green)",
	},
	{
		amplitude: 25,
		freq: 20,
		rarity: 15,
		phase: 60,
		showAxes: false,
		stroke: "var(--accent-yellow)",
	},
	{
		amplitude: 25,
		freq: 20,
		rarity: 15,
		phase: 60,
		showAxes: true,
		stroke: "var(--accent)",
	},
	{
		amplitude: 90,
		freq: 120,
		rarity: 1,
		phase: 20,
		showAxes: true,
		stroke: "var(--accent-bright-red)",
	},
];

const SinePlayground = ({}: Props) => {
	return (
		<div className={styles.SinePlayground}>
			<div className={styles.SinePlayground_container}>
				{exampleSettings &&
					exampleSettings.map((opts, idx) => <SineWave key={idx} {...opts} />)}
			</div>
		</div>
	);
};

export default SinePlayground;
