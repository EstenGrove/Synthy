import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import styles from "../../css/playground/ParentObserverPlayground.module.scss";
// import { useWebWorker } from "../../hooks/useWebWorker";
import {
	useParentIntersectionObserver,
	IHookReturn,
} from "../../hooks/useParentIntersectionObserver";

interface IMsgData {
	isDone: boolean;
	imgCount?: number;
	imgSources: string[];

	// data: {
	// 	[key: string]: unknown;
	// };
}

const IMG_SIZE = 200;
const IMG_COUNT = 180; // max: 153 for the alt images
const ALT_IMG_COUNT = 120; // max: 153

// TOGGLE BETWEEN IMAGE VERSIONS
const USE_LARGE_IMGS = false;

// const envPath: string = new URL(import.meta.url)?.origin + "/src/";
// const workerFile: string = new URL("./worker.ts", envPath).toString();

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

const opts = {
	root: null,
	rootMargin: "20px",
	threshold: 0.6,
};

type ItemProps = {
	src: string;
	observerHook?: IHookReturn;
	// isIntersecting: boolean;
};

const Item = ({ src, observerHook }: ItemProps) => {
	const elRef = useRef<HTMLDivElement>(null);
	const [hasIntersection, setHasIntersection] = useState(false);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		// observe child element on-mount
		// if (elRef?.current) {
		// 	const element = elRef?.current as HTMLDivElement;
		// 	const observer = observerHook?.observer as IntersectionObserver;
		// 	console.log("Has observer", observer);
		// 	observerHook?.addElement(element, (isIntersecting: boolean) => {
		// 		// setHasIntersection(isIntersecting);
		// 	});
		// }

		return () => {
			isMounted = false;
			// unobserve child element on-cleanup
			// if (elRef?.current) {
			// 	const element = elRef?.current as HTMLDivElement;
			// 	observerHook?.removeElement(element);
			// }
		};
	}, [observerHook]);

	return (
		<div
			ref={elRef}
			data-intersecting={hasIntersection}
			className={
				hasIntersection ? `${styles.Item} ${styles.isActive}` : styles.Item
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

const ParentObserverPlayground = () => {
	const [imgSrcs, setImgSrcs] = useState<string[]>([...getAltSrcsList(30)]);
	const [msgOutput, setMsgOutput] = useState<string>("...loading images...");
	// observer SHARED
	const listRef = useRef<HTMLDivElement>(null);
	const observerHook = useParentIntersectionObserver(listRef, {
		settings: opts,
	});

	return (
		<div className={styles.ParentObserverPlayground}>
			<h1>Parent Intersection Playground </h1>
			<div className={styles.ParentObserverPlayground_paddedArea}>
				<h4>Worker: {msgOutput}</h4>
				{/*  */}
			</div>
			<div ref={listRef} className={styles.ParentObserverPlayground_items}>
				{imgSrcs &&
					imgSrcs.map((img, idx) => (
						<Item key={idx} src={img} observerHook={observerHook} />
					))}
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ParentObserverPlayground;
