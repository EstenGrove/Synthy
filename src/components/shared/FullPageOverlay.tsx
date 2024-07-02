import { CSSProperties, MouseEvent } from "react";
import css from "../../css/shared/FullPageOverlay.module.scss";

type Props = {
	backgroundColor?: string;
	styles?: CSSProperties;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const FullPageOverlay = ({ onClick, backgroundColor, styles }: Props) => {
	const customStyles = {
		...styles,
		backgroundColor: backgroundColor,
	};

	// click handler to trigger overlay to disappear
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={css.FullPageOverlay}
			style={customStyles}
		>
			<div className={css.FullPageOverlay_inner}>
				<h1>Click Anywhere to Continue...</h1>
				<h3>Clicking will enable the Polyphonic Synthesizer for use...</h3>
			</div>
		</button>
	);
};

export default FullPageOverlay;
