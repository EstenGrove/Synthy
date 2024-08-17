import React from "react";
import styles from "../../css/image-resizer/SettingsPanel.module.scss";

type Props = {
	title: string;
};

const SettingsPanel = ({ title = "Editin Image" }: Props) => {
	return (
		<div className={styles.SettingsPanel}>
			<div className={styles.SettingsPanel_header}>
				<h3>{title}</h3>
			</div>
			<div className={styles.SettingsPanel_inner}>
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default SettingsPanel;
