import { useState } from "react";
import styles from "../../css/synth-panel/SynthyWhiteKey.module.scss";
import { INote } from "../../utils/utils_notes";

type Props = {
	note: INote;
	isPlaying: boolean;
	isPressed?: boolean;
	handlePress: () => void;
	handleRelease: () => void;
	// MOUSE EVENTS
	onMouseOver: () => void;
	onMouseLeave: () => void;
	// TOUCH EVENTS
	onTouchStart: () => void;
	onTouchEnd: () => void;
	// ##TODOS:
	// - Add these later???
	onTouchMove?: () => void;
	onTouchCancel?: () => void;
};

const SynthyWhiteKey = ({
	note,
	isPlaying,
	handlePress,
	handleRelease,
	// MOUSE EVENTS
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

	// mouse over (when mouse is down)
	const enter = () => {
		if (!isPlaying) return;
		// don't play note again, if it's already pressed...
		// ...this prevents duplicate oscs for the same note
		if (isPressed) return;

		onMouseOver();
		setIsPressed(true);
	};

	// mouse leave (when mouse is NO LONGER down)
	const exit = () => {
		if (!isPlaying) return;

		onMouseLeave();
		setIsPressed(false);
	};

	return (
		<button
			type="button"
			data-name="key-white"
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
			className={styles.SynthyWhiteKey}
		>
			<div
				data-scalestart={label === "C"}
				className={styles.SynthyWhiteKey_label}
			>
				{label}
				<span>{octave}</span>
			</div>
		</button>
	);
};

export default SynthyWhiteKey;
