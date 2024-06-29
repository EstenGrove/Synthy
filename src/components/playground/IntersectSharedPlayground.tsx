import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import styles from "../../css/playground/IntersectSharedPlayground.module.scss";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useWebWorker } from "../../hooks/useWebWorker";
import { useIntersectionObserverShared } from "../../hooks/useIntersectionObserverShared";

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
	isIntersecting: boolean;
};

const Item = ({ src, isIntersecting = false }: ItemProps) => {
	return (
		<div
			data-intersecting={isIntersecting}
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

const generateItemsList = (count: number = 100) => {
	const items: number[] = [];

	for (let i = 0; i <= count; i++) {
		items.push(i);
	}
	return items;
};

const List = ({ itemsCount = 100 }) => {
	const items = generateItemsList(itemsCount);

	return (
		<div>
			<ul className={styles.List}>
				{items &&
					items.map((item, idx) => (
						<li className={styles.List_item} key={`${item}-${idx}`}>
							Item #{item}
						</li>
					))}
			</ul>
		</div>
	);
};

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

const IntersectSharedPlayground = () => {
	const [imgSrcs, setImgSrcs] = useState<string[]>([...getAltSrcsList(30)]);
	const [msgOutput, setMsgOutput] = useState<string>("...loading images...");
	// observer SHARED
	const listRef = useRef<HTMLDivElement>(null);
	const observerHook = useIntersectionObserverShared(listRef, {
		settings: opts,
		onIntersect: (entry: IntersectionObserverEntry) => {
			const element = entry.target as HTMLElement;
			element.classList.add(styles.isActive);
		},
		onExit: (entry: IntersectionObserverEntry) => {
			const element = entry.target as HTMLElement;
			element.classList.remove(styles.isActive);
		},
	});

	return (
		<div className={styles.IntersectSharedPlayground}>
			<h1>Intersection Playground (Shared)</h1>
			<div className={styles.IntersectSharedPlayground_paddedArea}>
				<h4>Worker: {msgOutput}</h4>
				{/*  */}
			</div>
			<div ref={listRef} className={styles.IntersectSharedPlayground_items}>
				{imgSrcs &&
					imgSrcs.map((img, idx) => (
						<Item key={idx} src={img} isIntersecting={false} />
					))}
			</div>
		</div>
	);
};

export default IntersectSharedPlayground;
