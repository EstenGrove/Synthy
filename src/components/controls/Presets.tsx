import { ChangeEvent } from "react";
import styles from "../../css/controls/Presets.module.scss";
import Select from "../shared/Select";

type Props = {
	currentPreset: string;
	presets: string[];
	selectPreset: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const customCSS = {
	select: {
		width: "15rem",

		height: "2.5rem",
	},
};

const Presets = ({ currentPreset, selectPreset, presets }: Props) => {
	return (
		<div className={styles.Presets}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Presets;
