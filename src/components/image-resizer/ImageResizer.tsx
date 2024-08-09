import {
	useState,
	useRef,
	DragEvent,
	ChangeEvent,
	useMemo,
	ReactNode,
} from "react";
import {
	IDimensions,
	drawCroppedImage,
	getCroppedDimensions,
} from "../../utils/utils_resizer";
import { createURL } from "../../utils/utils_files";
import styles from "../../css/image-resizer/ImageResizer.module.scss";
import sprite from "../../assets/icons/resizer.svg";
import FileDropZone from "./FileDropZone";
import ImageResizerGrid from "./ImageResizerGrid";
import ImageCanvasPreview from "./ImageCanvasPreview";
import ImageResizerOverlay from "./ImageResizerOverlay";
import ImageResizerOutputPreview from "./ImageResizerOutputPreview";

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
	const imgRef = useRef<HTMLImageElement>(null); // used only for <ImageStaticPreview />
	const gridRef = useRef<HTMLDivElement>(null); // resizer's parent container
	const overlayRef = useRef<HTMLDivElement>(null); // resizer overlay
	const sourceCanvasRef = useRef<HTMLCanvasElement>(null); // origin/source canvas
	const destCanvasRef = useRef<HTMLCanvasElement>(null); // output/destination canvas
	// uploaded file
	const [userFile, setUserFile] = useState<File>();
	// file-blob for static preview(s)
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
						<ImageCanvasPreview
							previewRef={sourceCanvasRef}
							src={userFileUrl}
						/>
					</div>
				</ImageResizerGrid>
			</div>
			<div className={styles.ImageResizer_output}>
				<IconButton icon="crop" onClick={updateOutputPreview}>
					Crop Image
				</IconButton>
				<ImageResizerOutputPreview canvasRef={destCanvasRef} />
			</div>
		</div>
	);
};

export default ImageResizer;
