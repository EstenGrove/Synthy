import React from "react";
import styles from "../../css/controls/KnobArc.module.scss";

type Props = {
	value: number;
	size?: ArcSize;
	bg?: string;
	color?: string;
};

type ArcSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

const getArcSize = (size: ArcSize): number => {
	const sizes = {
		XSM: 50,
		SM: 75,
		MD: 150,
		LG: 175,
		XLG: 200,
	};

	return sizes?.[size as keyof object];
};

const KnobArc = ({
	value,
	size = "SM",
	bg = "grey",
	color = "slateblue",
}: Props) => {
	const arcSize = getArcSize(size);
	return (
		<div className={styles.KnobArc}>
			<svg
				id="svgArc"
				viewBox="0 0 10 10"
				width={arcSize}
				height={arcSize}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="outer"
					className={styles.KnobArc_outer}
					d="M2 8 A 4 4 0 1 1 8 8"
					fill="none"
					strokeWidth=".7"
					stroke={bg}
					strokeLinecap="round"
				/>
				<path
					id="progress"
					className={styles.KnobArc_progress}
					d="M2 8 A 4 4 0 1 1 8 8"
					fill="none"
					strokeWidth=".7"
					stroke={color}
					strokeLinecap="round"
					strokeDasharray={`${value} 100 100`}
				/>
			</svg>
		</div>
	);
};

export default KnobArc;
