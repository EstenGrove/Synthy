import React from "react";
import styles from "../../css/modules/AddModule.module.scss";

type Props = {
	addModule: () => void;
};

const AddModule = ({ addModule }: Props) => {
	return (
		<button onClick={addModule} className={styles.AddModule}>
			<div className={styles.AddModule_label}>+ Add Module</div>
		</button>
	);
};

export default AddModule;
