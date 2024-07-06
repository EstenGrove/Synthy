import {
	FC,
	MutableRefObject,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import styles from "../../css/controls/EffectDropdown.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { debounce } from "../../utils/utils_shared";

export interface IDropdownOption {
	value: string;
	element?: FC | ReactNode;
}

type Props = {
	name: string;
	label: string;
	options: IDropdownOption[];
	onChange: (name: string, option: string) => void;
};

type OptionsMenuProps = {
	selectedOption: string;
	options: IDropdownOption[];
	selectOption: (optionVal: string) => void;
	closeMenu: () => void;
};
type OptionItem = {
	isSelected: boolean;
	option: IDropdownOption;
	selectOption: () => void;
};

const renderOption = (option: IDropdownOption, isSelected: boolean) => {
	const Element = option.element as FC<{ color?: string }>;
	// if we didn't provide a component/element template to be rendered, we fallback to the string
	if (typeof Element !== "function") return option.value;

	const color = isSelected
		? "var(--synthyFXWaveActiveColor)"
		: "var(--synthyFXWaveColor)";

	return <Element color={color} />;
};

const OptionItem = ({
	option,
	isSelected = false,
	selectOption,
}: OptionItem) => {
	return (
		<li className={styles.OptionItem} onClick={selectOption}>
			{renderOption(option, isSelected)}
		</li>
	);
};

const OptionsMenu = ({
	options,
	closeMenu,
	selectOption,
	selectedOption,
}: OptionsMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const isOutside = useOutsideClick(
		menuRef as MutableRefObject<HTMLDivElement>
	);

	// close menu on outside click
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
		<div ref={menuRef} className={styles.OptionsMenu}>
			<ul className={styles.OptionsMenu_list}>
				{options &&
					options.map((option, idx) => (
						<OptionItem
							key={`${option.value}-${idx}`}
							option={option}
							isSelected={selectedOption === option.value}
							selectOption={() => selectOption(option.value)}
						/>
					))}
			</ul>
		</div>
	);
};

const renderSelectedOption = (
	selection: string,
	options: IDropdownOption[]
) => {
	const selectedOption = options.find(
		(option) => option.value === selection
	) as IDropdownOption;

	if (!selectedOption) {
		return "";
	}

	return renderOption(selectedOption, true);
};

const EffectDropdown = ({ name, label, onChange, options = [] }: Props) => {
	const [shouldShowValue, setShouldShowValue] = useState<boolean>(false);
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [selection, setSelection] = useState<string>(options?.[0]?.value);

	const openOptions = () => {
		setShowOptions(true);
	};
	const closeOptions = () => {
		setShowOptions(false);
	};

	const handleSelection = (option: string) => {
		setSelection(option);
		closeOptions();
		if (onChange) {
			onChange(name, option);
		}
	};

	const showValue = () => {
		setShouldShowValue(true);
	};
	const hideValue = () => {
		setShouldShowValue(false);
	};

	return (
		<div className={styles.EffectDropdown}>
			<div
				className={styles.EffectDropdown_wrapper}
				onMouseOver={debounce(showValue, 50)}
				onMouseLeave={debounce(hideValue, 50)}
			>
				<button
					type="button"
					onClick={openOptions}
					className={styles.EffectDropdown_wrapper_button}
				>
					{renderSelectedOption(selection, options)}
				</button>
				<div className={styles.EffectDropdown_wrapper_label}>
					{!shouldShowValue && label}
					{shouldShowValue && selection}
				</div>
			</div>

			{showOptions && (
				<OptionsMenu
					options={options}
					closeMenu={closeOptions}
					selectedOption={selection}
					selectOption={handleSelection}
				/>
			)}
		</div>
	);
};

export default EffectDropdown;
