import { useState } from "react";
import styles from "../../css/synth/SynthWhiteKey.module.scss";
import { INote } from "../../utils/utils_notes";

type Props = {
	note: INote;
	isPlaying: boolean;
	isPressed?: boolean;
	handlePress: () => void;
	handleRelease: () => void;
	// MOUSE EVENTS
	handleMouseOver: () => void;
	handleMouseLeave: () => void;
	// TOUCH EVENTS
	handleTouchStart: () => void;
	handleTouchMove: () => void;
	handleTouchEnd: () => void;
};

const SynthWhiteKey = ({
	note,
	isPlaying,
	handlePress,
	handleRelease,
	handleMouseOver,
	handleMouseLeave,
	// TOUCH EVENTS
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd,
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

	// mouse over (when mouse is down)
	const enter = () => {
		if (!isPlaying) return;
		// don't play note again, if it's already pressed...
		// ...this prevents duplicate oscs for the same note
		if (isPressed) return;

		handleMouseOver();
		setIsPressed(true);
	};

	// mouse leave (when mouse is NO LONGER down)
	const exit = () => {
		if (!isPlaying) return;

		handleMouseLeave();
		setIsPressed(false);
	};

	return (
		<button
			type="button"
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
			className={styles.SynthWhiteKey}
		>
			<div
				data-scalestart={label === "C"}
				className={styles.SynthWhiteKey_label}
			>
				{label}
				<span>{octave}</span>
			</div>
		</button>
	);
};

export default SynthWhiteKey;
