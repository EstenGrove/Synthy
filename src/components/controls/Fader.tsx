import { ChangeEvent } from "react";
import styles from "../../css/controls/Fader.module.scss";

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

const generateTicksFromRange = (min: number, max: number) => {
	const ticks = [...Array(max).keys()].map((_, i) => i + min);

	return ticks;
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

const Fader = ({
	name,
	id,
	val,
	label,
	handleChange,
	min = 0,
	max = 100,
	step = 1,
	size = "LG",
}: Props) => {
	const sizeCss = { ...sizes[size] };
	return (
		<div className={styles.Fader} style={sizeCss}>
			<div className={styles.Fader_top}>
				<label htmlFor={id} className={styles.Fader_top_label}>
					{label}
				</label>
				<div className={styles.Fader_top_value}>
					{Math.floor(Number(val) * 10)}
				</div>
			</div>
			<div className={styles.Fader_main}>
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
					className={styles.Fader_main_input}
				/>
				<RightTicks />
			</div>
		</div>
	);
};

export default Fader;
