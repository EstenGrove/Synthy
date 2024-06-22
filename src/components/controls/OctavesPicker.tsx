import { useState, useRef, useMemo } from "react";
import styles from "../../css/controls/OctavesPicker.module.scss";
import { useKeyPress } from "../../hooks/useKeyPress";

type Props = {
	name?: string;
	octaves: string[];
	currentOctave: string;
	onSelect: (octave: string) => void;
};

type OctaveBtnProps = {
	octave: string;
	isSelected: boolean;
	selectOctave: () => void;
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

const getItemIdx = (currentOctave: string, octaves: string[]): number => {
	const currentIdx = octaves.findIndex(
		(oct) => Number(oct) === Number(currentOctave)
	);

	return currentIdx;
};

// <b>({"←  →"})</b>
const arrows = (
	<>
		<b>&lsaquo;</b> <b>&rsaquo;</b>
	</>
);

const OctavesPicker = ({ currentOctave, octaves, onSelect }: Props) => {
	const optsRef = useRef<HTMLDivElement>(null);
	const [selectedOctave, setSelectedOctave] = useState<string>(
		currentOctave ?? octaves?.[0]
	);
	// go down an octave
	useKeyPress("ArrowDown", {
		onPress: () => {
			getPrevOctave();
		},
	});
	useKeyPress("ArrowUp", {
		onPress: () => {
			getNextOctave();
		},
	});

	const selectOctave = (newOctave: string) => {
		setSelectedOctave(newOctave);

		if (onSelect) {
			onSelect(newOctave);
		}
	};

	const getNextOctave = () => {
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
	const getPrevOctave = () => {
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
			<div className={styles.OctavesPicker_label}>Octaves {arrows}</div>
			<div className={styles.OctavesPicker_inner} ref={optsRef}>
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
