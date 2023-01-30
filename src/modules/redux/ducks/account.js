import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { createRequestActionTypes } from "../saga/createRequestSaga";

/* --- Action Types --- */
export const [SET_ACCOUNT, SET_ACCOUNT_SUCCESS, SET_ACCOUNT_FAILURE] = createRequestActionTypes("profile/POST_ACCOUNT");
export const [INIT_ACCOUNT] = createRequestActionTypes("profile/INIT_ACCOUNT");

/* --- Actions --- */
export const setAccountAction = createAction(SET_ACCOUNT);
export const initAccountAction = createAction(INIT_ACCOUNT);

/**
 * reducer 초기값
 */
const initialState = {
  accountUpload: null,
};

const account = handleActions(
  {
    [INIT_ACCOUNT]: (state, _) => {
      return produce(state, (draft) => {
        draft.accountUpload = null;
      });
    },
    [SET_ACCOUNT_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.accountUpload = action.payload;
      });
    },
    [SET_ACCOUNT_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.accountUpload = action.payload;
      });
    },
  },
  initialState
);

export default account;
