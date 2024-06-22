import React, { CSSProperties, useEffect, useRef, useState } from "react";
import sprite from "../../assets/icons/main.svg";
import cssModule from "../../css/shared/CustomSelect.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

type Props = {
	currentItem: string;
	onSelect: (Item: string) => void;
	options: string[]; // UPDATE THIS TO USE AN ACTUAL CUSTOM INTERFACE???
	styles?: CSSProperties;
};

type CurrentItemProps = {
	selectedItem: string;
	openOptions: () => void;
};

const CurrentItem = ({ selectedItem, openOptions }: CurrentItemProps) => {
	return (
		<div className={cssModule.CurrentItem} onClick={openOptions}>
			<div className={cssModule.CurrentItem_current}>{selectedItem}</div>
			<svg className={cssModule.CurrentItem_icon}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
			</svg>
		</div>
	);
};

type ItemProps = {
	item: string;
	isSelected: boolean;
	selectItem: () => void;
};

const CustomItem = ({ item, isSelected = false, selectItem }: ItemProps) => {
	return (
		<li
			className={
				isSelected ? `${cssModule.CustomItem_isSelected}` : cssModule.CustomItem
			}
			onClick={selectItem}
		>
			<div>{item}</div>
			{isSelected && (
				<svg className={cssModule.CustomItem_icon}>
					<use xlinkHref={`${sprite}#icon-check1`}></use>
				</svg>
			)}
		</li>
	);
};

type MenuProps = {
	selectedItem: string;
	options: string[];
	closeOptions: () => void;
	selectItem: (item: string) => void;
};

const CustomSelectMenu = ({
	selectedItem,
	options,
	closeOptions,
	selectItem,
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
		<div ref={menuRef} className={cssModule.CustomSelectMenu}>
			<ul className={cssModule.CustomSelectMenu_list}>
				{options &&
					options.map((item, idx) => (
						<CustomItem
							key={`${item}-${idx}`}
							item={item}
							isSelected={selectedItem === item}
							selectItem={() => selectItem(item)}
						/>
					))}
			</ul>
		</div>
	);
};

const CustomSelect = ({ currentItem, onSelect, options, styles }: Props) => {
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<string>(
		currentItem ?? options?.[0]
	);

	const selectItem = (Item: string) => {
		setSelectedItem(Item);
		closeMenu();

		if (onSelect) {
			onSelect(Item);
		}
	};

	const openMenu = () => {
		setShowOptions(true);
	};
	const closeMenu = () => {
		setShowOptions(false);
	};
	return (
		<div className={cssModule.CustomSelect} style={styles}>
			<CurrentItem selectedItem={selectedItem} openOptions={openMenu} />
			{showOptions && (
				<CustomSelectMenu
					options={options}
					selectedItem={selectedItem}
					selectItem={selectItem}
					closeOptions={closeMenu}
				/>
			)}
		</div>
	);
};

export default CustomSelect;
