import React from "react";
import { INote } from "../../utils/utils_notes";
import styles from "../../css/synth/SynthKey.module.scss";
import SynthWhiteKey from "./SynthWhiteKey";
import SynthBlackKey from "./SynthBlackKey";

type Props = {
	note: INote;
	isPlaying: boolean;
	handleKey?: () => void;
	// MOUSE EVENTS
	// Handles mousedown/touchstart
	handlePress: () => void;
	// Handles mouseleave/mouseup/touchend
	handleRelease: () => void;
	// Handles mouseover/touchmove?
	handleMouseOver: () => void;
	// Handles mouseleave/touchcancel?
	handleMouseLeave: () => void;
	// TOUCH EVENTS
	handleTouchStart: () => void;
	handleTouchMove: () => void;
	handleTouchEnd: () => void;
};

const SynthKey = ({
	note,
	isPlaying,
	// mouse events
	handlePress,
	handleRelease,
	handleMouseOver,
	handleMouseLeave,
	// touch events
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd,
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
					// touch
					handleTouchStart={handleTouchStart}
					handleTouchMove={handleTouchMove}
					handleTouchEnd={handleTouchEnd}
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
					// touch
					handleTouchStart={handleTouchStart}
					handleTouchMove={handleTouchMove}
					handleTouchEnd={handleTouchEnd}
				/>
			)}
		</div>
	);
};

export default SynthKey;
