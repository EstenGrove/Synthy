import { ReactNode, useMemo, useState } from "react";
import styles from "../../css/image-resizer/ImageConverter.module.scss";
import sprite from "../../assets/icons/resizer.svg";
import { useFileUpload } from "../../hooks/useFileUpload";
import {
	convertImage,
	convertImageAsBinary,
	downloadFromServer,
	imageToBinary,
	uploadImage,
} from "../../utils/utils_files";
import Button from "../shared/Button";
import FileDropZone from "./FileDropZone";
import ImageResizer from "./ImageResizer";
import CustomSelect from "../shared/CustomSelect";
import ImageResizerToolbar from "./ImageResizerToolbar";
import SettingsPanel from "./SettingsPanel";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const MAX_SIZE = 2e7; // 20Mb limit

const options: string[] = [".webp", ".jpeg", ".png", ".aviff"];

type IconBtn = {
	icon: string;
	isDisabled?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	children?: ReactNode;
};

const IconButton = ({
	icon,
	children,
	onClick,
	isDisabled = false,
}: IconBtn) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={styles.IconButton}
		>
			<svg className={styles.IconButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icon}`}></use>
			</svg>
			{children}
		</button>
	);
};

type Props = {
	width?: number | string;
	height?: number | string;
};

const ImageConverter = ({
	width = CANVAS_WIDTH,
	height = CANVAS_HEIGHT,
}: Props) => {
	const uploader = useFileUpload(MAX_SIZE);
	const { files, handleFile, handleDragOver, handleFileDrop } = uploader;
	const [format, setFormat] = useState(options[0]);
	const file: File | null = useMemo(() => {
		if (!files?.length) return null;
		return files?.[0] as File;
	}, [files]);

	const handleFormat = (item: string) => {
		setFormat(item);
	};

	const sendUpload = async () => {
		const file = files?.[0] as File;
		const { name } = file;

		const response = await convertImage(file, {
			filename: name,
			format: format,
		});
		console.log("response", response);
	};

	const downloadFile = async () => {
		const t0 = performance.now();
		const response = await downloadFromServer();
		const t1 = performance.now();
		console.log(`Elapsed: `, t1 - t0 + " ms");
		console.log("response", response);
	};

	return (
		<div className={styles.ImageConverter}>
			<div className={styles.ImageConverter_dropzone}>
				<FileDropZone
					id="fileUpload"
					name="fileUpload"
					hasFile={!!files?.length}
					onFile={handleFile}
					onFileDrop={handleFileDrop}
					onFileDragOver={handleDragOver}
					accept="image/*"
				/>
			</div>

			<div className={styles.ImageConverter_editor}>
				<div className={styles.ImageConverter_editor_main}>
					<ImageResizer width={width} height={height} file={file as File} />
				</div>
				<div className={styles.ImageConverter_editor_settings}>
					<SettingsPanel title="Editor" />
				</div>
			</div>

			<Button onClick={sendUpload}>Upload File to Server</Button>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default ImageConverter;
