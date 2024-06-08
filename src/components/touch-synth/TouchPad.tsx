import React, { MouseEvent, RefObject, UIEvent } from "react";
import styles from "../../css/touch-synth/TouchPad.module.scss";

type Props = {
	padRef: RefObject<HTMLDivElement>;
	handleMouseDown: (e: MouseEvent) => void;
	handleMouseMove?: (e: MouseEvent) => void;
	handleMouseUp: (e: MouseEvent) => void;
	// touch events
	handleTouchStart: (e: UIEvent) => void;
	handleTouchMove?: (e: UIEvent) => void;
	handleTouchEnd: (e: UIEvent) => void;
};

const TouchPad = ({
	padRef,
	// mouse
	handleMouseDown,
	handleMouseUp,
	handleMouseMove,
	// touch
	handleTouchStart,
	handleTouchEnd,
	handleTouchMove,
}: Props) => {
	return (
		<div
			ref={padRef}
			// MOUSE EVENTS //
			onMouseUp={handleMouseUp}
			onMouseDown={handleMouseDown}
			// onMouseMove={handleMouseMove}
			// TOUCH EVENTS //
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			// onTouchMove={handleTouchMove}
			className={styles.TouchPad}
		>
			<div className={styles.TouchPad_pad}>
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default TouchPad;
