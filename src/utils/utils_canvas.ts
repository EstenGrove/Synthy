import { RefObject } from "react";

interface ElBounds {
	left: number;
	top: number;
	width: number;
	height: number;
}

// calculates an elements bounds via getBoundingClientRect() & returns: left, top, width, height
const getElementBounds = (elRef: RefObject<HTMLDivElement>): ElBounds => {
	const element = elRef?.current as HTMLDivElement;
	const rect = element.getBoundingClientRect();

	return {
		left: rect.left,
		top: rect.top,
		width: rect.width,
		height: rect.height,
	};
};

interface CustomRanges {
	numMin: number;
	numMax: number;
	degMin: number;
	degMax: number;
}

const convertValueToCustomDegrees = (
	val: number,
	customRanges: CustomRanges
) => {
	const { numMin, numMax, degMin, degMax } = customRanges;
	const numRange = numMax - numMin;
	const degRange = degMax - degMin;

	const scaleFactor = degRange / numRange;
	const degs = scaleFactor * (val - numMin);
	// return scaleFactor * (x - xMin) + yMin;
	return degs;
};

// Converts radian(s) to degrees
// - Note: 1rad = ~45deg rotation of a circle (eg. 8rads = 360deg)
const radiansToDegrees = (radians: number): number => {
	return radians * (180 / Math.PI);
};

// Converts degrees to radians
const degreesToRadians = (degrees: number) => {
	return degrees * (Math.PI / 180);
};

export interface ICoords {
	x: number;
	y: number;
}

/**
 * Determines the precise distance between two sets of coordinates
 * - Uses the pythagorian theorem
 * Adapted from: https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
 * @param coords1 {ICoords} - Object of x/y values
 * @param coords2 {ICoords} - Object of x/y values
 * @returns {Number} - Returns the distance between two sets of coordinates on a graph/grid
 */
const getDistanceBetweenCoords = (
	coords1: ICoords,
	coords2: ICoords
): number => {
	const { x: x1, y: y1 } = coords1;
	const { x: x2, y: y2 } = coords2;
	// get distance between separate axes (eg. x-x, y-y) * square them
	const diffX = (x2 - x1) * (x2 - x1);
	const diffY = (y2 - y1) * (y2 - y1);
	// add squared values together for exponent
	const exponent = diffX + diffY;
	// get distance as square root
	const distance = Math.sqrt(exponent);
	return distance;
};

// Using 'Math.hypot' is ~10x slower, BUT ~3x more precise
const getDistanceBetweenCoords2 = (
	coords1: ICoords,
	coords2: ICoords
): number => {
	const { x: x1, y: y1 } = coords1;
	const { x: x2, y: y2 } = coords2;
	const diffX = x2 - x1;
	const diffY = y2 - y1;
	const distance = Math.hypot(diffX, diffY);
	return distance;
};

// [[1,2], [2,3]] => ['1,2' '2,3']
const mergeArrayOfCoords = (coords: Array<Array<number>>): string[] => {
	const arrayOfCoords: string[] = coords.map(([x, y]) => {
		return `${x},${y}`;
	});

	return arrayOfCoords;
};

// Takes an array of points/coords & merges them into a string (eg. ['1,2', '3,4'] => "1,2 3,4")
const mergeSvgPoints = (points: string[]): string => {
	return points.join(" ");
};

const saveCanvasToBlob = (filename: string, canvas: HTMLCanvasElement) => {
	canvas.toBlob((blob) => {
		const url = window.URL.createObjectURL(blob as Blob);
		saveFileFromUrl(url, filename);
	});
};

// saving/downloading a file
const saveFileFromUrl = (url: string, filename: string) => {
	const link = document.createElement("a");
	link.download = filename;
	link.href = url as string;
	link.click();
};

const saveCanvasToImage = (canvas: HTMLCanvasElement, filename: string) => {
	const srcUrl = canvas.toDataURL("image/png");
	saveFileFromUrl(srcUrl, filename);
};

export {
	// SVG Path/Point Utils
	mergeSvgPoints,
	mergeArrayOfCoords,
	// Element utils
	getElementBounds,
	convertValueToCustomDegrees,
	// calculations & utils
	getDistanceBetweenCoords,
	getDistanceBetweenCoords2,
	radiansToDegrees,
	degreesToRadians,
	// canvas saving
	saveCanvasToBlob,
	saveCanvasToImage,
};
