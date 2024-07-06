import styles from "../../css/shapes/CathedralReverbWave.module.scss";
import { mergeArrayOfCoords } from "../../utils/utils_canvas";

type Props = { color?: string };

const points = [
	["M40", "10"],
	["Q-30", "60"],
	["90", "80"],
];

const CathedralReverbWave = ({ color = "var(--border)" }: Props) => {
	const linePoints = mergeArrayOfCoords(points).join(" ");
	return (
		<div className={styles.CathedralReverbWave}>
			<svg
				id="cathedral-wave"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
			>
				<path
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="5"
					d={linePoints}
				/>
			</svg>
		</div>
	);
};

export default CathedralReverbWave;
