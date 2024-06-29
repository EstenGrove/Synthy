import { useState, useEffect, RefObject, useCallback, useRef } from "react";

export interface IObserverOptions {
	root?: null;
	rootMargin?: string;
	threshold?: number;
}

export interface IHookOpts {
	settings?: IObserverOptions;
	onIntersect?: (entry: IntersectionObserverEntry) => void;
}

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

export interface IEntryState {
	isIntersecting: boolean;
	entry: IntersectionObserverEntry | null;
}

export interface IHookReturn {
	entry: IEntryState;
	observer: IntersectionObserver;
}

const useIntersectionObserver = (
	nodeRef: RefObject<HTMLElement>,
	options: IHookOpts = {}
): IHookReturn => {
	const { settings = defaultOpts, onIntersect } = options;
	const {
		root = null,
		rootMargin = "0px",
		threshold = 0.5,
	} = settings as IObserverOptions;
	// entry state
	const observerRef = useRef<IntersectionObserver>();
	const [entryState, setEntryState] = useState<IEntryState>({
		isIntersecting: false,
		entry: null,
	});

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
					// check for handler
					if (onIntersect) {
						onIntersect(entry);
					}
				} else {
					setEntryState({
						isIntersecting: false,
						entry: null,
					});
				}
			});
		},
		[onIntersect, threshold]
	);

	// create observer, apply handler & settings & observe target node
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		const node = nodeRef?.current as HTMLElement;

		const observer = new IntersectionObserver(handleIntersection, {
			root,
			rootMargin,
			threshold,
		});
		// set node & observe node
		observerRef.current = observer;

		observer.observe(node);

		return () => {
			isMounted = false;

			observer.unobserve(node);
		};
	}, [handleIntersection, nodeRef, root, rootMargin, threshold]);

	return {
		observer: observerRef?.current as IntersectionObserver,
		entry: entryState,
	};
};

export { useIntersectionObserver };
