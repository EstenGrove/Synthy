import React, {
	useRef,
	useState,
	useEffect,
	useMemo,
	ChangeEvent,
} from "react";
import styles from "../../css/command-palette/CommandPalette.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import CommandPaletteInput from "./CommandPaletteInput";
import { ICommandMenuOption } from "../../utils/utils_commandPalette";
import CommandPaletteMenu from "./CommandPaletteMenu";
import { useKeyPress } from "../../hooks/useKeyPress";

type Props = {
	menuOptions: ICommandMenuOption[];
	onSelect: (option: ICommandMenuOption) => void;
	closeCommandPalette: () => void;
};

// REQUIREMENTS:
// - Menu: Should show some default options before a user searches
// - Once a user searches, we immediately replace the default w/ our search results

const CommandPalette = ({
	closeCommandPalette,
	menuOptions,
	onSelect,
}: Props) => {
	const commandRef = useRef<HTMLDivElement>(null);
	const isOutside = useOutsideClick(commandRef);
	const [searchVal, setSearchVal] = useState<string>("");
	// close command menu on 'Esc' key press
	const wasPressed = useKeyPress("Escape", {
		nodeRef: commandRef,
		onPress: () => {
			// closeCommandPalette();
		},
	});

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	};

	// close on outside click
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isOutside || wasPressed) {
			closeCommandPalette();
		}

		return () => {
			isMounted = false;
		};
	}, [closeCommandPalette, isOutside, wasPressed]);

	return (
		<div ref={commandRef} className={styles.CommandPalette}>
			<div className={styles.CommandPalette_search}>
				<CommandPaletteInput searchVal={searchVal} onChange={handleSearch} />
			</div>
			<div className={styles.CommandPalette_menu}>
				<CommandPaletteMenu menuOptions={menuOptions} onSelect={onSelect} />
			</div>
			<div className={styles.CommandPalette_footer}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default CommandPalette;
