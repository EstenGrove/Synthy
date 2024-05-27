const isEmptyObj = (obj: object): boolean => {
	if (!obj || Object.keys(obj)?.length <= 0) return true;
	return false;
};
const isEmptyStr = (str: string): boolean => {
	if (!str || str === "") return true;
	return false;
};

// generates a range of numbers
const range = (start: number, end: number) => {
	const rangeVals: number[] = [];

	for (let i = start; i < end; i++) {
		rangeVals.push(i);
	}

	return rangeVals;
};

export interface CRange {
	min: number;
	max: number;
}
// Accepts a value & a range & insures the value is within the range
// will return max if value is greater will return min if value is less than
const clamp = (val: number, range: CRange) => {
	const { min, max } = range;
	const clampedValue = Math.max(min, Math.min(max, val));

	return clampedValue;
};

export {
	// empty checkers
	isEmptyObj,
	isEmptyStr,
	// data utils
	range,
	clamp,
};
