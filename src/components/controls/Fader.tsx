import { ChangeEvent } from "react";
import styles from "../../css/controls/Fader.module.scss";
import { range } from "../../utils/utils_shared";

type Props = {
	name: string;
	id: string;
	val: string;
	list?: string;
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

const Ticks = () => {
	const tickMarks = range(0, 12);

	return (
		<div className={styles.Ticks}>
			{tickMarks &&
				tickMarks.map((tick, idx) => (
					<div key={`${tick}-${idx}`} className={styles.Ticks_tickMark}></div>
				))}
		</div>
	);
};

const Fader = ({
	name,
	id,
	val,
	handleChange,
	min = 0,
	max = 100,
	step = 1,
	size = "MD",
}: Props) => {
	const cssSize = { ...sizes[size] };
	return (
		<div className={styles.Fader} style={cssSize}>
			<div className={styles.Fader_main} style={cssSize}>
				<Ticks />
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
			</div>
		</div>
	);
};

export default Fader;
