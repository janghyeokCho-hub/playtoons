import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [GET_DASHBOARD_PLAN, GET_DASHBOARD_PLAN_SUCCESS, GET_DASHBOARD_PLAN_FAILURE] = createRequestActionTypes("dashboard/plan/GET");
export const [GET_DASHBOARD_SERIES_DETAIL, GET_DASHBOARD_SERIES_DETAIL_SUCCESS, GET_DASHBOARD_SERIES_DETAIL_FAILURE] = createRequestActionTypes("dashboard/series/detail/GET");


/* --- Actions --- */
export const getSubscribeTierAction = createAction(GET_DASHBOARD_PLAN);
export const getSeriedDetailAction = createAction(GET_DASHBOARD_SERIES_DETAIL);

const initialState = {
  subscribeTiers: null,
  subscribeTiersMeta: null,
  series: null,
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
    [GET_DASHBOARD_SERIES_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('GET_DASHBOARD_SERIES_DETAIL_SUCCESS', action.payload);
        draft.series = action.payload.series;
      });
    },

  },
  initialState
);

export default post;
