import { useRef, useMemo, CSSProperties } from "react";
import styles from "../../css/visuals/SineWave.module.scss";

/**
 * <SineWave/>:
 * - Accepts various wave settings like amplitude, frequency & phase
 * - Draw a sine wave based off it's amplitude & other settings via a <Line/> component
 */

// Component prop types
type Props = {
	amplitude?: number;
	rarity?: number;
	freq?: number;
	phase?: number;
	showAxes?: boolean;
	origin?: Origin;
	stroke?: string;
	customStyles?: CSSProperties;
};
type LineProps = {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
	stroke?: string;
};

// Data point interfaces
export interface Origin {
	x: number;
	y: number;
}
export interface SineSettings {
	amplitude: number;
	rarity: number;
	freq: number;
	phase: number;
	origin: {
		x: number;
		y: number;
	};
}
export interface IPoint {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
	index: number;
}

// origin of axes & sine wave
// - starting point for both the axes lines & the sinewave
const origin = {
	x: 100,
	y: 100,
};

const Line = ({ x1, y1, x2, y2, stroke }: LineProps) => {
	return (
		<line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			xmlns="http://www.w3.org/2000/svg"
			className={styles.Line}
			stroke={stroke}
		/>
	);
};

// generates the data points from wave settings
const generateWavePoints = (settings: SineSettings): IPoint[] => {
	const { amplitude, freq, rarity, phase, origin } = settings;

	const dataPoints: IPoint[] = [];

	for (let i = -100; i < 1000; i++) {
		// set points
		// x1/y1
		const x1: number = (i - 1) * rarity + origin.x;
		const y1: number = Math.sin(freq * (i - 1 + phase)) * amplitude + origin.y;

		// x2/y2
		const x2: number = i * rarity + origin.x;
		const y2: number = Math.sin(freq * (i + phase)) * amplitude + origin.y;

		const newPoint = { index: i, x1, x2, y1, y2 };
		dataPoints.push(newPoint);
	}

	return dataPoints;
};

const SineWave = ({
	amplitude = 20,
	rarity = 2,
	freq = 0.1,
	phase = 20,
	showAxes = false,
	origin = {
		x: 2,
		y: 125,
	},
	stroke = "var(--accent-red)",
	customStyles = {},
}: Props) => {
	const svgRef = useRef<SVGSVGElement>(null);
	// sinewave's data points
	const lineData: IPoint[] = useMemo(() => {
		const points = generateWavePoints({
			amplitude,
			freq,
			rarity,
			phase,
			origin,
		});
		return points;
	}, [amplitude, freq, phase, rarity, origin]);

	return (
		<div className={styles.SineWave} style={customStyles}>
			<svg ref={svgRef} className={styles.SineWave_svg}>
				{lineData &&
					lineData.map((point) => (
						<Line
							key={`Line-${point.index}`}
							x1={point.x1}
							x2={point.x2}
							y1={point.y1}
							y2={point.y2}
							stroke={stroke}
						/>
					))}

				{/* AXIS' FOR GRAPH */}
				{showAxes && (
					<>
						<line
							x1="100"
							y1="0"
							x2="100"
							y2="200"
							data-label="X-Axis"
							className={styles.SineWave_svg_line}
						/>
						<line
							x1="0"
							y1="100"
							x2="1000"
							y2="100"
							data-label="Y-Axis"
							className={styles.SineWave_svg_line}
						/>
					</>
				)}
			</svg>
		</div>
	);
};

export default SineWave;
