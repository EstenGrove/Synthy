import { ReactNode } from "react";
import styles from "../../css/command-palette/CommandPaletteItem.module.scss";
import { ICommandMenuOption } from "../../utils/utils_commandPalette";
import Kbd from "./Kbd";

type Props = {
	menuOption: ICommandMenuOption;
	onSelect: () => void;
};

const commandSymbols = {
	cmd: "⌘",
	shift: "⇧",
	option: "⌥", // (ALT)
	ctrl: "⌃", // (Control)
};

const cmdSymbol = <span id="cmd">⌘</span>;

const formatCommand = (command: string[]): string => {
	if (command?.length <= 1) return command?.[0] ?? "";

	const cmd = command.join("");
	return cmd;
};

const CommandPaletteItem = ({ menuOption, onSelect }: Props) => {
	const customEl = menuOption?.element as ReactNode;
	const command = menuOption?.command as string[];
	const kbdCommand = formatCommand(command).toUpperCase();
	console.log("kbdCommand", kbdCommand.toUpperCase());

	// return a simple string; as a fallback
	if (!menuOption?.element) {
		return <div>{menuOption?.label}</div>;
	}
	return (
		<div className={styles.CommandPaletteItem} onClick={onSelect}>
			<div className={styles.CommandPaletteItem_main}>{customEl}</div>
			<div className={styles.CommandPaletteItem_cmd}>
				{/* <Kbd command={kbdCommand} /> */}
				<Kbd command={command} />
			</div>
		</div>
	);
};

export default CommandPaletteItem;
