import { useRef, useState, RefObject } from "react";
import styles from "../../css/controls/AltKnob.module.scss";
import { clamp } from "../../utils/utils_shared";

type Props = {
	min?: number;
	max?: number;
};

type KnobProps = {
	knobRef: RefObject<HTMLDivElement>;
	onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
};
type LabelProps = {
	label: string;
};

const Label = ({ label }: LabelProps) => {
	return <div className={styles.Label}>{label}</div>;
};

const Knob = ({ knobRef, onMouseDown }: KnobProps) => {
	return (
		<div ref={knobRef} className={styles.Knob} onMouseDown={onMouseDown}>
			<div className={styles.Knob_handle}></div>
		</div>
	);
};

let lastY: number = 0;
let lastAngle: number = 0;

const AltKnob = ({ min = 30, max = 330 }: Props) => {
	const isDragging = useRef<boolean>(false);
	const knobRef = useRef<HTMLDivElement>(null);
	const [angle, setAngle] = useState<number>(lastAngle);

	const handleUpdate = (newY: number) => {
		// We get the max rotation range by performing a diff & dividing by 2
		// ...this gives us a range: -150 to 150 for instance
		const maxRotate = (max - min) / 2;
		const angleDiff = angle - (newY - lastY);
		const newDegs = clamp(angleDiff, { min: -maxRotate, max: maxRotate });
		setAngle(newDegs);
		updateKnob(newDegs);
		lastAngle = newDegs;
	};

	const mouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		isDragging.current = true;
		lastY = e.clientY;
		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
	};

	const mouseMove = (e: MouseEvent) => {
		handleUpdate(e.clientY);
	};
	const mouseUp = (e: MouseEvent) => {
		isDragging.current = false;
		const newY = lastY - e.clientY;

		lastY = clamp(newY, { min, max });
		document.removeEventListener("mousemove", mouseMove);
		document.removeEventListener("mouseup", mouseUp);
	};

	const updateKnob = (newAngle: number) => {
		const knob = knobRef.current as HTMLDivElement;
		knob.style.transformOrigin = `center`;
		knob.style.transform = `rotate(${newAngle}deg)`;
	};

	return (
		<div className={styles.AltKnob}>
			<div className={styles.AltKnob_wrapper}>
				<Knob knobRef={knobRef} onMouseDown={mouseDown} />
			</div>
			<Label label="Gain" />
		</div>
	);
};

export default AltKnob;
