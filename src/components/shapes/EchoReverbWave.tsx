import styles from "../../css/shapes/EchoReverbWave.module.scss";

type Props = { color?: string };

const EchoReverbWave = ({ color = "var(--border)" }: Props) => {
	return (
		<div className={styles.EchoReverbWave}>
			<svg
				id="echo-wave"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
			>
				<path
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="5px"
					d="M10 10 C10 10, 40 60, 90 10"
				/>

				<path
					fill="var(--synthyFXWaveFill)"
					stroke={color}
					strokeWidth="5px"
					d="M90 90 C90 90, 40 40, 10 90"
				/>
			</svg>
		</div>
	);
};

export default EchoReverbWave;
