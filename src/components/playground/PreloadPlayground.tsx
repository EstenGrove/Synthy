import { useState, useEffect } from "react";
import styles from "../../css/playground/PreloadPlayground.module.scss";
import { useWebWorker } from "../../hooks/useWebWorker";
import Button from "../shared/Button";

const customCSS = {
	btn1: {
		backgroundColor: "red",
	},
	btn2: {
		backgroundColor: "var(--accent-green)",
	},
};

interface IMsgData {
	isDone: boolean;
	imgCount: number;
	imgSources: string[];
}

const IMG_SIZE = 200;

const envPath = new URL(import.meta.url)?.origin + "/src/";
const workerFile = new URL("./worker.ts", envPath).toString();

// images path
const imgPath = new URL(import.meta.url)?.origin + "/src/assets/images/";

const getSrcsList = (count: number): string[] => {
	const sources = [];
	for (let i = 0; i < count; i++) {
		const file = `${i}.png`;
		const filepath = imgPath.toString() + file;
		sources.push(filepath);
	}

	return sources;
};

const PreloadPlayground = () => {
	getSrcsList(180);
	const [showImages, setShowImages] = useState<boolean>(false);
	// const [imgSrcs, setImgSrcs] = useState<string[]>([...getSrcsList(180)]);
	const [imgSrcs, setImgSrcs] = useState<string[]>([]);
	// web worker hook
	const webWorker = useWebWorker<IMsgData>(workerFile, {
		onMessage: (msg: MessageEvent) => {
			console.log("Response from worker: ", msg);
			const data = msg.data as IMsgData;
			const isDone = data?.isDone ?? false;
			const imgCount = data?.imgCount ?? 0;
			const imgSources = data?.imgSources;

			if (isDone) {
				console.log(`✅ Preloaded all ${imgCount} images!`);
				setImgSrcs(imgSources);
			}
		},
	});
	const worker = webWorker.worker as Worker;

	const startPreload = () => {
		const sourcesList = getSrcsList(90);

		worker.postMessage({
			sourcesList: sourcesList,
		});
	};

	const toggleImages = () => {
		setShowImages(!showImages);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		startPreload();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.PreloadPlayground}>
			<div className={styles.PreloadPlayground_inner}>
				<Button onClick={startPreload} styles={customCSS.btn1}>
					Preload Images
				</Button>
				<Button onClick={toggleImages} styles={customCSS.btn2}>
					Show/Hide Images
				</Button>
			</div>
			<div className={styles.PreloadPlayground_images}>
				{imgSrcs &&
					showImages &&
					imgSrcs.map((src, idx) => (
						<img
							key={idx}
							src={src}
							width={IMG_SIZE}
							height={IMG_SIZE}
							className={styles.Image}
						/>
					))}
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default PreloadPlayground;
