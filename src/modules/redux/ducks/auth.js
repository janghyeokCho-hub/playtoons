export const authTypes = {
  LOGIN: "INSERT_AUTH_LOGIN",
  LOGIN_COMPLETED: "LOGIN_COMPLETED",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT: "LOGOUT",
  ISLOGGEDIN: "ISLOGGEDIN",
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
      const email = await localStorage.getItem("email");
      const user = {
        authorization: undefined,
        email: email ? email : undefined,
      };

      dispatch({
        type: authTypes.ISLOGGEDIN,
        user,
        isLoggedIn: user.email ? true : false,
      });
    } catch (err) {
      dispatch({ type: authTypes.LOGIN_ERROR, err });
    }
  };
};

export const login = (email, password) => {
  return async function (dispatch, getState) {
    try {
      const params = {
        authorization: undefined,
        email,
        password,
      };

      dispatch({
        type: authTypes.LOGIN_COMPLETED,
        params,
        isLoggedIn: params.email ? true : false,
      });
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
      localStorage.deleteItemAsync("userId");
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
        if (typeof action.result.data === "string") {
          if (action.result.data.indexOf("아이디") != -1) {
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

    case "CLEAR_AUTH_ERROR":
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
