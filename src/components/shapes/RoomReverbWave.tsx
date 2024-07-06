import styles from "../../css/shapes/RoomReverbWave.module.scss";
import { mergeArrayOfCoords } from "../../utils/utils_canvas";

type Props = { color?: string };

const points = [
	[20, 50],
	[50, 20],
	[80, 50],
	[50, 80],
	[20, 50],
];

const RoomReverbWave = ({ color = "var(--border)" }: Props) => {
	const linePoints = mergeArrayOfCoords(points).join(" ");
	return (
		<div className={styles.RoomReverbWave}>
			<svg
				id="room-wave"
				viewBox="0 0 100 100"
				strokeLinecap="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<polyline
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="5px"
					strokeLinecap="round"
					points={linePoints}
				/>
			</svg>
		</div>
	);
};

export default RoomReverbWave;
