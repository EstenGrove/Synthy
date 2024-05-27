const setCustomVar = (name: string, val: string) => {
	let newName: string = name;
	if (!newName.startsWith("--")) {
		newName = `--${newName}`;
	}
	document.documentElement.style.setProperty(newName, val);
};

const accentCustomVars = {
	red: {
		name: "--accent-red",
		value: "#ed254e",
	},
	purple: {
		name: "--accent-purple",
		value: "#7c3aed",
	},
	green: {
		name: "--accent-green",
		value: "#00e2bd",
	},
	blue: {
		name: "--accent-blue",
		value: "#009ddc",
	},
	yellow: {
		name: "--accent-yellow",
		value: "#fff07c",
	},
	brightRed: {
		name: "--accent-bright-red",
		value: "#ff0066",
	},
};

export { setCustomVar, accentCustomVars };
