import { ChangeEvent } from "react";
import styles from "../../css/shared/RangeInput.module.scss";

type Props = {
	name: string;
	id: string;
	val: string;
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const RangeInput = ({
	name,
	id,
	val,
	label,
	handleChange,
	min = 0,
	max = 100,
	step = 1,
}: Props) => {
	return (
		<div className={styles.RangeInput}>
			<label htmlFor={id} className={styles.RangeInput_label}>
				{label}
			</label>
			<input
				type="range"
				name={name}
				id={id}
				min={min}
				max={max}
				step={step}
				value={val}
				onChange={handleChange}
				className={styles.RangeInput_input}
			/>
		</div>
	);
};

export default RangeInput;
