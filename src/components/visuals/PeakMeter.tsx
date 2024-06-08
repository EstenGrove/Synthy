import { useEffect, useMemo, useState } from "react";
import styles from "../../css/visuals/PeakMeter.module.scss";

const getBaseLog = (x: number, y: number) => Math.log(y) / Math.log(x);
const getDb = (val: number) => getBaseLog(10, val) * 20;
const getMaskSize = (val: number) =>
	Math.min(Math.floor((getDb(val) * 100) / -42), 100);

const ChannelLeft = ({
	minColor = "var(--border)",
	maxColor = "#fff",
	percentage,
}: ChannelProps) => {
	const percent = useMemo(() => {
		const level = {
			height: `${percentage}%`,
			backgroundImage: `linear-gradient(
			to bottom in oklch,
			${maxColor} 0%,
			${minColor} 100%
		)
		`,
		};

		return level;
	}, [percentage, minColor, maxColor]);

	return (
		<div
			data-channel-left={percentage.toString()}
			className={styles.ChannelLeft}
			style={percent}
		>
			<div className={styles.ChannelLeft_lines}></div>
		</div>
	);
};
const ChannelRight = ({
	minColor = "var(--border)",
	maxColor = "#fff",
	percentage,
}: ChannelProps) => {
	const percent = useMemo(() => {
		const level = {
			height: `${percentage}%`,
			backgroundImage: `linear-gradient(
			to bottom in oklch,
			${maxColor} 0%,
			${minColor} 100%
		)
		`,
		};

		return level;
	}, [percentage, minColor, maxColor]);

	return (
		<div
			data-channel-right={percentage.toString()}
			className={styles.ChannelRight}
			style={percent}
		>
			<div className={styles.ChannelRight_lines}></div>
		</div>
	);
};

interface Masks {
	left: number;
	right: number;
}
type ChannelProps = {
	percentage: number;
	minColor?: string;
	maxColor?: string;
};

type Props = {
	audioCtx: AudioContext;
	sourceNode: MediaElementAudioSourceNode;
};

// let meterNode: ScriptProcessorNode;

const PeakMeter = ({ audioCtx, sourceNode }: Props) => {
	const meterNode: ScriptProcessorNode = audioCtx.createScriptProcessor(
		2048,
		2,
		2
	);
	const [channelMasks, setChannelMasks] = useState<Masks>({
		left: 100,
		right: 100,
	});

	const updateMeter = (e: AudioProcessingEvent) => {
		console.log("RUNNING");
		const inputBuffer = e.inputBuffer;
		const lChannelData = inputBuffer.getChannelData(0);
		const rChannelData = inputBuffer.getChannelData(1);
		let lChannelMax = 0.0;
		let rChannelMax = 0.0;

		for (let sample = 0; sample < inputBuffer.length; sample++) {
			const lPoint = Math.abs(lChannelData[sample]);
			const rPoint = Math.abs(rChannelData[sample]);

			if (lPoint > lChannelMax) lChannelMax = lPoint;
			if (rPoint > rChannelMax) rChannelMax = rPoint;
		}
		setChannelMasks({
			left: getMaskSize(lChannelMax),
			right: getMaskSize(rChannelMax),
		});
	};

	// connects our nodes & sets our UI handler as the event handler
	const setupMeter = () => {
		if (sourceNode) {
			// meterNode = audioCtx.createScriptProcessor(2048, 2, 2);
			sourceNode.connect(meterNode);
			meterNode.connect(audioCtx.destination);
			meterNode.onaudioprocess = updateMeter;
		}
	};

	// setup meter via nodes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// connect nodes & add event handler
		if (audioCtx && sourceNode) {
			setupMeter();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.PeakMeter}>
			<div className={styles.PeakMeter_channels}>
				<ChannelLeft percentage={channelMasks.left} />
				<ChannelRight percentage={channelMasks.right} />
			</div>
		</div>
	);
};

export default PeakMeter;
