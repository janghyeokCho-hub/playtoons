import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILURE] =
  createRequestActionTypes("login/REQUEST");
export const LOGIN_INIT = "login/INITIALIZE";
export const SYNC = "login/SYNC";

/* --- Actions --- */
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginInit = createAction(LOGIN_INIT);

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
};

const login = handleActions(
  {
    [LOGIN_REQUEST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.email = action.payload.email;
        draft.token = localStorage.getItem("token");
        draft.isLogined = true;
      });
    },
    [LOGIN_REQUEST_FAILURE]: (state, action) => {
      console.log(action);
      return {
        ...state,
        authFail: true,
        password: "",
        token: initialState.token,
        ...(action.errStatus && { errStatus: action.errStatus }),
        ...(action.errMessage && { errMessage: action.errMessage }),
      };
    },
    [LOGIN_INIT]: (state, action) => ({
      ...initialState,
    }),
  },
  initialState
);

export default login;
