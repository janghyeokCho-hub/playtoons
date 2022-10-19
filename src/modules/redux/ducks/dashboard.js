import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [GET_DASHBOARD_PLAN, GET_DASHBOARD_PLAN_SUCCESS, GET_DASHBOARD_PLAN_FAILURE] = createRequestActionTypes("dashboard/plan/GET");


/* --- Actions --- */
export const getSubscribeTierAction = createAction(GET_DASHBOARD_PLAN);

const initialState = {
  subscribeTiers: null,
  subscribeTiersMeta: null,
};

const post = handleActions(
  {
    [GET_DASHBOARD_PLAN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('GET_DASHBOARD_PLAN_SUCCESS', action.payload);
        draft.subscribeTiers = action.payload.subscribeTiers;
        draft.subscribeTiersMeta = action.payload.meta;
      });
    },

  },
  initialState
);

export default post;
