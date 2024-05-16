import React from "react";
import styles from "../../css/shared/Nav.module.scss";
import { NavLink } from "react-router-dom";

type Props = {};

const Nav = ({}: Props) => {
	return (
		<nav className={styles.Nav}>
			<ul className={styles.Nav_list}>
				<li className={styles.Nav_list_item}>
					<NavLink to="/">Synth Page</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/demo">Demo Page</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/playground">Playground Page</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
