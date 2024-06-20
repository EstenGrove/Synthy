import React, { useRef } from "react";
import styles from "../../css/command-palette/CommandPaletteMenu.module.scss";
import { ICommandMenuOption } from "../../utils/utils_commandPalette";
import CommandPaletteItem from "./CommandPaletteItem";

type Props = {
	menuOptions: ICommandMenuOption[];
	onSelect: (option: ICommandMenuOption) => void;
};

const CommandPaletteMenu = ({ menuOptions, onSelect }: Props) => {
	return (
		<div className={styles.CommandPaletteMenu}>
			{menuOptions &&
				menuOptions.map((option, idx) => (
					<CommandPaletteItem
						key={option.name + idx}
						menuOption={option}
						onSelect={() => onSelect(option)}
					>
						<div key={option.name}>{option.label}</div>
					</CommandPaletteItem>
				))}
		</div>
	);
};

export default CommandPaletteMenu;
