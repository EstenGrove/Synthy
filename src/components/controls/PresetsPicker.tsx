import { useState, useEffect, useRef } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/controls/PresetsPicker.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useKeyPress } from "../../hooks/useKeyPress";

type Props = {
	currentPreset: string;
	presets: string[];
	onSelect: (preset: string) => void;
};

type PrevProps = {
	onClick: () => void;
};
const PrevButton = ({ onClick }: PrevProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.PrevButton}>
			<svg className={styles.PrevButton_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_left`}></use>
			</svg>
		</button>
	);
};
type NextProps = {
	onClick: () => void;
};
const NextButton = ({ onClick }: NextProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.NextButton}>
			<svg className={styles.NextButton_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
			</svg>
		</button>
	);
};

type CurrentPresetProps = {
	selectedPreset: string;
	openOptions: () => void;
};

const CurrentPreset = ({ selectedPreset, openOptions }: CurrentPresetProps) => {
	return (
		<div className={styles.CurrentPreset} onClick={openOptions}>
			<div className={styles.CurrentPreset_current}>{selectedPreset}</div>
			<svg className={styles.CurrentPreset_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
			</svg>
		</div>
	);
};

type ItemProps = {
	preset: string;
	isSelected: boolean;
	selectPreset: () => void;
};

const PresetItem = ({
	preset,
	isSelected = false,
	selectPreset,
}: ItemProps) => {
	return (
		<li
			className={
				isSelected ? `${styles.PresetItem_isSelected}` : styles.PresetItem
			}
			onClick={selectPreset}
		>
			<div>{preset}</div>
			{isSelected && (
				<svg className={styles.PresetItem_icon}>
					<use xlinkHref={`${sprite}#icon-check1`}></use>
				</svg>
			)}
		</li>
	);
};

const PresetsMenu = ({
	selectedPreset,
	presets,
	closeOptions,
	selectPreset,
}) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const isOutside = useOutsideClick(menuRef);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isOutside) {
			closeOptions();
		}

		return () => {
			isMounted = false;
		};
	}, [closeOptions, isOutside]);

	return (
		<div ref={menuRef} className={styles.PresetsMenu}>
			<ul className={styles.PresetsMenu_list}>
				{presets &&
					presets.map((preset, idx) => (
						<PresetItem
							key={`${preset}-${idx}`}
							preset={preset}
							isSelected={selectedPreset === preset}
							selectPreset={() => selectPreset(preset)}
						/>
					))}
			</ul>
		</div>
	);
};

const getCurrentIdx = (selectedPreset: string, presets: string[]): number => {
	const idx = presets.findIndex((preset) => preset === selectedPreset);

	return idx;
};

const PresetsPicker = ({ currentPreset, onSelect, presets }: Props) => {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [selectedPreset, setSelectedPreset] = useState<string>(
		currentPreset ?? presets?.[0]
	);
	// go to prev preset
	useKeyPress("ArrowLeft", {
		onPress: () => {
			getPrevPreset();
		},
	});
	// go to next preset
	useKeyPress("ArrowRight", {
		onPress: () => {
			getNextPreset();
		},
	});

	const selectPreset = (preset: string) => {
		setSelectedPreset(preset);
		closeMenu();

		if (onSelect) {
			onSelect(preset);
		}
	};

	const getPrevPreset = () => {
		const currentIdx = getCurrentIdx(selectedPreset, presets);
		const lastIdx = presets.length - 1;

		// if we're at the start, go to end
		if (currentIdx === 0) {
			const lastItem = presets[lastIdx];
			selectPreset(lastItem);
		} else {
			const prevItem = presets[currentIdx - 1];
			selectPreset(prevItem);
		}
	};

	const getNextPreset = () => {
		const currentIdx = getCurrentIdx(selectedPreset, presets);
		const lastIdx = presets.length - 1;

		// if we're at the end, go to start
		if (currentIdx === lastIdx) {
			const firstItem = presets[0];
			selectPreset(firstItem);
		} else {
			const nextItem = presets[currentIdx + 1];
			selectPreset(nextItem);
		}
	};

	const openMenu = () => {
		setShowOptions(true);
	};
	const closeMenu = () => {
		setShowOptions(false);
	};

	return (
		<div className={styles.PresetsPicker}>
			<PrevButton onClick={getPrevPreset} />
			<CurrentPreset selectedPreset={selectedPreset} openOptions={openMenu} />
			<NextButton onClick={getNextPreset} />
			{showOptions && (
				<PresetsMenu
					presets={presets}
					selectedPreset={selectedPreset}
					selectPreset={selectPreset}
					closeOptions={closeMenu}
				/>
			)}
		</div>
	);
};

export default PresetsPicker;
