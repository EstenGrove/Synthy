import React from "react";
import styles from "../../css/command-palette/Kbd.module.scss";

type Props = {
	command: string[];
};

const commandSymbols = {
	cmd: "⌘",
	shift: "⇧",
	option: "⌥", // (ALT)
	ctrl: "⌃", // (Control)
};

type MetaKeyProps = {
	metaKey: string;
};

const MetaKey = ({ metaKey }: MetaKeyProps) => {
	return (
		<span className={styles.MetaKey}>
			{commandSymbols?.[metaKey as keyof object]}
		</span>
	);
};

const isMetaKey = (command: string) => {
	const specials = /[ctrl|cmd|command|shift|alt|option]/gi;
	const hasSpecial = specials.test(command);

	return hasSpecial;
};
const hasMetaKeys = (command: string[]): boolean => {
	const meta = ["shift", "control", "option", "opt", "cmd", "ctrl", "alt"];

	return command.some((key) => meta.includes(key));
};

const getMetaKeyFromCommand = (command: string) => {};

const Key = () => {
	return (
		<span className={styles.Key}>
			{/*  */}
			{/*  */}
		</span>
	);
};

const Kbd = ({ command }: Props) => {
	// if no meta/special keys, use kbd element
	if (!hasMetaKeys(command)) {
		return (
			<div className={styles.Kbd}>
				<kbd>{command}</kbd>
			</div>
		);
	}
	return (
		<div className={styles.Kbd}>
			<MetaKey metaKey={"cmd"} />
			{/* <MetaKey metaKey={command.find((key) => isMetaKey(key))} /> */}
			<span>{command.find((key) => !isMetaKey(key))?.toUpperCase()}</span>
		</div>
	);
};

export default Kbd;
