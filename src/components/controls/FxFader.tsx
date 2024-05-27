import React, { ChangeEvent } from "react";
import styles from "../../css/controls/FxFader.module.scss";

type Props = {
	name: string;
	id: string;
	val: string;
	list?: string;
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	size?: SizeName;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

type SizeName = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Sizes = {
	[key in SizeName]: {
		transform: string;
	};
};

const sizes: Sizes = {
	XSM: {
		transform: "scale(0.6)",
	},
	SM: {
		transform: "scale(0.8)",
	},
	MD: {
		transform: "scale(1)",
	},
	LG: {
		transform: "scale(1.2)",
	},
	XLG: {
		transform: "scale(1.4)",
	},
};

const LeftTicks = () => {
	return (
		<div className={styles.LeftTicks}>
			<span id="tick1">-</span>
			<span id="tick2">-</span>
			<span id="tick3">-</span>
			<span id="tick4">-</span>
			<span id="tick5">-</span>
			<span id="tick6">-</span>
			<span id="tick7">-</span>
			<span id="tick8">-</span>
			<span id="tick9">-</span>
			<span id="tick10">-</span>
			<span id="tick11">-</span>
			<span id="tick12">-</span>
			<div className={styles.LeftTicks_middle}></div>
		</div>
	);
};
const RightTicks = () => {
	return (
		<div className={styles.RightTicks}>
			<span id="tick1">-</span>
			<span id="tick2">-</span>
			<span id="tick3">-</span>
			<span id="tick4">-</span>
			<span id="tick5">-</span>
			<span id="tick6">-</span>
			<span id="tick7">-</span>
			<span id="tick8">-</span>
			<span id="tick9">-</span>
			<span id="tick10">-</span>
			<span id="tick11">-</span>
			<span id="tick12">-</span>
		</div>
	);
};

const FxFader = ({
	name,
	id,
	val,
	label,
	handleChange,
	min = 0,
	max = 100,
	step = 1,
	size = "MD",
}: Props) => {
	return (
		<div className={styles.FxFader}>
			<div className={styles.FxFader_main}>
				<LeftTicks />
				<input
					type="range"
					name={name}
					id={id}
					min={min}
					max={max}
					step={step}
					value={val}
					onChange={handleChange}
					className={styles.FxFader_main_input}
				/>
				<RightTicks />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default FxFader;
