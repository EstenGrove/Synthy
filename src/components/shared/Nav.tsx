import React from "react";
import styles from "../../css/shared/Nav.module.scss";
import { NavLink } from "react-router-dom";

type Props = {};

const Nav = ({}: Props) => {
	return (
		<nav className={styles.Nav}>
			<ul className={styles.Nav_list}>
				<li className={styles.Nav_list_item}>
					<NavLink to="/">Synth</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/demo">Demo</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/module">Module(s)</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/playground">Playground</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/recorder">Recorder</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/ui">UI</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
