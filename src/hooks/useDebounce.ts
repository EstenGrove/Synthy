import { useRef } from "react";
import { debounce } from "../utils/utils_shared";

export type TCallback = (...args: any[]) => void;

const useDebounce = (callback: TCallback, wait: number = 100) => {
	return debounce(callback, wait);
};

export { useDebounce };
