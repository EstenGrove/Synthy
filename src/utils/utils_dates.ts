import {
	addHours,
	differenceInHours,
	differenceInMinutes,
	format,
	formatDistanceToNow,
	hoursToMilliseconds,
	hoursToMinutes,
	isAfter,
	isBefore,
	isPast,
	isWithinInterval,
	parse,
	subHours,
} from "date-fns";

export type TDateFormats = {
	long: string;
	short: string;
	extraShort: string;
	longDashes: string;
	shortDashes: string;
};
export type TTimeFormats = {
	short: string;
	long: string;
	alt: string;
};
export type TDateTimeFormats = {
	long: string;
	short: string;
	extraShortAndLong: string;
	longAndShort: string;
	shortAndLong: string;
	shortDashes: string;
	longDashes: string;
};

// DATE-ONLY FORMAT TOKENS
const DATE_FORMATS: TDateFormats = {
	long: "MM/dd/yyyy",
	short: "MM/dd/yy",
	extraShort: "M/d/yyyy",
	// w/ dashes instead of slashes
	longDashes: "MM-dd-yyyy",
	shortDashes: "MM-dd-yy",
};
// TIME-ONLY FORMAT TOKENS
const TIME_FORMATS: TTimeFormats = {
	short: "h:mm",
	long: "hh:mm a",
	alt: "HH:mm",
};
// DATETIME FORMAT TOKENS (both date & time merged)
const DATETIME_TOKENS: TDateTimeFormats = {
	long: `${DATE_FORMATS.long} ${TIME_FORMATS.long}`,
	short: `${DATE_FORMATS.short} ${TIME_FORMATS.short}`,
	extraShortAndLong: `${DATE_FORMATS.extraShort} ${TIME_FORMATS.long}`,
	longAndShort: `${DATE_FORMATS.long} ${TIME_FORMATS.short}`,
	shortAndLong: `${DATE_FORMATS.short} ${TIME_FORMATS.long}`,
	// dashes
	shortDashes: `${DATE_FORMATS.shortDashes} ${TIME_FORMATS.short}`,
	longDashes: `${DATE_FORMATS.longDashes} ${TIME_FORMATS.long}`,
};

// formats a single date excludes time
const formatDate = (date: Date | string, formatToken: string = "long") => {
	const base: Date = new Date(date);
	const target: string = DATE_FORMATS[formatToken as keyof TDateFormats];
	const result = format(base, target);

	return result;
};
// formats a single time excludes date
const formatTime = (time: Date | string, formatToken: string = "long") => {
	const base: Date = new Date(time);
	const target: string = TIME_FORMATS[formatToken as keyof TTimeFormats];
	const result = format(base, target);

	return result;
};
// formats both date & time
const formatDateTime = (
	datetime: Date | string,
	formatToken: keyof TDateTimeFormats = "long"
) => {
	const base: Date = new Date(datetime);
	const target: string = DATETIME_TOKENS[formatToken as keyof TDateTimeFormats];
	const result = format(base, target);

	return result;
};

// merges a time string (eg. '03:45 AM') into base date instance
const parseTimeString = (
	timeStr: string,
	baseDate: Date | string = new Date()
) => {
	const parsed = parse(timeStr, "hh:mm a", baseDate);
	return parsed;
};

// merges a time string (eg. '03:45 AM') into a date instance
const mergeTimeStrWithDate = (
	timeStr: string,
	targetDate: Date | string
): Date | string => {
	const result = parseTimeString(timeStr, targetDate);

	return result;
};

// get time from date to now in words (eg. 'about 3 days ago')
const getRelativeDistanceToNow = (date: Date | string): string => {
	const base = new Date(date);
	const inPast = isPast(base);
	const pastSuffix = ` ago`;
	const distance = formatDistanceToNow(base);
	if (inPast) {
		// removes 'about' approximation
		const clean = distance.replace(/about/g, "");
		return clean + pastSuffix;
	} else {
		return distance;
	}
};

// add 'X' hours to a date
const addHoursToDate = (date: Date | string, hours: number): Date => {
	const base = new Date(date);
	const withHrs = addHours(base, hours);

	return withHrs;
};
// subtract 'X' hours from a date
const subHoursFromDate = (date: Date | string, hours: number): Date => {
	const base = new Date(date);
	const withHrs = subHours(base, hours);

	return withHrs;
};

// Time Conversions (eg. mins to secs etc) //

const hoursToSecs = (hours: number): number => {
	return hours * 60 * 60 * 24 * 365;
};
const hoursToMs = (hours: number): number => {
	return hoursToMilliseconds(hours);
};
const hoursToMins = (hours: number): number => {
	return hoursToMinutes(hours);
};

// Date/time Comparators //

// is 'target' before 'endDate' (eg. is 1st date before 2nd date?)
const isDateBefore = (target: Date | string, endDate: Date | string) => {
	const baseTarget = new Date(target);
	const baseEnd = new Date(endDate);
	return isBefore(baseTarget, baseEnd);
};
// is 'target' after 'endDate' (eg. is 1st date after 2nd date?)
const isDateAfter = (target: Date | string, endDate: Date | string) => {
	const baseTarget = new Date(target);
	const baseEnd = new Date(endDate);
	return isAfter(baseTarget, baseEnd);
};

export interface IDateRange {
	start: Date | string;
	end: Date | string | null;
}
const isDateWithinRange = (date: Date | string, dateRange: IDateRange) => {
	const base = new Date(date);
	const start = new Date(dateRange.start);
	const end = !dateRange.end ? null : new Date(dateRange.end);

	// if no end date, then just verify 'base' is after 'start'
	if (!end || end.toString() === "Invalid Date") {
		const inRange = isDateAfter(base, start);
		return inRange;
	} else {
		const inRange = isWithinInterval(base, {
			start,
			end,
		});
		return inRange;
	}
};

// get difference in minutes between two dates
const diffInMins = (date: Date | string, compareDate: Date | string) => {
	const base = new Date(date);
	const baseCompare = new Date(compareDate);
	const diff = differenceInMinutes(base, baseCompare);

	return Math.abs(diff);
};
// get difference in minutes between two dates
const diffInHours = (date: Date | string, compareDate: Date | string) => {
	const base = new Date(date);
	const baseCompare = new Date(compareDate);
	const diff = differenceInHours(base, baseCompare);

	return Math.abs(diff);
};

// NATIVE DATE FORMATTERS //

export interface INativeDateFormats extends Intl.DateTimeFormatOptions {}

// Formats a date using the native Internationalization API
const formatDateNatively = (
	date: Date,
	format: Intl.LocalesArgument = "en-US",
	formatOptions: INativeDateFormats = {}
): string => {
	const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
		format,
		formatOptions
	);
	const nativeFormat: string = formatter.format(date);

	return nativeFormat;
};

const addDaysNatively = (date: Date | string, days: number): Date => {
	const resultDate = new Date(date);
	resultDate.setDate(resultDate.getDate() + days);
	return resultDate;
};
const subDaysNatively = (date: Date | string, days: number): Date => {
	const resultDate = new Date(date);
	resultDate.setDate(resultDate.getDate() - days);
	return resultDate;
};

const addHoursNatively = (date: Date | string, hours: number): Date => {
	const resultDate = new Date(date);
	const hoursMultiplier = 60 * 60 * 1000;
	resultDate.setTime(resultDate.getTime() + hours * hoursMultiplier);
	return resultDate;
};
const subHoursNatively = (date: Date | string, hours: number): Date => {
	const resultDate = new Date(date);
	const hoursMultiplier = 60 * 60 * 1000;
	resultDate.setTime(resultDate.getTime() - hours * hoursMultiplier);
	return resultDate;
};

export {
	// Formatters
	formatDate,
	formatTime,
	formatDateTime,
	// Parsing
	parseTimeString,
	mergeTimeStrWithDate,
	// Comparators
	getRelativeDistanceToNow,
	isDateBefore,
	isDateAfter,
	isDateWithinRange,
	diffInMins,
	diffInHours,
	// Calculations
	addHoursToDate,
	subHoursFromDate,
	// Conversions
	hoursToSecs,
	hoursToMs,
	hoursToMins,
	// NATIVE Date Formatting
	formatDateNatively,
	addDaysNatively,
	subDaysNatively,
	addHoursNatively,
	subHoursNatively,
};
