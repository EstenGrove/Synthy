const preloadImage = (src: string) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		// add handlers
		img.onload = () => resolve(img);
		img.onerror = () => reject(src);

		img.src = src;
	});
};

const preloadImagesMany = (
	sourcesList: string[],
	onFulfill: (val: any) => void
) => {
	const listOfPromises = sourcesList.map((src) => Promise.resolve(src));
	for (const item of listOfPromises) {
		Promise.resolve(item).then(onFulfill);
	}
};

const IMAGES_LIST: HTMLImageElement[] = [];

const onFulfill = (src: string) => {
	const img = document.createElement("img");
	img.src = src;
	IMAGES_LIST.push(img);
	return img;
};

export { preloadImage, preloadImagesMany, onFulfill };
