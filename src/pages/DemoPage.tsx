import React, { useState, ChangeEvent } from "react";
import styles from "../css/pages/DemoPage.module.scss";
import Fader from "../components/controls/Fader";

type Props = {};

const DemoPage = ({}: Props) => {
	const [val, setVal] = useState("0.5");
	const [angle, setAngle] = useState("0");

	const handleVal = (e: ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value);
	};

	const down = (e) => {};

	return (
		<div className={styles.DemoPage}>
			<h1>Demo Page</h1>
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

				<div className={styles.DemoPage_main_wrapper}>
					<div className={styles.Rect}></div>
				</div>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DemoPage;
