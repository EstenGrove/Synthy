import { useRef, RefObject } from "react";
import styles from "../../css/image-resizer/ImageResizerOverlay.module.scss";

type EdgeProps = {
	overlayRef?: RefObject<HTMLDivElement>;
};

interface PrevPos {
	top: number;
	left: number;
	width: number;
	height: number;
}

// records the previous position from mousedown of the parent node
const setInitialDimensions = (parentNode: HTMLDivElement): PrevPos => {
	const prevPos = {
		top: parentNode.offsetTop,
		left: parentNode.offsetLeft,
		width: parentNode.offsetWidth,
		height: parentNode.offsetHeight,
	};

	return prevPos;
};

const TopLeftEdge = ({ overlayRef }: EdgeProps) => {
	let isDragging = false;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		const element = overlayRef?.current as HTMLDivElement;
		const prevPos = setInitialDimensions(element);
		const prevMouse = { x: e.pageX, y: e.pageY };

		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseDiffX = e.pageX - prevMouse.x;
			const mouseDiffY = e.pageY - prevMouse.y;

			const newTop = prevPos.top + mouseDiffY;
			const newLeft = prevPos.left + mouseDiffX;

			const newWidth = prevPos.width - mouseDiffX;
			const newHeight = prevPos.height - mouseDiffY;

			element.style.top = newTop + "px";
			element.style.left = newLeft + "px";
			element.style.width = newWidth + "px";
			element.style.height = newHeight + "px";
		};
		const handleMouseUp = () => {
			isDragging = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div className={styles.TopLeftEdge} onMouseDown={handleMouseDown}>
			{/*  */}
			{/*  */}
		</div>
	);
};
const TopRightEdge = ({ overlayRef }: EdgeProps) => {
	let isDragging = false;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		const element = overlayRef?.current as HTMLDivElement;
		const prevPos = setInitialDimensions(element);
		const prevMouse = { x: e.pageX, y: e.pageY };

		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseDiffX = e.pageX - prevMouse.x;
			const mouseDiffY = e.pageY - prevMouse.y;

			const newTop = prevPos.top + mouseDiffY;
			const newWidth = prevPos.width + mouseDiffX;
			const newHeight = prevPos.height - mouseDiffY;

			element.style.top = newTop + "px";
			element.style.width = newWidth + "px";
			element.style.height = newHeight + "px";
		};
		const handleMouseUp = () => {
			isDragging = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div className={styles.TopRightEdge} onMouseDown={handleMouseDown}>
			{/*  */}
			{/*  */}
		</div>
	);
};
const BottomLeftEdge = ({ overlayRef }: EdgeProps) => {
	let isDragging = false;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		const element = overlayRef?.current as HTMLDivElement;
		const prevPos = setInitialDimensions(element);
		const prevMouse = { x: e.pageX, y: e.pageY };

		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseDiffX = e.pageX - prevMouse.x;
			const mouseDiffY = e.pageY - prevMouse.y;

			const newLeft = prevPos.left + mouseDiffX;

			const newWidth = prevPos.width - mouseDiffX;
			const newHeight = prevPos.height + mouseDiffY;

			element.style.left = newLeft + "px";
			element.style.width = newWidth + "px";
			element.style.height = newHeight + "px";
		};
		const handleMouseUp = () => {
			isDragging = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div className={styles.BottomLeftEdge} onMouseDown={handleMouseDown}>
			{/*  */}
			{/*  */}
		</div>
	);
};
const BottomRightEdge = ({ overlayRef }: EdgeProps) => {
	let isDragging = false;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		const element = overlayRef?.current as HTMLDivElement;
		const prevPos = setInitialDimensions(element);
		const prevMouse = { x: e.pageX, y: e.pageY };

		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseDiffX = e.pageX - prevMouse.x;
			const mouseDiffY = e.pageY - prevMouse.y;

			const newWidth = prevPos.width + mouseDiffX;
			const newHeight = prevPos.height + mouseDiffY;

			element.style.width = newWidth + "px";
			element.style.height = newHeight + "px";
		};
		const handleMouseUp = () => {
			isDragging = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div className={styles.BottomRightEdge} onMouseDown={handleMouseDown}>
			{/*  */}
			{/*  */}
		</div>
	);
};

type Props = {
	overlayRef: RefObject<HTMLDivElement>;
};

const ImageResizerOverlay = ({ overlayRef }: Props) => {
	let isDragging = false;
	// const overlayRef = useRef<HTMLDivElement>(null);

	// handles dragging the overlay box
	const handleDragOverlay = (e: React.MouseEvent) => {
		isDragging = true;
		const boxElement = overlayRef?.current as HTMLDivElement;
		const prevMouse = { x: e.pageX, y: e.pageY };
		const prevPos = setInitialDimensions(boxElement);

		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const mouseDiffX = e.pageX - prevMouse.x;
			const mouseDiffY = e.pageY - prevMouse.y;

			const newLeft = prevPos.left + mouseDiffX;
			const newTop = prevPos.top + mouseDiffY;

			boxElement.style.left = newLeft + "px";
			boxElement.style.top = newTop + "px";
		};
		const handleMouseUp = () => {
			isDragging = false;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div ref={overlayRef} className={styles.ImageResizerOverlay}>
			{/* DRAGGABLE INNER BOX */}
			<div
				className={styles.ImageResizerOverlay_inner}
				onMouseDown={handleDragOverlay}
			></div>
			<TopLeftEdge overlayRef={overlayRef} />
			<TopRightEdge overlayRef={overlayRef} />
			<BottomLeftEdge overlayRef={overlayRef} />
			<BottomRightEdge overlayRef={overlayRef} />
		</div>
	);
};

export default ImageResizerOverlay;
