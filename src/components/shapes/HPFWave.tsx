import styles from "../../css/shapes/HPFWave.module.scss";
import { mergeArrayOfCoords } from "../../utils/utils_canvas";

type Props = {
	color?: string;
};

const points = [
	// START
	[10, 70],
	[20, 20],
	// JUTS UP
	[30, 35],
	// JUTS DOWN
	[90, 35],
];

const HPFWave = ({ color = "white" }: Props) => {
	const linePoints: string = mergeArrayOfCoords(points).join(" ");
	return (
		<div className={styles.HPFWave}>
			<svg
				id="hpf-wave"
				viewBox="0 -15 100 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polyline
					fill="none"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					points={linePoints}
				/>
			</svg>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HPFWave;
