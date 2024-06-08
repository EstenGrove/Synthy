import React, { useState, useEffect, KeyboardEvent } from "react";
import styles from "../css/pages/SynthPage.module.scss";
import Synth from "../components/synth/Synth";

interface KeyInfo {
	key: string; // 'd'
	code: string; // 'KeyD'
	which: number; // 68
	keyCode: number; // 68
}

const KeyCodes = () => {
	const [keyInfo, setKeyInfo] = useState<KeyInfo>({
		key: "",
		code: "",
		which: 0,
		keyCode: 0,
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		console.log("e", e);
		const { code, key, keyCode, which } = e;
		setKeyInfo({
			key,
			code,
			which,
			keyCode,
		});
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		// window.addEventListener("keydown", handleKeyDown);
		// window.addEventListener("keyup", handleKeyUp);

		return () => {
			isMounted = false;
			// window.removeEventListener("keydown", handleKeyDown);
			// window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<div className={styles.KeyCodes}>
			<h3 className={styles.KeyCodes_title}>Current Key Info:</h3>
			{Object.keys(keyInfo).map((key, idx) => (
				<div key={idx} className={styles.KeyCodes_info}>
					{key}: {keyInfo[key as keyof object]}
				</div>
			))}
		</div>
	);
};

const SynthPage = ({}: Props) => {
	return (
		<div className={styles.SynthPage}>
			<h1>Synth Page</h1>
			<main className={styles.SynthPage_main}>
				<Synth />
			</main>
			<KeyCodes />
		</div>
	);
};

export default SynthPage;
