import { useState, ChangeEvent, DragEvent } from "react";
import styles from "../../css/image-resizer/FileDropZone.module.scss";

const dragStyles = {
	border: `2px dashed rgb(109, 40, 217)`,
};

type Props = {
	name?: string;
	id?: string;
	hasFile?: boolean;
	onFile: (e: ChangeEvent<HTMLInputElement>) => void;
	onFileDrop: (e: DragEvent<HTMLInputElement>) => void;
	onFileDragOver: (e: DragEvent<HTMLInputElement>) => void;
	multiple?: boolean;
	accept?: string;
};

const FileDropZone = ({
	name = "fileUpload",
	id = "fileUpload",
	hasFile = false,
	onFile,
	onFileDrop,
	onFileDragOver,
	accept = "image/*",
	multiple = false,
}: Props) => {
	const [isDragging, setIsDragging] = useState(false);

	// sets 'isDragging', forwards event
	const dragHandler = (e: DragEvent) => {
		setIsDragging(true);
		onFileDragOver(e as DragEvent<HTMLInputElement>);
	};

	// resets 'isDragging', forwards event
	const dropHandler = (e: DragEvent) => {
		setIsDragging(false);
		onFileDrop(e as DragEvent<HTMLInputElement>);
	};

	return (
		<div className={styles.FileDropZone} style={isDragging ? dragStyles : {}}>
			<div
				className={styles.FileDropZone_inner}
				onDragOver={dragHandler}
				onDrop={dropHandler}
			>
				<input
					type="file"
					name={name}
					id={id}
					className={styles.FileDropZone_inner_input}
					accept={accept}
					multiple={multiple}
					onChange={onFile}
				/>
				<p className={styles.FileDropZone_inner_text}>
					Select files from your computer or drag files here.
				</p>
				<label
					htmlFor={id}
					className={
						hasFile
							? styles.FileDropZone_inner_label_hasFile
							: styles.FileDropZone_inner_label
					}
				>
					{!hasFile ? "Choose a file" : `✓ File Uploaded!`}
				</label>
			</div>
		</div>
	);
};

export default FileDropZone;
