import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [POPUP, POPUP_SHOW, POPUP_HIDE] =
  createRequestActionTypes("login/REQUEST");

/* --- Actions --- */
export const loginRequest = createAction(POPUP);


export const MODAL_DESIGN_TYPE = {
  DEFAULT: 0,
  HIDE_CLOSE_BUTTON: 1,
};

/**
 * login reducer 초기값
 */
 const initialState = {
  show : false,
  contents : <></>,
  callback : null,
  type: MODAL_DESIGN_TYPE.DEFAULT,
}

const popup = handleActions(
  {
    [POPUP_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        console.log(action);
        
      });
    },
    [POPUP_HIDE]: (state, action) => {
      console.log(action);
      return initialState;
    },
  },
  initialState
);

export default popup;

