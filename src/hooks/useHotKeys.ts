import { useEffect, useRef, useState } from "react";

/**
 * We want to handle meta-type keys differently as *most* will have their own property on the event object
 * - Eg. We read from the event.ctrlKey boolean for the 'Control' key
 * - For anything NOT inside this 'specialKeysMap' we fall back to the 'key' property
 */
const specialKeysMap: object = {
	// standard versions
	Control: "ctrlKey",
	Ctrl: "ctrlKey",
	Shift: "shiftKey",
	Tab: "code",
	Alt: "altKey",
	Command: "metaKey",
	// upper-case versions
	CONTROL: "ctrlKey",
	CTRL: "ctrlKey",
	SHIFT: "shiftKey",
	TAB: "code",
	ALT: "altKey",
	CMD: "metaKey",
	COMMAND: "metaKey",
	// lower-case versions
	control: "ctrlKey",
	ctrl: "ctrlKey",
	shift: "shiftKey",
	tab: "code",
	alt: "altKey",
	cmd: "metaKey",
};

/**
 * Some keys do NOT have a direct translation within the 'event.key' property so we must translate them to know what to check for
 */
const keyTranslations: object = {
	Up: "ArrowUp",
	Down: "ArrowDown",
	Left: "ArrowLeft",
	Right: "ArrowRight",
	// lower-case versions
	up: "ArrowUp",
	down: "ArrowDown",
	left: "ArrowLeft",
	right: "ArrowRight",
	// upper-case versions
	UP: "ArrowUp",
	DOWN: "ArrowDown",
	LEFT: "ArrowLeft",
	RIGHT: "ArrowRight",
};

/**
 * 'blacklist': a list of element types to be exempted from the event listener
 * - Eg. we don't want to fire the keyboard shortcut code when a user is typing in an input or textarea...
 * ...since this will cause the focus to jump out of the input element & that shit sucks!
 */
const blacklist = ["INPUT", "TEXTAREA", "SELECT"];

/**
 * Determines what property/field on the event object to read from.
 * @param keyFromList {string[]} - An array of keyboard keys as strings (eg. 'Control', '+' ',', 't' etc)
 * @returns {string} - Returns the property on the event object we should read from for the given 'key'
 */
const getKeyField = (keyFromList: string): string => {
	const specialKeys = Object.keys(specialKeysMap);
	if (specialKeys.includes(keyFromList)) {
		return specialKeysMap[keyFromList as keyof object];
	} else {
		return "key";
	}
};

// some keys have special codes are used as the value for 'event.key' so we need to translate what we lookup/listen for
const getTranslatedKeys = (keysList: string[]): string[] => {
	const translations: string[] = Object.keys(keyTranslations);
	const translatedKeys: string[] = [];

	for (let i = 0; i < keysList.length; i++) {
		const userKey = keysList[i];
		const needsTranslate = translations.includes(userKey);
		if (needsTranslate) {
			const translated = keyTranslations[userKey as keyof object];
			translatedKeys.push(translated);
		} else {
			translatedKeys.push(userKey);
		}
	}

	return translatedKeys;
};

type THotKeysReturn = boolean;

/**
 * @interface IHotKeysHook
 * @param keysList {string[]} - An array of keyboard keys (eg. 'Control', 'L', ',' etc) to listen for.
 * @param onPress {Function|null} - An optional callback function to fire when combo is pressed
 */
interface IHotKeysHook {
	(
		targetKeys: string[],
		onPress?: ((e: KeyboardEvent) => void) | null
	): THotKeysReturn;
}

// ctrl+z instead of ['Control', 'z']
const useHotKeys: IHotKeysHook = (targetKeys, onPress = null): boolean => {
	const [wasPressed, setWasPressed] = useState<boolean>(false);
	const isKeyCombo = useRef<boolean>(targetKeys.length > 1);
	// translates keys, if needed
	const keysList = useRef<string[]>(getTranslatedKeys(targetKeys));

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		const keydownHandler = (e: KeyboardEvent) => {
			// typescript requires this explicit definition
			const target = e.target as HTMLElement;

			// if event is inside blacklisted elements (eg. input or textarea)
			if (blacklist.includes(target.tagName as keyof KeyboardEvent["target"])) {
				return;
			}

			// if 'keysList' contains multiple different keys...
			if (isKeyCombo) {
				const allPressed = keysList.current.every((key) => {
					const field = getKeyField(key) as keyof KeyboardEvent;

					const isPressed =
						typeof e[field] === "string" ? e[field] === key : e[field];

					return isPressed;
				});
				// We only want to override browser defaults IF the key combo matches
				// ...otherwise let all other browser defaults proceeed as normal
				if (allPressed) {
					e.preventDefault();
				}
				setWasPressed(allPressed);
				return allPressed && onPress ? onPress(e) : allPressed;
			} else {
				// handle single key requirement
				const target = keysList.current[0];
				const pressed = e.key === target;
				// We only want to override browser defaults IF the key combo matches
				// ...otherwise let all other browser defaults proceeed as normal
				if (pressed) {
					e.preventDefault();
				}
				setWasPressed(pressed);
				return pressed && onPress ? onPress(e) : pressed;
			}
		};

		window.addEventListener("keydown", keydownHandler, {
			// passive: true,
			// capture: true,
		});
		return () => {
			isMounted = false;
			window.removeEventListener("keydown", keydownHandler);
		};
	}, [keysList, onPress]);

	return wasPressed;
};

export { useHotKeys };
