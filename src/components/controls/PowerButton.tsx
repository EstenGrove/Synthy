import sprite from "../../assets/icons/audio.svg";
import styles from "../../css/controls/PowerButton.module.scss";

type Props = {
	isOn: boolean;
	togglePower: () => void;
};

const PowerButton = ({ isOn = false, togglePower }: Props) => {
	const css = {
		opacity: isOn ? "1.0" : ".3",
	};
	return (
		<div className={styles.PowerButton}>
			<button
				data-on={isOn}
				type="button"
				onClick={togglePower}
				className={styles.PowerButton_btn}
			>
				<svg className={styles.PowerButton_btn_icon}>
					<use xlinkHref={`${sprite}#icon-power_settings_new`}></use>
				</svg>
			</button>
			<div className={styles.PowerButton_indicator} style={css}></div>
		</div>
	);
};

export default PowerButton;
