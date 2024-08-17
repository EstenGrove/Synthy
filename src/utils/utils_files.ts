export interface ConvertOpts {
	filename: string;
	format: string;
}

const convertImageAsBinary = async (file: Blob, options: ConvertOpts) => {
	const { filename, format } = options;
	let url = "http://localhost:1234/ConvertAsBinary";
	url += "?" + new URLSearchParams({ filename, format });

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": file.type,
			},
			body: file,
		});
		console.log("request", request);
		return await request.json();
	} catch (error) {
		console.log("Error: ", error);
		return error;
	}
};
const convertImage = async (file: File, options: ConvertOpts) => {
	const { filename, format } = options;
	let url = "http://localhost:1234/ConvertImage";
	url += "?" + new URLSearchParams({ filename, format });

	const formData = new FormData();
	formData.append(filename, file);

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				// MUST OMIT THIS OTHERWISE A 'boundary=...' IS INSERTED, WHICH BREAK THE MULTI-PART PARSER'S BOUNDARY PARSING MECHANISM???
				// "Content-Type": "multipart/form-data",
			},
			body: formData,
		});
		console.log("request", request);
		// return await request.json();
		const blob = await request.blob();
		saveFile(blob, filename);
	} catch (error) {
		console.log("Error: ", error);
		return error;
	}
};

const uploadImage = async (file: File, filename: string) => {
	const url = "http://localhost:1234/UploadImage?filename=" + filename;

	const formData = new FormData();
	formData.append(filename, file);

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formData,
		});
		console.log("request", request);
		return await request.json();
	} catch (error) {
		console.log("Error: ", error);
		return error;
	}
};
const uploadFile = async (file: File, filename: string) => {
	const url = "http://localhost:1234/UploadFile?filename=" + filename;

	const formData = new FormData();
	formData.append(filename, file);

	try {
		const request = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formData,
		});
		console.log("request", request);
		return await request.json();
	} catch (error) {
		console.log("Error: ", error);
		return error;
	}
};

const downloadFromServer = async () => {
	const url = "http://localhost:1234/DownloadFile";
	const name = Date.now().toString().slice(-5);
	try {
		const req = await fetch(url);
		const blob = await req.blob();

		saveFile(blob, `Image_${name}.webp`);
	} catch (error) {
		console.log("err", error);
		return error;
	}
};

/**
 * @description - A helper for converting data into a file blob w/ a custom mimetype.
 * @param {Blob|Response Object} data - Any transformable data type that can be converted to a blob. Typically a response object or blob.
 * @param {String} mimeType - A custom mimetype used to set the new Blob instance to.
 * @returns {Blob} - returns a file blob, w/ a custom mimetype.
 */
const createBlob = (
	data: BlobPart,
	mimeType: string = "application/octet-stream"
): Blob => {
	return new Blob([data], { type: mimeType });
};

/**
 * @description - Utility that accepts a file blob and creates an object URL.
 * @param {Blob} blob - A file blob to be used for an object URL.
 */
const createURL = (blob: Blob | MediaSource) => {
	const fileURL = window.URL.createObjectURL(blob);
	return fileURL;
};

/**
 * @description - A utility for creating an object URI to trigger a file download to a user's machine.
 * @param {Blob} blob - A file blob, typically transformed from the HTTP response object
 * @param {String} filename - A custom filename used for saving the file to a user's machine.
 * @returns {Blob} - Returns a fileblob that's immediately downloaded to a user's machine.
 */
const saveFile = (blob: Blob | MediaSource, filename: string) => {
	const fileURL = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = fileURL;
	link.download = filename;
	link.click();
	return window.URL.revokeObjectURL(fileURL);
};

// Extracts the filename from the full filepath & creates a specialized cropped naming
const createFilename = (file: File | Blob): string => {
	const localBlob = file as File;
	const name = localBlob.name as string;
	const hash = Date.now().toString().slice(-4);
	return `CROPPED-${hash}-${name}`;
};

const imageToBinary = (imgFile: File) => {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onloadend = () => {
			const result = reader.result as ArrayBuffer;
			const data = result?.split(",")[1];
			const binary = atob(data);
			return resolve(binary);
		};
		reader.onerror = reject;
		return reader.readAsDataURL(imgFile);
	});
};

export {
	createBlob,
	createURL,
	saveFile,
	createFilename,
	uploadImage,
	uploadFile,
	convertImage,
	convertImageAsBinary,
	imageToBinary,
	downloadFromServer,
};
