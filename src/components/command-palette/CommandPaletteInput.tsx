import { useRef, useEffect, ChangeEvent } from "react";
import sprite from "../../assets/icons/main.svg";
import styles from "../../css/command-palette/CommandPaletteInput.module.scss";

type Props = {
	searchVal: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
};

const CommandPaletteInput = ({
	searchVal,
	onChange,
	placeholder = "Search synths...",
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	// focus input on mount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (inputRef.current) {
			inputRef.current.focus();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.CommandPaletteInput}>
			<div className={styles.CommandPaletteInput_inputWrapper}>
				<svg className={styles.CommandPaletteInput_inputWrapper_searchIcon}>
					<use xlinkHref={`${sprite}#icon-search`}></use>
				</svg>
				<input
					ref={inputRef}
					type="text"
					name="commandPalette"
					id="commandPalette"
					value={searchVal}
					onChange={onChange}
					className={styles.CommandPaletteInput_inputWrapper_input}
					placeholder={placeholder}
				/>
				<kbd className={styles.CommandPaletteInput_inputWrapper_shortcut}>
					Esc
				</kbd>
			</div>
		</div>
	);
};

export default CommandPaletteInput;
