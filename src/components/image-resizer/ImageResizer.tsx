import { useState, useRef, useCallback, useEffect, ReactNode } from "react";
import {
	IDimensions,
	drawCroppedImage,
	getCroppedDimensions,
} from "../../utils/utils_resizer";
import {
	createFilename,
	createURL,
	convertImage,
	uploadImage,
} from "../../utils/utils_files";
import { saveCanvasToImage } from "../../utils/utils_canvas";
import styles from "../../css/image-resizer/ImageResizer.module.scss";
import sprite from "../../assets/icons/resizer.svg";
import ImageResizerGrid from "./ImageResizerGrid";
import ImageCanvasPreview from "./ImageCanvasPreview";
import ImageResizerOverlay from "./ImageResizerOverlay";
import ImageResizerOutputPreview from "./ImageResizerOutputPreview";
import ImageResizerToolbar from "./ImageResizerToolbar";

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

type Props = {
	width?: number | string;
	height?: number | string;
	file: File;
};

const ImageResizer = ({
	width = CANVAS_WIDTH,
	height = CANVAS_HEIGHT,
	file,
}: Props) => {
	const gridRef = useRef<HTMLDivElement>(null); // resizer's parent container
	const overlayRef = useRef<HTMLDivElement>(null); // resizer overlay
	const sourceCanvasRef = useRef<HTMLCanvasElement>(null); // origin/source canvas
	const destCanvasRef = useRef<HTMLCanvasElement>(null); // output/destination canvas
	// draw uploaded file
	const drawOrigin = useCallback(() => {
		if (!file) return;
		return drawSourcePreview(file);
	}, [file]);

	// draws our source image to the origin canvas (eg. sourceCanvasRef)
	const drawSourcePreview = (file: Blob) => {
		const srcUrl = createURL(file);
		const canvas = sourceCanvasRef?.current as HTMLCanvasElement;
		const sourceCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
		const img = new Image();
		img.src = srcUrl;

		img.onload = () => {
			canvas.width = 700;
			canvas.height = 500;
			img.width = 700;
			img.height = 500;
			sourceCtx.drawImage(img, 0, 0, 700, 500);
		};
	};

	// draws the cropped/resized image to our output canvas (eg. destCanvasRef)
	const updateOutputPreview = () => {
		const grid = gridRef?.current as HTMLDivElement;
		const overlay = overlayRef?.current as HTMLDivElement;
		const originCanvas = sourceCanvasRef?.current as HTMLCanvasElement;

		const canvas = destCanvasRef.current as HTMLCanvasElement;
		const destCtx = canvas.getContext("2d") as CanvasRenderingContext2D;
		const croppedDims: IDimensions = getCroppedDimensions(overlay, grid);

		// reset our destination canvas prior to drawing the cropped preview
		destCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		drawCroppedImage(destCtx, originCanvas, croppedDims);
	};

	const saveCroppedImage = () => {
		const canvas = destCanvasRef?.current as HTMLCanvasElement;
		const filename = createFilename(file as Blob);
		console.log("Creating file as...", filename);
		console.log("file", file);
		saveCanvasToImage(canvas, { filename, format: "webp" });
	};

	const sendUpload = async () => {
		const { name } = file;
		const noExt = name.split(".")[0];
		const hash = Date.now().toString().slice(-5);
		const canvas = destCanvasRef?.current as HTMLCanvasElement;
		const filename = `${hash}__${noExt}.webp`;
		saveCanvasToImage(canvas, { filename, format: "webp" });
		const response = await convertImage(file as File, {
			filename: name,
			format: "webp",
		});

		console.log("response", response);
	};

	// draw our source image once a file is uploaded from the parent
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (file) {
			drawOrigin();
		}

		return () => {
			isMounted = false;
		};
	}, [drawOrigin, file]);

	return (
		<div className={styles.ImageResizer}>
			<ImageResizerToolbar />
			<div className={styles.ImageResizer_inner}>
				<ImageResizerGrid gridRef={gridRef}>
					<ImageResizerOverlay overlayRef={overlayRef} />
					<div className={styles.ImageResizer_inner_mask}>
						<ImageCanvasPreview
							previewRef={sourceCanvasRef}
							width={width}
							height={height}
						/>
					</div>
				</ImageResizerGrid>
			</div>
			<div className={styles.ImageResizer_output}>
				<IconButton icon="crop" onClick={updateOutputPreview}>
					Crop Image
				</IconButton>
				<IconButton icon="save" onClick={sendUpload}>
					Save Image
				</IconButton>
				<ImageResizerOutputPreview canvasRef={destCanvasRef} />
			</div>
		</div>
	);
};

export default ImageResizer;
