import {
	useState,
	useRef,
	DragEvent,
	ChangeEvent,
	useMemo,
	ReactNode,
	useCallback,
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
import ImageCanvasPreview from "./ImageCanvasPreview";

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
	const imgRef = useRef<HTMLImageElement>();
	const originRef = useRef<HTMLCanvasElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	// ref to our container that dictates the size of the resulting image
	const overlayRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [userFile, setUserFile] = useState<File>();
	const userFileUrl: string = useMemo(() => {
		if (!userFile) return "";
		const url = createURL(userFile as Blob);

		return url;
	}, [userFile]);

	const [resizedImg, setResizedImg] = useState<HTMLImageElement>();

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setUserFile(file);
		drawSourcePreview(file as Blob);
	};
	const handleFileDrop = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.dataTransfer;
		const file = files?.[0];
		setUserFile(file);
		drawSourcePreview(file as Blob);
	};
	const handleDragOver = (e: DragEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const drawSourcePreview = (file: Blob) => {
		const srcUrl = createURL(file);
		const canvas = originRef?.current as HTMLCanvasElement;
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
		const img = new Image();
		img.src = srcUrl;

		img.onload = () => {
			canvas.width = 500;
			canvas.height = 500;
			img.width = 500;
			img.height = 500;
			ctx.drawImage(img, 0, 0, 500, 500);
			imgRef.current = img;
		};
	};

	const updateOutputPreview = () => {
		// origin image
		const img = imgRef.current as HTMLImageElement;
		const originCanvas = originRef?.current as HTMLCanvasElement;
		const {
			left: originLeft,
			top: originTop,
			right: originRight,
			bottom: originBottom,
			width: originWidth,
			height: originHeight,
		} = img.getBoundingClientRect();
		const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = img;

		// resized image
		const overlay = overlayRef?.current as HTMLDivElement;
		const overlayRect = overlay.getBoundingClientRect();
		// parent container
		const grid = gridRef?.current as HTMLDivElement;
		const gridRect = grid.getBoundingClientRect();

		const { top, left, right, bottom, width, height } = overlayRect;
		const {
			top: gridTop,
			left: gridLeft,
			right: gridRight,
			bottom: gridBottom,
			width: gridWidth,
			height: gridHeight,
		} = gridRect;

		// TOP/LEFT ARE CORRECT //
		// !!!! DO NOT TOUCH THESE !!!! //
		// const newLeft = originLeft - left;
		// const newTop = originTop - top;

		const newLeft = left - gridLeft;
		const newTop = top - gridTop;
		const newWidth = width;
		const newHeight = height;

		const canvas = canvasRef.current as HTMLCanvasElement;
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		const dimensions = {
			sx: newLeft,
			sy: newTop,
			sWidth: img.width,
			sHeight: img.height,
			dx: 0, // could be 0,0 or where-ever we want to start drawing our cropped output image!
			dy: 0, // could be 0,0 or where-ever we want to start drawing our cropped output image!
			dWidth: newWidth,
			dHeight: newHeight,
		};
		const { sx, sy, dWidth, dHeight } = dimensions;
		// reset our destination canvas prior to drawing the cropped preview
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		ctx.drawImage(
			originCanvas,
			sx,
			sy,
			dWidth,
			dHeight,
			sx,
			sy,
			dWidth,
			dHeight
		);

		// ctx.drawImage()

		console.group("Overlay");
		console.log("newLeft", newLeft);
		console.log("newTop", newTop);
		console.log("width", width);
		console.log("height", height);
		console.groupEnd();
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
				<ImageResizerGrid gridRef={gridRef}>
					<ImageResizerOverlay overlayRef={overlayRef} />
					<div className={styles.ImageResizer_inner_mask}>
						{/* {userFileUrl && (
							<ImageStaticPreview imgRef={imgRef} src={userFileUrl} />
						)} */}
						<ImageCanvasPreview previewRef={originRef} src={userFileUrl} />
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
