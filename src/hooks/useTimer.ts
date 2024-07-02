import { useState, useEffect, useRef, useMemo } from "react";

export interface IMinsAndSecs {
	minutes: number;
	seconds: number;
}
const timerToMinsAndSecs = (timer: number): IMinsAndSecs => {
	const mins = Math.floor(timer / 60);
	const secs = timer - mins * 60;

	return {
		minutes: mins,
		seconds: secs,
	};
};

export interface ITimerProps {
	startTime?: number;
	step?: number;
	interval?: number;
}

const defaultOpts = {
	startTime: 0,
	step: 1,
	interval: 1000,
};

const useTimer = ({
	startTime = 0,
	step = 1,
	interval = 1000,
}: ITimerProps = defaultOpts) => {
	const [timerValue, setTimerValue] = useState(startTime);
	const [isActive, setIsActive] = useState<boolean>(false);
	const timerID = useRef<ReturnType<typeof setInterval> | null>(null);
	const formattedTime: string = useMemo(() => {
		// format the timerValue => '0:01'
		const { minutes, seconds } = timerToMinsAndSecs(timerValue);
		const secs = seconds < 10 ? `0${seconds}` : seconds;
		const newTime = `${minutes}:${secs}`;

		return newTime;
	}, [timerValue]);

	const startTimer = () => {
		setIsActive(true);
	};
	const pauseTimer = () => {
		// clear interval timer, but don't reset our timerValue yet
		setIsActive(false);
	};
	const stopTimer = () => {
		// stop & reset the timer back to it's 'startTime' value
		const id = timerID?.current as ReturnType<typeof setInterval>;
		clearInterval(id);
		timerID.current = null;

		// clear states
		setIsActive(false);
		setTimerValue(startTime);
	};

	// create, set & start timer when 'isActive' is true
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// if active, start the timer
		if (isActive) {
			timerID.current = setInterval(() => {
				const newTime = timerValue + step;
				setTimerValue(newTime);
			}, interval);
		}

		return () => {
			isMounted = false;
			const id = timerID.current as ReturnType<typeof setInterval>;
			clearInterval(id);
		};
	}, [interval, isActive, step, timerValue]);

	return {
		time: formattedTime,
		timerValue: timerValue,
		startTimer: startTimer,
		pauseTimer: pauseTimer,
		stopTimer: stopTimer,
	};
};

export { useTimer };
