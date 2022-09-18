import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";

import produce from "immer";

/* --- Action Types --- */
export const [LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILURE] =
  createRequestActionTypes("login/REQUEST");
export const SYNC = "login/SYNC";

export const [LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILURE] =
  createRequestActionTypes("login/LOGOUT_REQUEST");

/* --- Actions --- */
export const loginRequest = createAction(LOGIN_REQUEST);
export const logoutRequest = createAction(LOGOUT_REQUEST);

/**
 * login reducer 초기값
 */
const initialState = {
  email: "",
  token: null,
  authFail: false,
  errMessage: null,
  errStatus: null,
  isLogined: false,
  isSns: false,
  snsType: null,
  isSNSLogin: false,
};

const login = handleActions(
  {
    [LOGIN_REQUEST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.email = action.payload.email || "";
        draft.token = action.payload.accessToken;
        draft.authFail = false;
        draft.errMessage = null;
        draft.errStatus = null;
        draft.isLogined = true;
      });
    },
    [LOGIN_REQUEST_FAILURE]: (state, action) => {
      console.log(action);
      return {
        ...state,
        authFail: true,
        token: initialState.token,
        ...(action.errStatus && { errStatus: action.errStatus }),
        ...(action.errMessage && { errMessage: action.errMessage }),
      };
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...initialState,
        };
      });
    },
  },
  initialState
);

export default login;
