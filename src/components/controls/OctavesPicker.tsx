import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import styles from "../../css/controls/OctavesPicker.module.scss";
import { useKeyPress } from "../../hooks/useKeyPress";

type Props = {
	octaves: number[];
	onChange: (octave: number) => void;
};

type OctaveBtnProps = {
	octave: number;
	isSelected: boolean;
	selectOctave: () => void;
	// selectOctave: (octave: number) => void;
};

const OctaveButton = ({
	selectOctave,
	octave,
	isSelected = false,
}: OctaveBtnProps) => {
	const cssStyles = useMemo(() => {
		return isSelected
			? `${styles.OctaveButton} ${styles.isActive}`
			: styles.OctaveButton;
	}, [isSelected]);

	return (
		<button
			type="button"
			data-octave={octave}
			onClick={selectOctave}
			className={cssStyles}
		></button>
	);
};

const getItemIdx = (currentOctave: number, octaves: number[]): number => {
	const currentIdx = octaves.findIndex((oct) => oct === currentOctave);

	return currentIdx;
};

const OctavesPicker = ({ octaves, onChange }: Props) => {
	const elRef = useRef<HTMLDivElement>(null);
	const [currentOctave, setCurrentOctave] = useState<number>(octaves[0]);
	// go down an octave
	useKeyPress("ArrowLeft", elRef, () => {
		return getPrev();
	});
	// go up an octave
	useKeyPress("ArrowRight", elRef, () => {
		return getNext();
	});

	const selectOctave = (newOctave: number) => {
		setCurrentOctave(newOctave);

		if (onChange) {
			onChange(newOctave);
		}
	};

	const getNext = () => {
		const currentIdx: number = getItemIdx(currentOctave, octaves);
		const lastIdx = octaves.length - 1;

		// if at the end, go to the start
		if (currentIdx === lastIdx) {
			const nextItem = octaves[0];
			selectOctave(nextItem);
		} else {
			const nextItem = octaves[currentIdx + 1];
			selectOctave(nextItem);
		}
	};
	const getPrev = () => {
		const currentIdx: number = getItemIdx(currentOctave, octaves);
		const firstIdx = 0;

		// if at the start, go to the end
		if (currentIdx === firstIdx) {
			const prevItem = octaves[octaves.length - 1];
			selectOctave(prevItem);
		} else {
			const prevItem = octaves[currentIdx - 1];
			selectOctave(prevItem);
		}
	};

	return (
		<div className={styles.OctavesPicker}>
			<div className={styles.OctavesPicker_label}>
				Octaves <b>({"←  →"})</b>
			</div>
			<div className={styles.OctavesPicker_inner} ref={elRef}>
				{octaves &&
					octaves.map((octave, idx) => (
						<OctaveButton
							octave={octave}
							key={`${octave}-${idx}`}
							isSelected={currentOctave === octave}
							selectOctave={() => selectOctave(octave)}
						/>
					))}
			</div>
		</div>
	);
};

export default OctavesPicker;
