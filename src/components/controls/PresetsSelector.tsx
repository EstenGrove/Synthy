import React, { useRef, useState, useEffect, MutableRefObject } from "react";
import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/controls/PresetsSelector.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type PrevProps = {
	handlePrev: () => void;
};
const PrevButton = ({ handlePrev }: PrevProps) => {
	return (
		<button type="button" onClick={handlePrev} className={styles.PrevButton}>
			<svg className={styles.PrevButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_left`}></use>
			</svg>
		</button>
	);
};
type NextProps = {
	handleNext: () => void;
};
const NextButton = ({ handleNext }: NextProps) => {
	return (
		<button type="button" onClick={handleNext} className={styles.NextButton}>
			<svg className={styles.NextButton_icon}>
				<use xlinkHref={`${sprite}#icon-arrow_right`}></use>
			</svg>
		</button>
	);
};

type MenuProps = {
	currentPreset: string;
	options: string[];
	closeMenu: () => void;
	handlePreset: (option: string) => void;
};

const PresetsMenu = ({
	currentPreset,
	handlePreset,
	closeMenu,
	options,
}: MenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const isOutside = useOutsideClick(
		menuRef as MutableRefObject<HTMLDivElement>
	);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isOutside) {
			closeMenu();
		}

		return () => {
			isMounted = false;
		};
	}, [closeMenu, isOutside]);

	return (
		<div ref={menuRef} className={styles.PresetsMenu}>
			<ul className={styles.PresetsMenu_list}>
				{options &&
					options.map((presetOpt, idx) => (
						<PresetOption
							key={`${presetOpt}-${idx}`}
							presetOption={presetOpt}
							isSelected={presetOpt === currentPreset}
							handlePreset={() => handlePreset(presetOpt)}
						/>
					))}
			</ul>
		</div>
	);
};

type OptionProps = {
	isSelected: boolean;
	presetOption: string;
	handlePreset: () => void;
};

const PresetOption = ({
	isSelected = false,
	presetOption,
	handlePreset,
}: OptionProps) => {
	return (
		<li onClick={handlePreset} className={styles.PresetOption}>
			<div className={styles.PresetOption_selected}>
				{isSelected && (
					<svg className={styles.PresetOption_selected_icon}>
						<use xlinkHref={`${sprite}#icon-check1`}></use>
					</svg>
				)}
			</div>
			<div className={styles.PresetOption_value}>{presetOption}</div>
		</li>
	);
};

type SelectorProps = {
	currentPreset: string;
	options: string[];
	handlePreset: (option: string) => void;
};
const PresetSelector = ({
	currentPreset,
	options,
	handlePreset,
}: SelectorProps) => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<div className={styles.PresetSelector}>
			<button
				type="button"
				onClick={toggleMenu}
				className={styles.PresetSelector_btn}
			>
				<span>{!currentPreset ? "No preset" : currentPreset}</span>
				<svg className={styles.PresetSelector_btn_icon}>
					<use xlinkHref={`${sprite}#icon-expand_more`}></use>
				</svg>
			</button>

			{showMenu && (
				<PresetsMenu
					currentPreset={currentPreset}
					options={options}
					handlePreset={handlePreset}
					closeMenu={closeMenu}
				/>
			)}
		</div>
	);
};

type Props = {
	presets: string[];
	initialPreset?: string;
	selectPreset: (option: string) => void;
};
const defaultOpt = "No preset";
const PresetsSelector = ({ presets, initialPreset, selectPreset }: Props) => {
	// currentlys selected preset
	const [preset, setPreset] = useState<string>(
		!initialPreset ? defaultOpt : initialPreset
	);
	const [options, setOptions] = useState<string[]>([...presets]);

	const handlePreset = (option: string) => {
		if (option === preset) {
			setPreset("");
			selectPreset("");
		} else {
			setPreset(option);
			selectPreset(option);
		}
	};

	const handlePrev = () => {
		// find index of current preset
		const curIdx = options.findIndex((opt) => opt === preset);
		const noSelection = !preset || curIdx < 0;

		// if at start, go to end
		if (curIdx === 0) {
			const next = options[options.length - 1];
			setPreset(next);
			return selectPreset(next);
		}

		// if no selection, go to start
		if (noSelection) {
			const next = options[0];
			setPreset(next);
			selectPreset(next);
		} else {
			const next = options[curIdx - 1];
			setPreset(next);
			selectPreset(next);
		}
	};

	const handleNext = () => {
		// find index of current preset
		const curIdx = options.findIndex((opt) => opt === preset);
		const noSelection = !preset || curIdx < 0;
		const atEnd = curIdx === options.length - 1;

		// if no select or at the end, go to start
		if (noSelection || atEnd) {
			const next = options[0];
			setPreset(next);
			selectPreset(next);
		} else {
			const next = options[curIdx + 1];
			setPreset(next);
			selectPreset(next);
		}
	};

	return (
		<div className={styles.PresetsSelector}>
			<div className={styles.PresetsSelector_main}>
				<PrevButton handlePrev={handlePrev} />
				{/* LEFT ARROW */}
				<PresetSelector
					currentPreset={preset}
					options={presets}
					handlePreset={handlePreset}
				/>
				{/* BUTTON SELECTOR */}
				{/* RIGHT ARROW */}
				<NextButton handleNext={handleNext} />
			</div>
		</div>
	);
};

export default PresetsSelector;
