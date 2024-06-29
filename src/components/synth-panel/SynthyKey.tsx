import React from "react";
import styles from "../../css/synth-panel/SynthyKey.module.scss";
import SynthyWhiteKey from "./SynthyWhiteKey";
import SynthyBlackKey from "./SynthyBlackKey";
import { INote } from "../../utils/utils_notes";

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
	onMouseOver: () => void;
	// Handles mouseleave/touchcancel?
	onMouseLeave: () => void;
	// TOUCH EVENTS
	onTouchStart: () => void;
	onTouchMove: () => void;
	onTouchEnd: () => void;
};

const SynthyKey = ({
	note,
	isPlaying = false, // mouse events
	handlePress,
	handleRelease,
	onMouseOver,
	onMouseLeave,
	// touch events
	onTouchStart,
	onTouchMove,
	onTouchEnd,
}: Props) => {
	const { type } = note;
	return (
		<div className={styles.SynthyKey}>
			{type === "white" && (
				<SynthyWhiteKey
					note={note}
					isPlaying={isPlaying}
					handlePress={handlePress}
					handleRelease={handleRelease}
					onMouseOver={onMouseOver}
					onMouseLeave={onMouseLeave}
					// touch
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				/>
			)}
			{type === "black" && (
				<SynthyBlackKey
					note={note}
					isPlaying={isPlaying}
					handlePress={handlePress}
					handleRelease={handleRelease}
					onMouseOver={onMouseOver}
					onMouseLeave={onMouseLeave}
					// touch
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				/>
			)}
		</div>
	);
};

export default SynthyKey;
