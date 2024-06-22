import { useEffect, useRef } from "react";

const prepareUrl = (path: string): URL => {
	const urlPath = new URL(path, import.meta.url);
	return urlPath;
};

const createWorker = (filePath: string, isModule: boolean = false) => {
	// if using a module, we need to resolve to the module's directory via our environment path
	if (isModule) {
		return new Worker(prepareUrl(filePath), {
			type: "module",
		});
	} else {
		return new Worker(filePath);
	}
};

type HookOpts = {
	onMessage?: (msg: MessageEvent<unknown>) => void;
	onError?: (err: ErrorEvent) => void;
	isModule?: boolean;
};

// const useWebWorker = <T extends string | number | object | symbol>(
const useWebWorker = <T>(filePath: string, options: HookOpts = {}) => {
	const { onMessage, onError, isModule } = options;
	// if using 'Vite', we need to merge the relative file path w/ our env url...
	// ...and specify the worker is a module, if defined in 'options'
	const workerRef = useRef<Worker>(createWorker(filePath, isModule));

	const sendMessage = (msg: T) => {
		const worker = workerRef.current as Worker;
		worker.postMessage(msg);
	};

	const terminateWorker = () => {
		const worker = workerRef?.current as Worker;
		worker.terminate();
	};

	// setup event handler(s) (eg. onmessage, onerror)
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (workerRef?.current) {
			const worker = workerRef.current as Worker;
			worker.onmessage = (msg: MessageEvent<T>) => {
				// check for onmessage handler
				if (onMessage) {
					onMessage(msg);
				}
			};
			worker.onerror = (err: ErrorEvent) => {
				// check for onerror handler
				if (onError) {
					onError(err);
				}
			};
		}
		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		worker: workerRef?.current as Worker,
		sendMessage: sendMessage,
		terminateWorker: terminateWorker,
	};
};

export { useWebWorker };
