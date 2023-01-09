import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SHOW_TOAST, HIDE_TOAST] = createRequestActionTypes("toast");

/* --- Actions --- */
export const showToastAction = createAction(SHOW_TOAST);
export const hideToastAction = createAction(HIDE_TOAST);


/**
 * login reducer 초기값
 */
 const initialState = {
  toast: null,
}

const popup = handleActions(
  {
    [SHOW_TOAST]: (state, action) => {
      return produce(state, (draft) => {
        draft.toast = action.payload;
      });
    },
    [HIDE_TOAST]: (state, _) => {
      return {
        ...state,
        toast: null
      };
    },
  },
  initialState
);

export default popup;

