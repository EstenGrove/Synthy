import React, { ChangeEvent, useState } from "react";
import styles from "../css/pages/PlaygroundPage.module.scss";
import Playground from "../components/playground/Playground";
import Knob from "../components/controls/Knob";
import DelayPlayground from "../components/playground/DelayPlayground";
import Fader from "../components/controls/Fader";

type Props = {};

const PlaygroundPage = ({}: Props) => {
	const [val, setVal] = useState("0.5");

	const handleVal = (e: ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value);
	};
	return (
		<div className={styles.PlaygroundPage}>
			<h1>Playground Page</h1>
			<main className={styles.PlaygroundPage_main}>
				{/* <Playground /> */}
				<DelayPlayground />
				<br />
				<br />
				<br />
				{/* <Fader
					val={val}
					id="volume"
					name="volume"
					label="Master"
					handleChange={handleVal}
				/> */}
				<Knob />
			</main>
		</div>
	);
};

export default PlaygroundPage;
