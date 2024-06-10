import React, { ReactNode } from "react";
import styles from "../../css/visuals/RackMount.module.scss";

type Props = {
	title?: string;
	subtitle?: string;
	children?: ReactNode;
};

const palette = {
	white: "#e9e9e9",
	grey: "#bcc1b6",
	black: "#0e0e11",
	greyDark: "#3d3d3f",
	accent: "rgb(252, 211, 77)",
};

const Bolts = () => {
	return (
		<>
			<div data-bolt="1" className={styles.RackMount_inner_bolt}>
				<div data-screw="1">-|-</div>
			</div>
			<div data-bolt="2" className={styles.RackMount_inner_bolt}>
				<div data-screw="2">-|-</div>
			</div>
			<div data-bolt="3" className={styles.RackMount_inner_bolt}>
				<div data-screw="3">-|-</div>
			</div>
			<div data-bolt="4" className={styles.RackMount_inner_bolt}>
				<div data-screw="4">-|-</div>
			</div>
		</>
	);
};

type PowerProps = {
	isOn?: boolean;
	title?: string;
	subtitle?: string;
	children?: ReactNode;
};

const PowerBlock = ({ title, subtitle, isOn = false }: PowerProps) => {
	return (
		<div className={styles.PowerBlock}>
			<div className={styles.PowerBlock_labels}>
				<div className={styles.PowerBlock_labels_title}>{title}</div>
				<div className={styles.PowerBlock_labels_subtitle}>{subtitle}</div>
			</div>
			<div className={styles.PowerBlock_controls}>
				<button data-power={isOn} className={styles.PowerBlock_controls_power}>
					On
				</button>
				<div className={styles.PowerBlock_controls_light}></div>
			</div>
		</div>
	);
};
type ControlsProps = {
	children?: ReactNode;
};
const Controls = ({ children }: ControlsProps) => {
	return (
		<div className={styles.Controls}>
			<div className={styles.Controls_inner}>{children}</div>
		</div>
	);
};

const RackMount = ({
	title = "Osc-1",
	subtitle = "Low-Freq Oscillator",
	children,
}: Props) => {
	return (
		<div className={styles.RackMount}>
			<div className={styles.RackMount_inner}>
				<Bolts />
				<div className={styles.RackMount_inner_main}>
					<PowerBlock title={title} subtitle={subtitle} />
					<Controls>{children}</Controls>
				</div>
			</div>
		</div>
	);
};

export default RackMount;
