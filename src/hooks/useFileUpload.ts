import { ChangeEvent, DragEvent, useState } from "react";

export type IFile = File | Blob;

export type IFiles = IFile[];

export interface IFileActions {
	onFileSelect?: (files: IFiles) => void;
	onFileDrop?: (files: IFiles) => void;
}

const getKbs = (bytes: number) => {
	return (bytes / 1024).toFixed(2);
};

const useFileUpload = (
	maxFileSize: number = 1e6,
	fileActions: IFileActions = {}
) => {
	const { onFileSelect, onFileDrop } = fileActions;

	const [fileUpload, setFileUpload] = useState<IFiles>([]);

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const file = files?.[0];
		const size = Number(file?.size);

		if (size > maxFileSize) {
			throw new Error(`Max file size exceeded: ${getKbs(maxFileSize)} Kb`);
		}

		setFileUpload(files as unknown as IFiles);

		if (onFileSelect) {
			onFileSelect(files as unknown as IFiles);
		}
	};
	const handleFileDrop = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.dataTransfer;
		const file = files?.[0];
		const size = Number(file?.size);

		if (size > maxFileSize) {
			throw new Error(`Max file size exceeded: ${getKbs(maxFileSize)} Kb`);
		}

		setFileUpload(files as unknown as IFiles);

		if (onFileDrop) {
			onFileDrop(files as unknown as IFiles);
		}
	};
	const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	return {
		files: fileUpload,
		handleFile,
		handleFileDrop,
		handleDragOver,
	};
};

export { useFileUpload };
