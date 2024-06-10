import React from "react";
import styles from "../../css/external/KnobDeps.module.scss";

type Props = {};

const ComponentContainer = ({ relaInline, disabled, label, children }) => {
	return (
		<div className={styles.ComponentContainer}>
			{/*  */}
			{/*  */}
			{/*  */}
			{children}
		</div>
	);
};

export { ComponentContainer };
