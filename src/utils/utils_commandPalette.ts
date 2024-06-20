import { ReactNode } from "react";

// Let's start w/ a simple text version & go from there
export interface ICommandMenuOption {
	name: string; // internal key for identifying each option
	label?: string; // public-facing text for the menu option, when no template is used???
	element?: ReactNode;
	command?: string[];
	onSelect?: (option?: ICommandMenuOption) => void;
	[key: string]: unknown;
}
