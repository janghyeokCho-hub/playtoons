import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";
import { LOGOUT_REQUEST_SUCCESS } from "./login";

/* --- Action Types --- */
export const [GET_DASHBOARD_PLAN, GET_DASHBOARD_PLAN_SUCCESS, GET_DASHBOARD_PLAN_FAILURE] = createRequestActionTypes("dashboard/plan/GET");
export const [GET_DASHBOARD_SERIES_DETAIL, GET_DASHBOARD_SERIES_DETAIL_SUCCESS, GET_DASHBOARD_SERIES_DETAIL_FAILURE] = createRequestActionTypes("dashboard/series/detail/GET");
export const [GET_DASHBOARD_AUTHOR, GET_DASHBOARD_AUTHOR_SUCCESS, GET_DASHBOARD_AUTHOR_FAILURE] = createRequestActionTypes("dashboard/author/GET");
export const [GET_DASHBOARD_REACTION, GET_DASHBOARD_REACTION_SUCCESS, GET_DASHBOARD_REACTION_FAILURE] = createRequestActionTypes("dashboard/reaction/GET");
export const [GET_DASHBOARD_TYPE, GET_DASHBOARD_TYPE_SUCCESS, GET_DASHBOARD_TYPE_FAILURE] = createRequestActionTypes("GET_dashboardType");
export const [INIT_DASHBOARD_SERIES_DETAIL] = createRequestActionTypes("INIT/dashboard/series/detail");
export const [SET_DASHBOARD_SALES, INIT_DASHBOARD_SALES] = createRequestActionTypes("SET/dashboard/sales");
export const [SET_DASHBOARD_SERIES, SET_DASHBOARD_SERIES_SUCCESS, SET_DASHBOARD_SERIES_FAILURE] = createRequestActionTypes("POST_postSeries");
export const [EDIT_DASHBOARD_PROFILE, EDIT_DASHBOARD_PROFILE_SUCCESS, EDIT_DASHBOARD_PROFILE_FAILURE] = createRequestActionTypes("PATCH_author");
export const [INIT_EDIT_DASHBOARD_PROFILE] = createRequestActionTypes("INIT_PATCH_author");


/* --- Actions --- */
export const getSubscribeTierAction = createAction(GET_DASHBOARD_PLAN);
export const getSeriedDetailAction = createAction(GET_DASHBOARD_SERIES_DETAIL);
export const initSeriedDetailAction = createAction(INIT_DASHBOARD_SERIES_DETAIL);
export const setSalesIdAction = createAction(SET_DASHBOARD_SALES);
export const initSalesIdAction = createAction(INIT_DASHBOARD_SALES);
export const getAuthorIdAction = createAction(GET_DASHBOARD_AUTHOR);
export const getReactionMineAction = createAction(GET_DASHBOARD_REACTION);
export const getTypeAction = createAction(GET_DASHBOARD_TYPE);
export const setSeriesAction = createAction(SET_DASHBOARD_SERIES);
export const editProfileAction = createAction(EDIT_DASHBOARD_PROFILE);
export const initProfileAction = createAction(INIT_EDIT_DASHBOARD_PROFILE);

const initialState = {
  subscribeTiers: null,
  subscribeTiersMeta: null,
  series: null,
  author: null,
  reaction: null,
  salesId: null,
  types: null,
  profile: null,
};

const post = handleActions(
  {
    [EDIT_DASHBOARD_PROFILE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    },
    [EDIT_DASHBOARD_PROFILE_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    },
    [INIT_EDIT_DASHBOARD_PROFILE]: (state, action) => {
      return produce(state, (_) => {
        return {
          ...state,
          profile: null,          
        };
      });
    },
    [GET_DASHBOARD_PLAN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiers = action.payload.subscribeTiers;
        draft.subscribeTiersMeta = action.payload.meta;
      });
    },
    [GET_DASHBOARD_SERIES_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.series = action.payload.series;
      });
    },
    [GET_DASHBOARD_AUTHOR_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.author = action.payload.author;
      });
    },
    [GET_DASHBOARD_TYPE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.types = action.payload;
      });
    },
    [SET_DASHBOARD_SERIES_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.types = action.payload;
      });
    },
    [SET_DASHBOARD_SALES]: (state, action) => {
      return produce(state, (draft) => {
        draft.salesId = action.payload.salesId;
      });
    },
    [INIT_DASHBOARD_SALES]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          salesId: null,          
        };
      });
    },
    [INIT_DASHBOARD_SERIES_DETAIL]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          series: null,          
        };
      });
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {   //2022.11.01 lhk- logout 시 author 정보도 초기화
      return produce(state, (_) => {
        return {
          ...initialState,
        };
      });
    },
  },
  initialState
);

export default post;
