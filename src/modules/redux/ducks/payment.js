import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [INIT_PAYMENT_PLAN_ITEM, SET_PAYMENT_PLAN_ITEM] = createRequestActionTypes("payment/PLAN_ITEM");

/* --- Actions --- */
export const initPaymentPlanItemAction = createAction(INIT_PAYMENT_PLAN_ITEM);
export const setPaymentPlanItemAction = createAction(SET_PAYMENT_PLAN_ITEM);


/**
 * login reducer 초기값
 */
 const initialState = {
  planItem: null,
}

const payment = handleActions(
  {
    [INIT_PAYMENT_PLAN_ITEM]: (state, _) => {
      return {
        ...state,
        planItem: null
      };
    },
    [SET_PAYMENT_PLAN_ITEM]: (state, action) => {
      return produce(state, (draft) => {
        draft.planItem = action.payload;
      });
    },
  },
  initialState
);

export default payment;

