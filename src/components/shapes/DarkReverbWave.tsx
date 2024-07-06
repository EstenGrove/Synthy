import styles from "../../css/shapes/DarkReverbWave.module.scss";
import { mergeArrayOfCoords } from "../../utils/utils_canvas";

type Props = { color?: string };

const points = [
	["M4", "4"],
	["Q7", "9"],
	["10", "4"],
	["Q7", "0"],
	["4", "4"],
];

const DarkReverbWave = ({ color = "var(--border)" }: Props) => {
	const linePoints = mergeArrayOfCoords(points).join(" ");
	return (
		<div className={styles.DarkReverbWave}>
			<svg
				id="dark-wave"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="4 2 6 4.5"
			>
				<path
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="0.3px"
					d={linePoints}
				/>
			</svg>
		</div>
	);
};

export default DarkReverbWave;
