export const authTypes = {
	LOGIN: 'LOGIN',
	LOGIN_COMPLETED: 'LOGIN_COMPLETED',
	LOGIN_ERROR: 'LOGIN_ERROR',
	LOGOUT: 'LOGOUT',
	ISLOGGEDIN: 'ISLOGGEDIN',
};

const initialAuthState = {
	loading: true,
	fetching: false,
	isLoggedIn: false,
	user: {
		userId: undefined,
		authorization: undefined,
	},
	err: undefined,
};

export const isLoggedIn = () => {
	return async function (dispatch, getState) {
		try {
			const userId = await localStorage.getItem('userId');
			let user = {
				authorization: undefined,
				userId: userId ? userId : undefined,
			};

			dispatch({ type: authTypes.ISLOGGEDIN, user, isLoggedIn: user.userId ? true : false });
		} catch (err) {
			dispatch({ type: authTypes.LOGIN_ERROR, err });
		}
	};
};

export const login = (userId) => {
	return async function (dispatch, getState) {
		try {
			let user = {
				authorization: undefined,
				userId,
			};

			dispatch({ type: authTypes.LOGIN_COMPLETED, user, isLoggedIn: user.userId ? true : false });
		} catch (err) {
			dispatch({ type: authTypes.LOGIN_ERROR, err });
		}
	};
};

export const logout = () => {
	return async function (dispatch, getState) {
		try {
			const state = getState();
			const cellPhone = state.user.userData.cellPhone;
			localStorage.deleteItemAsync('userId');
		} catch (err) {}

		dispatch({ type: authTypes.LOGOUT, state: initialAuthState });
	};
};

export const authAction = {
	login,
	logout,
};

export default function auth(state = initialAuthState, action) {
	switch (action.type) {
		case authTypes.LOGIN:
			return {
				...state,
				fetching: true,
			};
		case authTypes.LOGIN_COMPLETED:
			let userId = undefined;
			let err = undefined;

			try {
				if (typeof action.result.data === 'string') {
					if (action.result.data.indexOf('아이디') != -1) {
						err = action.result.data;
					}
				}
				if (action.result.data.userId) userId = action.result.data.userId;
			} catch (err) {}

			return {
				...state,
				fetching: false,
				loading: false,
				isLoggedIn: userId ? true : false,
				user: {
					...state.user,
					userId,
				},
				err: err,
			};

		case 'CLEAR_AUTH_ERROR':
			return {
				...state,
				err: undefined,
			};
		case authTypes.ISLOGGEDIN:
			return {
				...state,
				loading: false,
				fetching: false,
				isLoggedIn: action.isLoggedIn,
				user: {
					...state.user,
					userId: action.user.userId,
					authorization: action.user.authorization,
				},
			};

		case authTypes.LOGIN_ERROR:
			return {
				...state,
				loading: false,
				fetching: false,
				err: action.err,
			};

		case authTypes.LOGOUT:
			return {
				...action.state,
				loading: false,
			};
		default:
			return state;
	}
}
