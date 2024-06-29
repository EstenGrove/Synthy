import { useState, useEffect, RefObject, useCallback, useRef } from "react";

export interface IObserverOptions {
	root?: null;
	rootMargin?: string;
	threshold?: number;
}

export interface IEntryState {
	isIntersecting: boolean;
	entry: IntersectionObserverEntry | null;
}
export interface IHookOpts {
	settings?: IObserverOptions;
	onIntersect?: (entry: IntersectionObserverEntry) => void;
	onExit?: (entry: IntersectionObserverEntry) => void;
	observerCallback?: (entries: IntersectionObserverEntry[]) => void;
}

export interface IHookReturn {
	entry: IEntryState;
	observer: IntersectionObserver;
	addElement: (element: HTMLElement, elCallback: TElementCallback) => void;
	removeElement: (element: HTMLElement) => void;
}

// A callback that gets called for each entry being observed by the IntersectionObserver
// export type TElementCallback = (entries: IntersectionObserverEntry[]) => void;
export type TElementCallback = (isIntersecting: boolean) => void;

// A Map of our HTMLElements w/ their respective callbacks
export type TElementsMap = Map<HTMLElement, TElementCallback>;

// root: parent/ancestor that our 'target' may intersect with (null === viewport)
// rootMargin: distance from between our 'target' & our root
// threshold: the numeric value that we must exceed to trigger a valid 'intersection' occurrence
const defaultOpts: IHookOpts = {
	settings: {
		root: null,
		rootMargin: "0px",
		threshold: 0.3,
	},
};

const useParentIntersectionObserver = (
	parentRef: RefObject<HTMLElement>,
	options: IHookOpts
) => {
	const { settings = defaultOpts, observerCallback } = options;
	const {
		root = null,
		rootMargin = "0px",
		threshold = 0.5,
	} = settings as IObserverOptions;
	const observerRef = useRef<IntersectionObserver>();
	const elementsMap = useRef<TElementsMap>(new Map());
	const [entryState, setEntryState] = useState<IEntryState>({
		isIntersecting: false,
		entry: null,
	});

	// adds a single HTMLElement to be observed & tracked in our elementsMap
	const addElement = (element: HTMLElement, elCallback: TElementCallback) => {
		const map = elementsMap?.current as TElementsMap;
		const newElement = element as HTMLElement;
		const observer = observerRef?.current as IntersectionObserver;
		// add element to our map & start observe-ing
		map.set(newElement, elCallback);
		observer.observe(newElement);
	};
	// removes a single HTMLElement to be observed & tracked in our elementsMap
	const removeElement = (element: HTMLElement) => {
		const map = elementsMap?.current as TElementsMap;
		const newElement = element as HTMLElement;
		const observer = observerRef?.current as IntersectionObserver;
		// remove from map & observer list
		map.delete(newElement);
		observer.unobserve(newElement);
	};

	// our default/fallback observer callback to be used if none are provided!
	const handleIntersection = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const isInRange =
					entry?.isIntersecting && entry?.intersectionRatio >= threshold;

				if (isInRange) {
					setEntryState({
						isIntersecting: true,
						entry: entry,
					});
					// check for 'onIntersect' handler
				} else {
					setEntryState({
						isIntersecting: false,
						entry: null,
					});
					// check for 'onExit' handler
				}
			});
		},
		[threshold]
	);

	// setup observer w/ initial settings
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		// our parent node ref
		const parentEl = parentRef?.current as HTMLElement;

		if (parentEl) {
			// check if a custom callback was provided, otherwise use our default one
			const ioCallback = observerCallback
				? observerCallback
				: handleIntersection;
			const ioSettings = { root, rootMargin, threshold };
			// create our observer w/ the desired callback & settings
			const observer = new IntersectionObserver(
				ioCallback as IntersectionObserverCallback,
				ioSettings as IntersectionObserverInit
			);
			// set observer node ref
			observerRef.current = observer;
		}

		return () => {
			isMounted = false;
		};
	}, [
		handleIntersection,
		observerCallback,
		parentRef,
		root,
		rootMargin,
		threshold,
	]);

	return {
		entry: entryState,
		observer: observerRef?.current as IntersectionObserver,
		elementsMap: elementsMap?.current as TElementsMap,
		addElement: addElement,
		removeElement: removeElement,
	};
};

export { useParentIntersectionObserver };
