const isEmptyObj = (obj: object): boolean => {
	if (!obj || Object.keys(obj)?.length <= 0) return true;
	return false;
};

export { isEmptyObj };
