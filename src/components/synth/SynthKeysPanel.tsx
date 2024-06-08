import React, { ReactElement, ReactNode, useState } from "react";
import styles from "../../css/synth/SynthKeysPanel.module.scss";

type Props = {
	children?: ReactNode;
};

const SynthKeysPanel = ({ children }: Props) => {
	const [isPressed, setIsPressed] = useState<boolean>(false);

	const handleMousedown = () => {
		setIsPressed(true);
	};
	const handleMouseup = () => {
		setIsPressed(false);
	};

	const withState = React.Children.map(children, (child) => {
		return React.cloneElement(child as ReactElement, {
			isPressed,
		});
	});

	return (
		<div className={styles.SynthKeysPanel}>
			<div
				className={styles.SynthKeysPanel_inner}
				onMouseDown={handleMousedown}
				onMouseUp={handleMouseup}
				onMouseEnter={handleMouseup}
				onMouseLeave={handleMouseup}
			>
				{withState}
			</div>
		</div>
	);
};

export default SynthKeysPanel;
