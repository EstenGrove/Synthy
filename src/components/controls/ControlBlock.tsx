import React, { ReactNode } from "react";
import styles from "../../css/controls/ControlBlock.module.scss";

type Props = {
	title: string;
	children?: ReactNode;
};

const ControlBlock = ({ title, children }: Props) => {
	return (
		<div className={styles.ControlBlock}>
			<div className={styles.ControlBlock_top}>
				<h4 className={styles.ControlBlock_top_title}>{title}</h4>
			</div>
			<div className={styles.ControlBlock_inner}>{children}</div>
		</div>
	);
};

export default ControlBlock;

ControlBlock.defaultProps = {};

ControlBlock.propTypes = {};
