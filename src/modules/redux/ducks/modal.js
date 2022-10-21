import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [POPUP, POPUP_SHOW, POPUP_HIDE] = createRequestActionTypes("popup");

/* --- Actions --- */
export const showModal = createAction(POPUP_SHOW);
export const hideModal = createAction(POPUP_HIDE);


/**
 * login reducer 초기값
 */
 const initialState = {
  show : false,
  contents : <></>,
  callback : null,
}

const popup = handleActions(
  {
    [POPUP_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        console.log('POPUP_SHOW', action);
        draft.show = true;
        draft.contents = action.payload.contents;
        draft.callback = action.payload.callback;
      });
    },
    [POPUP_HIDE]: (state, action) => {
      console.log('POPUP_HIDE', action);
      return initialState;
    },
  },
  initialState
);

export default popup;

