export const rootTypes = {
	INITIALIZED: 'INITIALIZED',
	ROOT_CHANGED: 'ROOT_CHANGED',
	SHOW_MODAL: 'SHOW_MODAL',
	HIDE_MODAL: 'HIDE_MODAL',

	LOADX_RESULTS: 'LOADX_RESULTS',
	LOADX_API: 'LOADX_API',
	UPDATEX_API: 'UPDATEX_API',

	SHOW_LOADING: 'SHOW_LOADING',
	HIDE_LOADING: 'HIDE_LOADING',
};
const initialState = {
	routeName: 'App',
	loading: false,
};

export const changeRoot = (routeName) => {
	return async function (dispatch, getState) {
		dispatch({ type: rootTypes.ROOT_CHANGED, routeName });
	};
};

export function checkSession() {
	var auth = localStorage.getItem('userId');

	if (auth) return true;

	localStorage.clear();
	return false;
}

export function clearAuth(err = undefined) {
	return function (dispatch, getState) {
		dispatch({ type: 'CLEAR_AUTH', err });
	};
}

export const rootAction = {
	changeRoot,
	checkSession,
	clearAuth,
};

//root reducer
export default function root(state = initialState, action = {}) {
	switch (action.type) {
		case rootTypes.ROOT_CHANGED:
			return {
				...state,
				routeName: action.routeName,
			};
		case rootTypes.SHOW_LOADING:
			return {
				...state,
				loading: true,
			};

		case rootTypes.HIDE_LOADING:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
