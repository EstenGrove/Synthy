import React, { useEffect, useRef, useState } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/controls/ScalesPicker.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
	currentScale: string;
	onSelect: (scale: string) => void;
	scales: string[]; // UPDATE THIS TO USE AN ACTUAL CUSTOM INTERFACE???
};

type CurrentScaleProps = {
	selectedScale: string;
	openOptions: () => void;
};

const CurrentScale = ({ selectedScale, openOptions }: CurrentScaleProps) => {
	return (
		<div className={styles.CurrentScale} onClick={openOptions}>
			<div className={styles.CurrentScale_current}>{selectedScale}</div>
			<svg className={styles.CurrentScale_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
			</svg>
		</div>
	);
};

type ItemProps = {
	scale: string;
	isSelected: boolean;
	selectScale: () => void;
};

const ScaleItem = ({ scale, isSelected = false, selectScale }: ItemProps) => {
	return (
		<li
			className={
				isSelected ? `${styles.ScaleItem_isSelected}` : styles.ScaleItem
			}
			onClick={selectScale}
		>
			<div>{scale}</div>
			{isSelected && (
				<svg className={styles.ScaleItem_icon}>
					<use xlinkHref={`${sprite}#icon-check1`}></use>
				</svg>
			)}
		</li>
	);
};

type MenuProps = {
	selectedScale: string;
	scales: string[];
	closeOptions: () => void;
	selectScale: (scale: string) => void;
};

const ScalesMenu = ({
	selectedScale,
	scales,
	closeOptions,
	selectScale,
}: MenuProps) => {
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
		<div ref={menuRef} className={styles.ScalesMenu}>
			<ul className={styles.ScalesMenu_list}>
				{scales &&
					scales.map((scale, idx) => (
						<ScaleItem
							key={`${scale}-${idx}`}
							scale={scale}
							isSelected={selectedScale === scale}
							selectScale={() => selectScale(scale)}
						/>
					))}
			</ul>
		</div>
	);
};

const ScalesPicker = ({ currentScale, onSelect, scales }: Props) => {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [selectedScale, setSelectedScale] = useState<string>(
		currentScale ?? scales?.[0]
	);

	const selectScale = (scale: string) => {
		setSelectedScale(scale);
		closeMenu();

		if (onSelect) {
			onSelect(scale);
		}
	};

	const openMenu = () => {
		setShowOptions(true);
	};
	const closeMenu = () => {
		setShowOptions(false);
	};
	return (
		<div className={styles.ScalesPicker}>
			<CurrentScale selectedScale={selectedScale} openOptions={openMenu} />
			{showOptions && (
				<ScalesMenu
					scales={scales}
					selectedScale={selectedScale}
					selectScale={selectScale}
					closeOptions={closeMenu}
				/>
			)}
		</div>
	);
};

export default ScalesPicker;
