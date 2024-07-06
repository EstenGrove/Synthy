import styles from "../../css/synth/WaveformKnob.module.scss";
import KnotchedKnob, { IOption } from "../controls/KnotchedKnob";
import TriangleWave from "../shapes/TriangleWave";
import SquareWave from "../shapes/SquareWave";
import SineWave from "../shapes/SineWave";
import SawtoothWave from "../shapes/SawtoothWave";

type KnobSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	label: string;
	name?: string;
	size?: KnobSize;
	value: string;
	onChange: (name: string, type: string) => void;
};

// <KnotchedKnob/> options list
const options: IOption[] = [
	{
		value: "Triangle",
		element: TriangleWave,
	},
	{
		value: "Square",
		element: SquareWave,
	},
	{
		value: "Sine",
		element: SineWave,
	},
	{
		value: "Sawtooth",
		element: SawtoothWave,
	},
];

const WaveformKnob = ({ label, value, name, onChange, size = "SM" }: Props) => {
	return (
		<div className={styles.WaveformKnob}>
			<KnotchedKnob
				size={size}
				name={name}
				label={label}
				// value={value}
				options={options}
				onChange={onChange}
			/>
		</div>
	);
};

export default WaveformKnob;
