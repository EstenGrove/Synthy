import React from "react";
import styles from "../css/pages/RecorderPage.module.scss";
import { PropTypes } from "prop-types";
import RecorderPlayground from "../components/playground/RecorderPlayground";
import MultiRecorderPlayground from "../components/playground/MultiRecorderPlayground";

const RecorderPage = () => {
	return (
		<div className={styles.RecorderPage}>
			<h1>Recorder Playground</h1>
			<div className={styles.RecorderPage_main}>
				{/* <RecorderPlayground /> */}
				<MultiRecorderPlayground />
			</div>
			{/*  */}
		</div>
	);
};

export default RecorderPage;
