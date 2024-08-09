const getImageDimensions = (imgEl: HTMLImageElement) => {
	const width = imgEl?.naturalWidth;
	const height = imgEl?.naturalHeight;

	return { width, height };
};

const createImgAndGetDimensions = (src: string) => {
	const img = new Image();
	img.src = src;

	return getImageDimensions(img);
};

export interface IDimensions {
	sx: number;
	sy: number;
	sWidth: number;
	sHeight: number;
	dx: number;
	dy: number;
	dWidth: number;
	dHeight: number;
}

const drawImageToCanvas = (
	imgSrc: CanvasImageSource,
	ctx: CanvasRenderingContext2D,
	dimensions: IDimensions
) => {
	const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = dimensions;
	// ctx.drawImage(imgSrc, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	ctx.drawImage(imgSrc, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

export interface IResizeDimensions {
	sx?: number;
	sy?: number;
	width: number;
	height: number;
}

const resizeImageToCanvas = (
	imgSrc: CanvasImageSource,
	ctx: CanvasRenderingContext2D,
	settings: IResizeDimensions
) => {
	const { sx = 0, sy = 0, width, height } = settings;
	ctx.drawImage(imgSrc, sx, sy, width, height);
};

export interface IRelativePos {
	width: number;
	height: number;
	left: number;
	right: number;
	top: number;
	bottom: number;
}

// Determines an element's dimensions relative to it's parent
const getElementRelativePosition = (
	childEl: HTMLElement,
	parentEl: HTMLElement
): IRelativePos => {
	const childRect: DOMRect = childEl.getBoundingClientRect();
	const parentRect: DOMRect = parentEl.getBoundingClientRect();

	const relativeWidth = childRect.width;
	const relativeHeight = childRect.height;
	const relativeRight = childRect.right - parentRect.right;
	const relativeBottom = childRect.bottom - parentRect.bottom;
	const relativeLeft = childRect.left - parentRect.left;
	const relativeTop = childRect.top - parentRect.top;

	return {
		width: relativeWidth,
		height: relativeHeight,
		top: relativeTop,
		left: relativeLeft,
		// not needed
		right: relativeRight,
		bottom: relativeBottom,
	};
};

const getCroppedDimensions = (
	overlayEl: HTMLDivElement,
	parentEl: HTMLDivElement
): IDimensions => {
	const relativePos = getElementRelativePosition(overlayEl, parentEl);

	const croppedDims = {
		sx: relativePos.left,
		sy: relativePos.top,
		sWidth: relativePos.width,
		sHeight: relativePos.height,
		dx: 0,
		dy: 0,
		dWidth: relativePos.width,
		dHeight: relativePos.height,
	};

	return croppedDims;
};

const drawCroppedImage = (
	destCtx: CanvasRenderingContext2D,
	srcCanvas: HTMLCanvasElement,
	dimensions: IDimensions
): void => {
	const { sx, sy, dWidth, dHeight } = dimensions;

	destCtx.drawImage(
		srcCanvas,
		sx,
		sy,
		dWidth,
		dHeight,
		sx,
		sy,
		dWidth,
		dHeight
	);
};

export {
	getImageDimensions,
	drawImageToCanvas,
	resizeImageToCanvas,
	createImgAndGetDimensions,
	// calculating cropped position/dimensions
	getElementRelativePosition,
	getCroppedDimensions,
	drawCroppedImage,
};
