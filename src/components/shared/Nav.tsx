import styles from "../../css/shared/Nav.module.scss";
import { NavLink } from "react-router-dom";

const isActive = ({ isActive }: { isActive: boolean }) => {
	if (isActive) {
		return {
			fontSize: "1.8rem",
			color: "var(--accent-bright-red)",
			textDecoration: "underline",
			transition: "all 0.3s ease-in-out",
		};
	} else {
		return {
			color: "var(--accent)",
			textDecoration: "none",
			transition: "all 0.3s ease-in-out",
		};
	}
};

const Nav = () => {
	return (
		<nav className={styles.Nav}>
			<ul className={styles.Nav_list}>
				<li className={styles.Nav_list_item}>
					<NavLink to="/" style={isActive}>
						Synth
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/demo" style={isActive}>
						Demo
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/module" style={isActive}>
						Module(s)
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/playground" style={isActive}>
						Playground
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/recorder" style={isActive}>
						Recorder
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/ui" style={isActive}>
						UI
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/preload" style={isActive}>
						Preload
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/intersect" style={isActive}>
						Intersect
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/intersect-shared" style={isActive}>
						Intersect (SHARED)
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/intersect-parent" style={isActive}>
						Intersect (Parent)
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/audio" style={isActive}>
						Audio Experiments
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/presets" style={isActive}>
						Presets
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/synthy" style={isActive}>
						Synthy
					</NavLink>
				</li>
				<li className={styles.Nav_list_item}>
					<NavLink to="/resizer" style={isActive}>
						Image Resizer
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
