import React, { useState, CSSProperties, RefObject, useRef } from "react";
import styles from "../../css/image-resizer/ImageResizerEdgeHandle.module.scss";
import { ElCoords } from "../../hooks/useRelativeMousePosition";

type Props = {
	type: HandleType;
};

type HandleType =
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| "top-middle"
	| "bottom-middle"
	| "left-middle"
	| "right-middle";

const typeCss = {
	// CORNERS
	"top-left": {
		top: "-1rem",
		left: "-1rem",
		cursor: "se-resize",
		background: "green",
	},
	"top-right": {
		top: "-1rem",
		left: "98.5%",
		cursor: "sw-resize",
		background: "blue",
	},
	"bottom-left": {
		top: "98.5%",
		left: "-1rem",
		cursor: "ne-resize",
		background: "red",
	},
	"bottom-right": {
		top: "98.5%",
		left: "98.5%",
		cursor: "nw-resize",
		background: "pink",
	},
	// MIDDLES
	"top-middle": {
		top: "-1rem",
		left: "48.5%",
		cursor: "ns-resize",
	},
	"bottom-middle": {
		top: "98.5%",
		left: "48.5%",
		cursor: "ns-resize",
	},
	"left-middle": {
		top: "48.5%",
		left: "-1rem",
		cursor: "ew-resize",
	},
	"right-middle": {
		top: "48.5%",
		left: "99%",
		cursor: "ew-resize",
	},
};
const getPositionByType = (type: HandleType): CSSProperties => {
	const css = typeCss?.[type as keyof object] as CSSProperties;

	return css;
};

const getElementBounds = (domNode: RefObject<HTMLDivElement>): DOMRect => {
	const element = domNode?.current as HTMLDivElement;
	const rect = element?.getBoundingClientRect();

	return rect;
};

const ImageResizerEdgeHandle = ({ type }: Props) => {
	return (
		<div
			data-type={type}
			className={styles.ImageResizerEdgeHandle}
			// style={positionCss}
		></div>
	);
};

export default ImageResizerEdgeHandle;
