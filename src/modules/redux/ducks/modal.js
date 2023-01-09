import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [POPUP, POPUP_SHOW, POPUP_HIDE] = createRequestActionTypes("popup");
export const [SHOW_TOAST, HIDE_TOAST] = createRequestActionTypes("toast");

/* --- Actions --- */
export const showModal = createAction(POPUP_SHOW);
export const hideModal = createAction(POPUP_HIDE);
export const showToastAction = createAction(SHOW_TOAST);
export const hideToastAction = createAction(HIDE_TOAST);


/**
 * login reducer 초기값
 */
 const initialState = {
  show : false,
  title: null,
  contents : <></>,
  callback : null,
  className : '',
  toast: null,
}

const popup = handleActions(
  {
    [POPUP_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        draft.show = true;
        draft.title = action.payload.title;
        draft.contents = action.payload.contents;
        draft.callback = action.payload.callback;
        draft.className = action.payload.className;
      });
    },
    [POPUP_HIDE]: (state, action) => {
      state.callback?.();
      return initialState;
    },
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

