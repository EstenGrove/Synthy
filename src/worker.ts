const preloadImagesMany = (
	sourcesList: string[],
	onFulfill: (val: any) => void
) => {
	const listOfPromises = sourcesList.map((src) => Promise.resolve(src));
	for (const item of listOfPromises) {
		Promise.resolve(item).then(onFulfill);
	}
};

// This is our actual pre-loader function!
const prefetchImagesMany = async (sourcesList: string[]) => {
	const images = await Promise.all(
		sourcesList.map(async (src) => {
			try {
				const request = await fetch(src);
				const blob = await request.blob();
				return URL.createObjectURL(blob);
			} catch (error) {
				console.log("error", error);
			}
		})
	);

	return images;
};

self.onmessage = async (msg) => {
	const sourcesList = msg?.data?.sourcesList as string[];
	const allImgs = await prefetchImagesMany(sourcesList);

	// then fire off response message
	postMessage({
		isDone: true,
		imgCount: sourcesList?.length,
		imgSources: allImgs,
	});
};
