import React, { useState } from "react";
import styles from "../../css/synth-panel/SynthyBlackKey.module.scss";
import { INote } from "../../utils/utils_notes";

type Props = {
	note: INote;
	isPlaying: boolean;
	// event handler wrappers
	handlePress: () => void;
	handleRelease: () => void;
	// direct event handlers
	onMouseOver: () => void;
	onMouseLeave: () => void;
	// TOUCH EVENTS
	onTouchStart: () => void;
	onTouchEnd: () => void;
	// ##TODO
	// - Add these later??
	onTouchMove?: () => void;
	onTouchCancel?: () => void;
};

const SynthyBlackKey = ({
	isPlaying = false,
	note,
	handlePress,
	handleRelease,
	onMouseOver,
	onMouseLeave,
}: Props) => {
	const { octave, label } = note;
	const [isPressed, setIsPressed] = useState<boolean>(false);

	// mousedown
	const press = () => {
		handlePress();
		setIsPressed(true);
	};
	// mouseup
	const release = () => {
		handleRelease();
		setIsPressed(false);
	};

	const enter = () => {
		if (!isPlaying) return;
		// don't play note again, if it's already pressed...
		// ...this prevents duplicate oscs for the same note
		if (isPressed) return;

		onMouseOver();
		setIsPressed(true);
	};

	const exit = () => {
		if (!isPlaying) return;

		onMouseLeave();
		setIsPressed(false);
	};
	return (
		<button
			type="button"
			data-name="key-black"
			data-note={label}
			data-octave={octave}
			data-pressed={isPressed}
			// mouse events
			onMouseDown={press}
			onMouseUp={release}
			onMouseOver={enter}
			onMouseLeave={exit}
			// touch events
			onTouchStart={press}
			onTouchEnd={release}
			// onTouchMove={enter}
			// onTouchCancel={exit}
			className={styles.SynthyBlackKey}
		>
			<div className={styles.SynthyBlackKey_label}>{label}</div>
		</button>
	);
};

export default SynthyBlackKey;
