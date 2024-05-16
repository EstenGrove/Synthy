import { ChangeEvent } from "react";
import styles from "../../css/controls/Slider.module.scss";

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

const Slider = ({
	name,
	id,
	val,
	label,
	handleChange,
	min = 0.0,
	max = 1.0,
	step = 0.01,
	size = "LG",
}: Props) => {
	const sizeCss = { ...sizes[size] };
	return (
		<div className={styles.Slider} style={sizeCss}>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Slider;
