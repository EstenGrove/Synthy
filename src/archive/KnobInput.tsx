/* eslint-disable no-let */
import React from "react";
import "./KnobInput.module.scss";
// TODO: add input label for screenreaders

// KnobInput class

class KnobInput {
	initial: any;
	visualElementClass: any;
	dragResistance: any;
	wheelResistance: any;
	setupVisualContext: any;
	updateVisuals: any;
	_container: any;
	_input: HTMLInputElement;
	_visualElement: any;
	_visualContext: { element: any };
	_activeDrag: boolean;
	_handlers: {
		inputChange: (evt: any) => void;
		touchStart: (evt: any) => void;
		touchMove: (evt: any) => void;
		touchEnd: (evt: any) => void;
		touchCancel: (evt: any) => void;
		mouseDown: (evt: any) => void;
		mouseMove: (evt: any) => void;
		mouseUp: (evt: any) => void;
		mouseWheel: (evt: any) => void;
		doubleClick: (evt: any) => void;
		focus: (evt: any) => void;
		blur: (evt: any) => void;
	};
	static element: any;
	static maxRotation: any;
	static minRotation: number;
	_prevValue: number;
	_dragStartPosition: any;
	constructor(
		containerElement: Element,
		options: {
			indicatorRing: any;
			element: any;
			r: number;
			indicatorDot: any;
			visualContext?: any;
			updateVisuals?: any;
			min?: any;
			max?: any;
			initial?: any;
			step?: any;
			visualElementClass?: any;
			dragResistance?: any;
			wheelResistance?: any;
		}
	) {
		if (!options) {
			options = {};
		}

		// settings
		const step = options.step || "any";
		const min = typeof options.min === "number" ? options.min : 0;
		const max = typeof options.max === "number" ? options.max : 1;
		this.initial =
			typeof options.initial === "number" ? options.initial : 0.5 * (min + max);
		this.visualElementClass =
			options.visualElementClass || "knob-input__visual";
		this.dragResistance =
			typeof options.dragResistance === "number" ? options.dragResistance : 300;
		this.dragResistance /= max - min;
		this.wheelResistance =
			typeof options.wheelResistance === "number"
				? options.wheelResistance
				: 4000;
		this.wheelResistance /= max - min;
		this.setupVisualContext =
			typeof options.visualContext === "function"
				? options.visualContext
				: KnobInput.setupRotationContext(0, 360);
		this.updateVisuals =
			typeof options.updateVisuals === "function"
				? options.updateVisuals
				: KnobInput.rotationUpdateFunction;

		// setup input
		const rangeInput = document.createElement("input");
		rangeInput.type = "range";
		rangeInput.step = step;
		rangeInput.min = min;
		rangeInput.max = max;
		rangeInput.value = this.initial;
		containerElement.appendChild(rangeInput);

		// elements
		this._container = containerElement;
		this._container.classList.add("knob-input");
		this._input = rangeInput;
		this._input.classList.add("knob-input__input");
		this._visualElement = this._container.querySelector(
			`.${this.visualElementClass}`
		);
		this._visualElement.classList.add("knob-input__visual");

		// visual context
		this._visualContext = { element: this._visualElement };
		this.setupVisualContext.apply(this._visualContext);
		this.updateVisuals = this.updateVisuals.bind(this._visualContext);

		// internals
		this._activeDrag = false;

		// define event listeners
		// have to store bound versions of handlers so they can be removed later
		this._handlers = {
			inputChange: this.handleInputChange.bind(this),
			touchStart: this.handleTouchStart.bind(this),
			touchMove: this.handleTouchMove.bind(this),
			touchEnd: this.handleTouchEnd.bind(this),
			touchCancel: this.handleTouchCancel.bind(this),
			mouseDown: this.handleMouseDown.bind(this),
			mouseMove: this.handleMouseMove.bind(this),
			mouseUp: this.handleMouseUp.bind(this),
			mouseWheel: this.handleMouseWheel.bind(this),
			doubleClick: this.handleDoubleClick.bind(this),
			focus: this.handleFocus.bind(this),
			blur: this.handleBlur.bind(this),
		};
		// add listeners
		this._input.addEventListener("change", this._handlers.inputChange);
		this._input.addEventListener("touchstart", this._handlers.touchStart);
		this._input.addEventListener("mousedown", this._handlers.mouseDown);
		this._input.addEventListener("wheel", this._handlers.mouseWheel);
		this._input.addEventListener("dblclick", this._handlers.doubleClick);
		this._input.addEventListener("focus", this._handlers.focus);
		this._input.addEventListener("blur", this._handlers.blur);
		// init
		this.updateToInputValue();
	}

	static setupRotationContext(minRotation: number, maxRotation: number) {
		return function () {
			this.minRotation = minRotation;
			this.maxRotation = maxRotation;
		};
	}

	static rotationUpdateFunction(norm: number) {
		this.element.style[transformProp] = `rotate(${
			this.maxRotation * norm - this.minRotation * (norm - 1)
		}deg)`;
	}

	// handlers
	handleInputChange(evt: any) {
		// console.log('input change');
		this.updateToInputValue();
	}

	handleTouchStart(evt: {
		preventDefault: () => void;
		changedTouches: { item: (arg0: number) => any; length: number };
	}) {
		// console.log('touch start');
		this.clearDrag();
		evt.preventDefault();
		const touch = evt.changedTouches.item(evt.changedTouches.length - 1);
		this._activeDrag = touch.identifier;
		this.startDrag(touch.clientY);
		// drag update/end listeners
		document.body.addEventListener("touchmove", this._handlers.touchMove);
		document.body.addEventListener("touchend", this._handlers.touchEnd);
		document.body.addEventListener("touchcancel", this._handlers.touchCancel);
	}

	handleTouchMove(evt: { changedTouches: any; touches: any }) {
		// console.log('touch move');
		const activeTouch = this.findActiveTouch(evt.changedTouches);
		if (activeTouch) {
			this.updateDrag(activeTouch.clientY);
		} else if (!this.findActiveTouch(evt.touches)) {
			this.clearDrag();
		}
	}

	handleTouchEnd(evt: { changedTouches: any }) {
		// console.log('touch end');
		const activeTouch = this.findActiveTouch(evt.changedTouches);
		if (activeTouch) {
			this.finalizeDrag(activeTouch.clientY);
		}
	}

	handleTouchCancel(evt: { changedTouches: any }) {
		// console.log('touch cancel');
		if (this.findActiveTouch(evt.changedTouches)) {
			this.clearDrag();
		}
	}

	handleMouseDown(evt: { preventDefault: () => void; clientY: any }) {
		// console.log('mouse down');
		this.clearDrag();
		evt.preventDefault();
		this._activeDrag = true;
		this.startDrag(evt.clientY);
		// drag update/end listeners
		document.body.addEventListener("mousemove", this._handlers.mouseMove);
		document.body.addEventListener("mouseup", this._handlers.mouseUp);
	}

	handleMouseMove(evt: { buttons: number; clientY: any }) {
		// console.log('mouse move');
		if (evt.buttons & 1) {
			this.updateDrag(evt.clientY);
		} else {
			this.finalizeDrag(evt.clientY);
		}
	}

	handleMouseUp(evt: { clientY: any }) {
		// console.log('mouse up');
		this.finalizeDrag(evt.clientY);
	}

	handleMouseWheel(evt: { deltaY: any }) {
		// console.log('mouse wheel');
		this._input.focus();
		this.clearDrag();
		this._prevValue = parseFloat(this._input.value);
		this.updateFromDrag(evt.deltaY, this.wheelResistance);
	}

	handleDoubleClick(evt: any) {
		// console.log('double click');
		this.clearDrag();
		this._input.value = this.initial;
		this.updateToInputValue();
	}

	handleFocus(evt: any) {
		// console.log('focus on');
		this._container.classList.add("focus-active");
	}

	handleBlur(evt: any) {
		// console.log('focus off');
		this._container.classList.remove("focus-active");
	}

	// dragging
	startDrag(yPosition: any) {
		this._dragStartPosition = yPosition;
		this._prevValue = parseFloat(this._input.value);

		this._input.focus();
		document.body.classList.add("knob-input__drag-active");
		this._container.classList.add("drag-active");
	}

	updateDrag(yPosition: number) {
		const diff = yPosition - this._dragStartPosition;
		this.updateFromDrag(diff, this.dragResistance);
		this._input.dispatchEvent(new InputEvent("change"));
	}

	finalizeDrag(yPosition: number) {
		const diff = yPosition - this._dragStartPosition;
		this.updateFromDrag(diff, this.dragResistance);
		this.clearDrag();
		this._input.dispatchEvent(new InputEvent("change"));
	}

	clearDrag() {
		document.body.classList.remove("knob-input__drag-active");
		this._container.classList.remove("drag-active");
		this._activeDrag = false;
		this._input.dispatchEvent(new InputEvent("change"));
		// clean up event listeners
		document.body.removeEventListener("mousemove", this._handlers.mouseMove);
		document.body.removeEventListener("mouseup", this._handlers.mouseUp);
		document.body.removeEventListener("touchmove", this._handlers.touchMove);
		document.body.removeEventListener("touchend", this._handlers.touchEnd);
		document.body.removeEventListener(
			"touchcancel",
			this._handlers.touchCancel
		);
	}

	updateToInputValue() {
		const normVal = this.normalizeValue(parseFloat(this._input.value));
		this.updateVisuals(normVal);
	}

	updateFromDrag(dragAmount: number, resistance: number) {
		const newVal = this.clampValue(this._prevValue - dragAmount / resistance);
		this._input.value = newVal;
		this.updateVisuals(this.normalizeValue(newVal));
	}

	// utils
	clampValue(val: number) {
		const min = parseFloat(this._input.min);
		const max = parseFloat(this._input.max);
		return Math.min(Math.max(val, min), max);
	}

	normalizeValue(val: number) {
		const min = parseFloat(this._input.min);
		const max = parseFloat(this._input.max);
		return (val - min) / (max - min);
	}

	findActiveTouch(touchList: {
		length: any;
		item: (arg0: number) => {
			clientY(clientY: any): unknown;
			(): any;
			new (): any;
			identifier: boolean;
		};
	}) {
		let i, len, touch;
		for (i = 0, len = touchList.length; i < len; i++)
			if (this._activeDrag === touchList.item(i).identifier)
				return touchList.item(i);
		return null;
	}

	// public passthrough methods
	addEventListener() {
		this._input.addEventListener.apply(this._input, arguments);
	}
	removeEventListener() {
		this._input.removeEventListener.apply(this._input, arguments);
	}
	focus() {
		this._input.focus.apply(this._input, arguments);
	}
	blur() {
		this._input.blur.apply(this._input, arguments);
	}

	// getters/setters
	get value() {
		return parseFloat(this._input.value);
	}
	set value(val) {
		this._input.value = val;
		this.updateToInputValue();
		this._input.dispatchEvent(new Event("change"));
	}
}

// Utils

function getSupportedPropertyName(properties: string | any[]) {
	for (let i = 0; i < properties.length; i++)
		if (typeof document.body.style[properties[i]] !== "undefined")
			return properties[i];
	return null;
}

function getTransformProperty() {
	return getSupportedPropertyName([
		"transform",
		"msTransform",
		"webkitTransform",
		"mozTransform",
		"oTransform",
	]);
}

function debounce(
	func: { (evt: any): void; apply?: any },
	wait: number | undefined,
	immediate: undefined
) {
	let timeout: string | number | NodeJS.Timeout | null | undefined;
	return function () {
		const context = this,
			args = arguments;
		const later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// Demo Setup - Knobs

const transformProp = getTransformProperty();

const envelopeKnobStartPositions = [0, 40, 75, 85, 20, 55];
let envelopeKnobs = [
	...document.querySelectorAll(".fl-studio-envelope__knob.envelope-knob"),
];
let envelopeKnobs = envelopeKnobs.map(
	(el, idx) =>
		new KnobInput(el, {
			visualContext: function () {
				this.indicatorRing = this.element.querySelector(".indicator-ring");
				const ringStyle = getComputedStyle(
					this.element.querySelector(".indicator-ring-bg")
				);
				this.r =
					parseFloat(ringStyle.r) - parseFloat(ringStyle.strokeWidth) / 2;
				this.indicatorDot = this.element.querySelector(".indicator-dot");
				this.indicatorDot.style[`${transformProp}Origin`] = "20px 20px";
			},
			updateVisuals: function (norm: number) {
				const theta = Math.PI * 2 * norm + 0.5 * Math.PI;
				const endX = this.r * Math.cos(theta) + 20;
				const endY = this.r * Math.sin(theta) + 20;
				// using 2 arcs rather than flags since one arc collapses if it gets near 360deg
				this.indicatorRing.setAttribute(
					"d",
					`M20,20l0,${this.r}${
						norm > 0.5 ? `A${this.r},${this.r},0,0,1,20,${20 - this.r}` : ""
					}A-${this.r},${this.r},0,0,1,${endX},${endY}Z`
				);
				this.indicatorDot.style[transformProp] = `rotate(${360 * norm}deg)`;
			},
			min: 0,
			max: 100,
			initial: envelopeKnobStartPositions[idx],
		})
);

const tensionKnobStartPositions = [0, 0, -80];
let tensionKnobs = [
	...document.querySelectorAll(".fl-studio-envelope__knob.tension-knob"),
];
let tensionKnobs = tensionKnobs.map(
	(el, idx) =>
		new KnobInput(el, {
			visualContext: function () {
				this.indicatorRing = this.element.querySelector(".indicator-ring");
				const ringStyle = getComputedStyle(
					this.element.querySelector(".indicator-ring-bg")
				);
				this.r =
					parseFloat(ringStyle.r) - parseFloat(ringStyle.strokeWidth) / 2;
			},
			updateVisuals: function (norm: number) {
				const theta = Math.PI * 2 * norm + 0.5 * Math.PI;
				const endX = this.r * Math.cos(theta) + 20;
				const endY = this.r * Math.sin(theta) + 20;
				this.indicatorRing.setAttribute(
					"d",
					`M20,20l0,-${this.r}A${this.r},${this.r},0,0,${
						norm < 0.5 ? 0 : 1
					},${endX},${endY}Z`
				);
			},
			min: -100,
			max: 100,
			initial: tensionKnobStartPositions[idx],
		})
);

// Demo Setup - Envelope Visualization

const container = document.querySelector(".envelope-visualizer");
const enveloperVisualizer = {
	container: container,
	shape: container.querySelector(".envelope-shape"),
	delay: container.querySelector(".delay"),
	attack: container.querySelector(".attack"),
	hold: container.querySelector(".hold"),
	decay: container.querySelector(".decay"),
	release: container.querySelector(".release"),
};

const updateVisualization = debounce(function (evt: any) {
	const maxPtSeparation = 75;
	const ptDelay = (maxPtSeparation * envelopeKnobs[0].value) / 100;
	const ptAttack = ptDelay + (maxPtSeparation * envelopeKnobs[1].value) / 100;
	const ptHold = ptAttack + (maxPtSeparation * envelopeKnobs[2].value) / 100;
	const ptDecay =
		ptHold +
		(((maxPtSeparation * envelopeKnobs[3].value) / 100) *
			(100 - envelopeKnobs[4].value)) /
			100;
	const ptSustain = 100 - envelopeKnobs[4].value; // y value
	const ptRelease = ptDecay + (maxPtSeparation * envelopeKnobs[5].value) / 100;
	// TODO: better tension visualization
	const tnAttack = ((ptAttack - ptDelay) * tensionKnobs[0].value) / 100;
	const tnDecay = ((ptDecay - ptHold) * tensionKnobs[1].value) / 100;
	const tnRelease = ((ptRelease - ptDecay) * tensionKnobs[2].value) / 100;
	enveloperVisualizer.shape.setAttribute(
		"d",
		`M${ptDelay},100` +
			`C${tnAttack < 0 ? ptDelay - tnAttack : ptDelay},100,${
				tnAttack > 0 ? ptAttack - tnAttack : ptAttack
			},0,${ptAttack},0` +
			`L${ptHold},0` +
			`C${tnDecay > 0 ? ptHold + tnDecay : ptHold},0,${
				tnDecay < 0 ? ptDecay + tnDecay : ptDecay
			},${ptSustain},${ptDecay},${ptSustain}` +
			`C${tnRelease > 0 ? ptDecay + tnRelease : ptDecay},${ptSustain},${
				tnRelease < 0 ? ptRelease + tnRelease : ptRelease
			},100,${ptRelease},100`
	);
	enveloperVisualizer.delay.setAttribute("cx", ptDelay);
	enveloperVisualizer.attack.setAttribute("cx", ptAttack);
	enveloperVisualizer.hold.setAttribute("cx", ptHold);
	enveloperVisualizer.decay.setAttribute("cx", ptDecay);
	enveloperVisualizer.decay.setAttribute("cy", ptSustain);
	enveloperVisualizer.release.setAttribute("cx", ptRelease);
}, 10);

envelopeKnobs.concat(tensionKnobs).forEach((knob) => {
	knob.addEventListener("change", updateVisualization);
});
updateVisualization();

const panelElement = document.querySelector(".fl-studio-envelope");
const panel = {
	element: panelElement,
	originalTransform: getComputedStyle(panelElement)[transformProp],
	width: panelElement.getBoundingClientRect().width,
	height: panelElement.getBoundingClientRect().height,
};
const resizePanel = () => {
	const pw = (window.innerWidth - 40) / panel.width;
	const ph = (window.innerHeight - 40) / panel.height;
	let size = Math.min(pw, ph);
	if (size > 1.4) {
		size -= 0.4;
	} else if (size > 1) {
		size = Math.min(size, 1);
	}
	panel.element.style[
		transformProp
	] = `${panel.originalTransform} scale(${size})`;
};
window.addEventListener("resize", resizePanel);
resizePanel();
