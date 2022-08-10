const REQUESTS = ['LOAD', 'LOADX', 'VIEW', 'UPDATE', 'DELETE', 'INSERT'];

const loadingReducer = (state = {}, action) => {
	const { type } = action;

	//const typeMatches = /(_*)\/(_*)\/(_*)/.exec(type);
	const typeMatches = /(.*)/.exec(type);

	if (!typeMatches) return state;

	//const [, , , realType] = typeMatches;
	const [realType] = typeMatches;

	var requestState, requestName;

	const resultMatches = /(.*)_(COMPLETED|ERROR)/.exec(realType);

	if (resultMatches) {
		var [, requestName, requestState] = resultMatches;
	} else {
		const matches = /(LOAD|LOADX|VIEW|UPDATE|DELETE|INSERT|COMPLETED|ERROR)_(.*)/.exec(realType);
		if (!matches) return state;
		var [, requestState, requestName] = matches;
		requestName = requestState + '_' + requestName;
	}

	var real = false;

	if (REQUESTS.includes(requestState)) {
		real = true;
	}

	return {
		...state,
		[requestName]: real,
	};
};

export default loadingReducer;
