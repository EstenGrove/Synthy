import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../css/playground/IntersectPlayground.module.scss";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useWebWorker } from "../../hooks/useWebWorker";

interface IMsgData {
	isDone: boolean;
	imgCount?: number;
	imgSources: string[];

	// data: {
	// 	[key: string]: unknown;
	// };
}

type ItemProps = {
	src: string;
};

const opts = {
	root: null,
	rootMargin: "20px",
	threshold: 0.2,
};

const Item = ({ src }: ItemProps) => {
	const elRef = useRef<HTMLDivElement>(null);
	const { entry } = useIntersectionObserver(elRef, {
		settings: opts,
		onIntersect: (entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				// console.log("Intersecting...", entry);
			}
		},
	});
	const isIntersecting = useMemo(() => {
		return entry?.isIntersecting ?? false;
	}, [entry?.isIntersecting]);

	return (
		<div
			ref={elRef}
			className={
				isIntersecting ? `${styles.Item} ${styles.isActive}` : styles.Item
			}
		>
			<img
				src={src}
				alt="Some Image"
				className={styles.Item_img}
				width={300}
				height={200}
			/>
		</div>
	);
};

const IMG_SIZE = 200;
const IMG_COUNT = 180; // max: 153 for the alt images
const ALT_IMG_COUNT = 120; // max: 153

// TOGGLE BETWEEN IMAGE VERSIONS
const USE_LARGE_IMGS = false;

const envPath: string = new URL(import.meta.url)?.origin + "/src/";
const workerFile: string = new URL("./worker.ts", envPath).toString();

// images path
const imgPath = new URL(import.meta.url)?.origin + "/src/assets/images/";

const getPaddedNumString = (idx: number): string => {
	switch (true) {
		case idx < 10: {
			return `00${idx}`;
		}
		case idx < 100: {
			return `0${idx}`;
		}
		default:
			return idx.toString();
	}
};

const getAltSrcsList = (count: number): string[] => {
	const sources: string[] = [];

	// src(s):
	// - 001_a.png, 001_b.png, (index < 10)
	// - 010_a.png, 010_b.png, (index < 100)
	// - 100_a.png, 100_b.png  (index >= 100)
	for (let i = 1; i <= count; i++) {
		const idx = i;
		const base: string = getPaddedNumString(idx);
		const nameA = `${imgPath.toString()}${base}_a.png`;
		// const nameB = `${base}_b.png`;
		sources.push(nameA);
		// sources.push(nameB);
	}

	return sources;
};

const getSrcsList = (count: number): string[] => {
	const sources = [];
	for (let i = 0; i < count; i++) {
		const name = i === 0 ? 1 : i;
		const file = `${name}.png`;
		const filepath = imgPath.toString() + file;
		sources.push(filepath);
	}

	return sources;
};

const IntersectPlayground = () => {
	const [imgSrcs, setImgSrcs] = useState<string[]>([]);
	const [msgOutput, setMsgOutput] = useState<string>("...loading images...");
	// web worker hook
	const webWorker = useWebWorker<IMsgData>(workerFile, {
		onMessage: (msg: MessageEvent) => {
			const data = msg.data as IMsgData;
			const isDone: boolean = data?.isDone ?? false;
			const imgCount: number = data?.imgCount ?? 0;
			const imgSources: string[] = data?.imgSources;

			if (isDone) {
				const text = `✅ Preloaded all ${imgCount} images!`;
				console.log(text);
				setImgSrcs(imgSources);
				setMsgOutput(text);
			}
		},
	});
	const worker = webWorker.worker as Worker;

	const startPreload = () => {
		if (USE_LARGE_IMGS) {
			const sourcesList = getAltSrcsList(ALT_IMG_COUNT);
			worker.postMessage({
				sourcesList: sourcesList,
			});
		} else {
			const sourcesList = getSrcsList(IMG_COUNT);
			worker.postMessage({
				sourcesList: sourcesList,
			});
		}
	};

	// start pre-loading onMount
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
		<div className={styles.IntersectPlayground}>
			<h1>Intersection Playground</h1>
			<div className={styles.IntersectPlayground_paddedArea}>
				<h4>Worker: {msgOutput}</h4>
				{/*  */}
			</div>
			<div className={styles.IntersectPlayground_items}>
				{imgSrcs && imgSrcs.map((img, idx) => <Item key={idx} src={img} />)}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default IntersectPlayground;
