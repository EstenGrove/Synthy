import { CSSProperties, ChangeEvent } from "react";
import styles from "../../css/shared/Select.module.scss";

type Props = {
	name: string;
	id: string;
	val: string;
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	options: Array<string>;
	disabledOptions?: Array<string>;
	customStyles?: CSSProperties;
};

const isItemDisabled = (item: string, disabledList: string[]): boolean => {
	if (!disabledList || disabledList?.length <= 0) return false;
	return disabledList.includes(item);
};

const Select = ({
	id,
	name,
	val,
	label,
	options,
	handleChange,
	disabledOptions,
	customStyles,
}: Props) => {
	return (
		<div className={styles.Select} style={customStyles}>
			<label htmlFor={id} className={styles.Select_label}>
				{label}
			</label>
			<select
				id={id}
				name={name}
				value={val}
				onChange={handleChange}
				className={styles.Select_select}
			>
				{options &&
					options.map((option, idx) => (
						<option
							key={option + idx}
							value={option}
							disabled={
								disabledOptions && isItemDisabled(option, disabledOptions)
							}
							className={styles.Select_select_option}
						>
							{option}
						</option>
					))}
			</select>
		</div>
	);
};

export default Select;
