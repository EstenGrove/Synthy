import {
	ReactNode,
	RefObject,
	useRef,
	useState,
	useEffect,
	useMemo,
	ReactElement,
	FC,
	CSSProperties,
} from "react";
import styles from "../../css/controls/KnotchedKnob.module.scss";

export interface IOption {
	value: string;
	element?: ReactNode | ReactElement | FC;
}

type KnobSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	label?: string;
	name?: string;
	options?: Array<IOption>;
	size?: KnobSize;
	onChange: (name: string, selection: string) => void;
};

type KnobDialProps = {
	knobRef: RefObject<HTMLDivElement>;
	size?: KnobSize;
};

const getSize = (size: KnobSize): CSSProperties => {
	switch (size) {
		case "XSM": {
			return {
				width: "4rem",
				height: "4rem",
				minWidth: "4rem",
				minHeight: "4rem",
				maxWidth: "4rem",
				maxHeight: "4rem",
			};
		}
		case "SM": {
			return {
				width: "5rem",
				height: "5rem",
				minWidth: "5rem",
				minHeight: "5rem",
				maxWidth: "5rem",
				maxHeight: "5rem",
			};
		}
		case "MD": {
			return {
				width: "6rem",
				height: "6rem",
				minWidth: "6rem",
				minHeight: "6rem",
				maxWidth: "6rem",
				maxHeight: "6rem",
			};
		}
		case "LG": {
			return {
				width: "8rem",
				height: "8rem",
				minWidth: "8rem",
				minHeight: "8rem",
				maxWidth: "8rem",
				maxHeight: "8rem",
			};
		}
		case "XLG": {
			return {
				width: "10rem",
				height: "10rem",
				minWidth: "10rem",
				minHeight: "10rem",
				maxWidth: "10rem",
				maxHeight: "10rem",
			};
		}

		default:
			return { width: "8rem", height: "8rem" };
	}
};

const KnobDial = ({ knobRef, size = "SM" }: KnobDialProps) => {
	const cssSize = getSize(size);
	return (
		<div ref={knobRef} className={styles.KnobDial} style={cssSize}>
			<div className={styles.KnobDial_handle}></div>
		</div>
	);
};

type NotchesProps = {
	options?: Array<IOption>;
	selectedNotch: string;
	selectNotch: (option: string) => void;
};

type Option = {
	isSelected: boolean;
	selectNotch: () => void;
	children?: ReactNode;
};

const Option = ({ isSelected = false, selectNotch, children }: Option) => {
	const css = {
		color: isSelected ? "var(--accent-red)" : "var(--svgNotchColor)",
	};
	return (
		<div className={styles.Option} onClick={selectNotch} style={css}>
			{children}
		</div>
	);
};

// This renders the 'option.element' component template & forwards the relevant props
const renderOption = (isSelected: boolean, option: IOption) => {
	const Element = option.element as FC<{ color?: string }>;
	// if we didn't provide a component/element template to be rendered, we fallback to the string
	if (typeof Element !== "function") return option.value;

	return (
		<Element
			color={isSelected ? "var(--accent-red)" : "var(--svgNotchColor)"}
		/>
	);
};
// check if option is currently selected in state
const isSelected = (selection: string, option: IOption) => {
	return selection === option.value;
};

const Notches = ({ selectedNotch, selectNotch, options }: NotchesProps) => {
	return (
		<div className={styles.Notches}>
			{options &&
				options.map((option: IOption, idx: number) => (
					<Option
						key={`${option.value}_${idx}`}
						isSelected={selectedNotch === option?.value}
						selectNotch={() => selectNotch(option?.value)}
					>
						{renderOption(isSelected(selectedNotch, option), option)}
					</Option>
				))}
		</div>
	);
};

/**
 * Angles ordered in the order they're rendered:
 * - Position #1: top-left (-45deg)
 * - Position #2: top-right (45deg)
 * - Position #3: bottom-left (-135deg)
 * - Position #4: bottom-right (135deg)
 */
const orderedAngles = [-45, 45, -135, 135];

interface IAnglesMap {
	[key: string]: number;
}

const mapOptionsToAngles = (options: Array<IOption>): IAnglesMap => {
	const degsMap: IAnglesMap = {};

	for (let i = 0; i < options.length; i++) {
		const option = options[i];
		const angle = orderedAngles[i];
		degsMap[option.value] = angle;
	}

	return degsMap;
};

const KnotchedKnob = ({
	size = "SM",
	name = "waveType",
	label = "Wave Type",
	options = [],
	onChange,
}: Props) => {
	const knobRef = useRef<HTMLDivElement>(null);
	// only stores the string value of the selected option
	const [selectedOption, setSelectedOption] = useState<string>(
		options?.[0]?.value
	);
	const anglesMap = mapOptionsToAngles(options);
	// grabs the related angle from our map set
	const currentAngle = useMemo(() => {
		// get angle from ordered map
		const degs = anglesMap?.[selectedOption?.toString() as keyof object];
		return degs;
	}, [anglesMap, selectedOption]);

	const selectOption = (option: string) => {
		setSelectedOption(option);
		onChange(name, option);
	};

	// rotate knob's position to match selection
	const updateKnob = (angle: number) => {
		const knob = knobRef.current as HTMLDivElement;
		knob.style.transformOrigin = "center";
		knob.style.transform = `rotate(${angle}deg)`;
	};

	// listen for 'selectedOption' changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		// update knob angle anytime the selection changes
		updateKnob(currentAngle);

		return () => {
			isMounted = false;
		};
	}, [currentAngle]);

	return (
		<div className={styles.KnotchedKnob}>
			<div className={styles.KnotchedKnob_container}>
				{/* MASK W/ 4 NOTCHES EACH CONTAINING A SINGLE OPTION */}
				<Notches
					selectNotch={selectOption}
					selectedNotch={selectedOption}
					options={options}
				/>
				{/* KNOBDIAL */}
				<KnobDial knobRef={knobRef} size={size} />
			</div>
			<div className={styles.KnotchedKnob_label}>
				<div>{label}</div>
			</div>
		</div>
	);
};

export default KnotchedKnob;
