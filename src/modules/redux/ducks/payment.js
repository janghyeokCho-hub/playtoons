import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [INIT_PAYMENT_PLAN_ITEM, SET_PAYMENT_PLAN_ITEM] = createRequestActionTypes("payment/PLAN_ITEM");
export const [INIT_PAYMENT_CHARGE] = createRequestActionTypes("payment/INIT_PAYMENT_CHARGE");
export const [SET_PAYMENT_CHARGE, SET_PAYMENT_CHARGE_SUCCESS, SET_PAYMENT_CHARGE_FAILURE] = createRequestActionTypes("payment/POST_PAYMENT_CHARGE");

/* --- Actions --- */
export const initPaymentPlanItemAction = createAction(INIT_PAYMENT_PLAN_ITEM);
export const setPaymentPlanItemAction = createAction(SET_PAYMENT_PLAN_ITEM);
export const setPaymentChargeAction = createAction(SET_PAYMENT_CHARGE);
export const initPaymentChargeAction = createAction(INIT_PAYMENT_CHARGE);


/**
 * login reducer 초기값
 */
 const initialState = {
  planItem: null,
  chargeUpload: null,
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
    [INIT_PAYMENT_CHARGE]: (state, _) => {
      return {
        ...state,
        chargeUpload: null
      };
    },
    [SET_PAYMENT_CHARGE]: (state, action) => {
      console.log('ducks', state, action);
    },
    [SET_PAYMENT_CHARGE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.chargeUpload = action.payload;
      });
    },
    [SET_PAYMENT_CHARGE_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.chargeUpload = action.payload;
      });
    },
  },
  initialState
);

export default payment;

