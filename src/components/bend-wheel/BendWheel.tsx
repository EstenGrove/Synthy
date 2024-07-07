import React from "react";
import styles from "../../css/bend-wheel/BendWheel.module.scss";

type Props = {};

const BendWheel = ({}: Props) => {
	return (
		<div className={styles.BendWheel}>
			<div className={styles.BendWheel_wheel}>
				<div className={styles.BendWheel_wheel_notch}></div>
			</div>
		</div>
	);
};

export default BendWheel;
