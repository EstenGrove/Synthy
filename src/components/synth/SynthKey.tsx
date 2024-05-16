import React from "react";
import { INote } from "../../utils/utils_notes";
import styles from "../../css/synth/SynthKey.module.scss";
import SynthWhiteKey from "./SynthWhiteKey";
import SynthBlackKey from "./SynthBlackKey";

type Props = {
	note: INote;
	isPlaying: boolean;
	handleKey?: () => void;
	// Handles mousedown/touchstart
	handlePress: () => void;
	// Handles mouseleave/mouseup/touchend
	handleRelease: () => void;
	// Handles mouseover/touchmove?
	handleMouseOver: () => void;
	// Handles mouseleave/touchcancel?
	handleMouseLeave: () => void;
};

const SynthKey = ({
	note,
	isPlaying,
	handlePress,
	handleRelease,
	handleMouseOver,
	handleMouseLeave,
}: Props) => {
	const { type } = note;

	return (
		<div data-key={type} className={styles.SynthKey}>
			{type === "white" && (
				<SynthWhiteKey
					note={note}
					isPlaying={isPlaying}
					handlePress={handlePress}
					handleRelease={handleRelease}
					handleMouseOver={handleMouseOver}
					handleMouseLeave={handleMouseLeave}
				/>
			)}
			{type === "black" && (
				<SynthBlackKey
					note={note}
					isPlaying={isPlaying}
					handlePress={handlePress}
					handleRelease={handleRelease}
					handleMouseOver={handleMouseOver}
					handleMouseLeave={handleMouseLeave}
				/>
			)}
		</div>
	);
};

export default SynthKey;
