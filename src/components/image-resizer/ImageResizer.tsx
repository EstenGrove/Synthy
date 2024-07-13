import {
	useState,
	useRef,
	DragEvent,
	ChangeEvent,
	useMemo,
	ReactNode,
} from "react";
import styles from "../../css/image-resizer/ImageResizer.module.scss";
import sprite from "../../assets/icons/resizer.svg";
import ImageStaticPreview from "./ImageStaticPreview";
import FileDropZone from "./FileDropZone";
import { createURL } from "../../utils/utils_files";
import ImageResizerGrid from "./ImageResizerGrid";
import ImageResizerOverlay from "./ImageResizerOverlay";
import ImageResizerOutputPreview from "./ImageResizerOutputPreview";
import {
	createImgAndGetDimensions,
	drawImageToCanvas,
	getImageDimensions,
} from "../../utils/utils_resizer";

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

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

const ImageResizer = () => {
	const imgRef = useRef<HTMLImageElement>(null);
	// ref to our container that dictates the size of the resulting image
	const overlayRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [userFile, setUserFile] = useState<File>();
	const userFileUrl: string = useMemo(() => {
		// const blob = createBlob(userFile)
		if (!userFile) return "";
		const url = createURL(userFile as Blob);
		return url;
	}, [userFile]);
	const [resizedImg, setResizedImg] = useState<HTMLImageElement>();

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setUserFile(file);
	};
	const handleFileDrop = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.dataTransfer;
		const file = files?.[0];
		setUserFile(file);
	};
	const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const updateOutputPreview = () => {
		// origin image
		const img = imgRef.current as HTMLImageElement;
		const originDims = createImgAndGetDimensions(userFileUrl);
		const {
			left: originLeft,
			top: originTop,
			right: originRight,
			bottom: originBottom,
			width: originWidth,
			height: originHeight,
		} = img.getBoundingClientRect();
		// resized image
		const overlay = overlayRef?.current as HTMLDivElement;
		const overlayRect = overlay.getBoundingClientRect();

		const { top, left, right, bottom, width, height } = overlayRect;

		// TOP & LEFT ARE CORRECT //
		// !!!! DO NOT TOUCH THESE !!!! //
		const newLeft = originLeft - left;
		const newTop = originTop - top;

		const newWidth = newLeft - width;
		const newHeight = newTop - height;

		console.group("DRAW");
		console.log("OVERLAY DIMS: ", { width, height, top, left });
		console.log("Width: ", newWidth);
		console.log("Height: ", newHeight);
		console.groupEnd();

		const dimensions = {
			sx: newLeft,
			sy: newTop,
			sWidth: img.width,
			sHeight: img.height,
			// sWidth: img.width,
			// sHeight: img.height,
			dx: 0, // must be 0,0 as that's where we start drawing to our output canvas!
			dy: 0, // must be 0,0 as that's where we start drawing to our output canvas!
			dWidth: newWidth,
			dHeight: newHeight,
		};
		const { sx, sy, dx, dy, sWidth, sHeight, dWidth, dHeight } = dimensions;
		const canvasEl = canvasRef?.current as HTMLCanvasElement;
		const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		// SYNTAX: imgSrc, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight

		// ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, newWidth, newHeight);
		// ctx.drawImage(img, sx, sy, sWidth, sWidth, 0, 0, width, height);
		// ctx.drawImage(img, 0, 0, sWidth, sWidth, sx, sy, width, height);
		// ctx.drawImage(img, 70, 20, 50, 50, 0, 0, 100, 100);

		// THIS HAS CORRECT TOP & LEFT, BUT NOT WIDTH OR HEIGHT //
		ctx.drawImage(img, sx, sy, sWidth, sHeight);
	};

	return (
		<div className={styles.ImageResizer}>
			<div className={styles.ImageResizer_dropzone}>
				<FileDropZone
					id="userFile"
					name="userFile"
					hasFile={!!userFile}
					onFile={handleFile}
					onFileDrop={handleFileDrop}
					onFileDragOver={handleDragOver}
				/>
			</div>
			<div className={styles.ImageResizer_inner}>
				<ImageResizerGrid>
					<ImageResizerOverlay overlayRef={overlayRef} />
					<div className={styles.ImageResizer_inner_mask}>
						{userFileUrl && (
							<ImageStaticPreview imgRef={imgRef} src={userFileUrl} />
						)}
					</div>
				</ImageResizerGrid>
			</div>
			<div className={styles.ImageResizer_output}>
				<IconButton icon="crop" onClick={updateOutputPreview}>
					Crop Image
				</IconButton>
				<ImageResizerOutputPreview canvasRef={canvasRef} />
			</div>
		</div>
	);
};

export default ImageResizer;
