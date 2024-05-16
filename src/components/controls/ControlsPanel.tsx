import React from "react";
import styles from "../../css/controls/ControlsPanel.module.scss";

type Props = {
	title: string;
};

const ControlsPanel = ({ title }: Props) => {
	return (
		<div className={styles.ControlsPanel}>
			<div className={styles.ControlsPanel_top}>
				<h4 className={styles.ControlsPanel_top_title}>{title}</h4>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ControlsPanel;

ControlsPanel.defaultProps = {};

ControlsPanel.propTypes = {};
