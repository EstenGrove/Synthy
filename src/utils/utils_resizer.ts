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

export { getImageDimensions, drawImageToCanvas, createImgAndGetDimensions };
