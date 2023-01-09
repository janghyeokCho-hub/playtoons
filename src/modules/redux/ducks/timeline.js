import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

/* --- Action Types --- */
const [SET_TIMELINE, INIT_TIMELINE] = createRequestActionTypes("post/SET_TIMELINE");
const [SET_REFRESH, INIT_REFRESH] = createRequestActionTypes("post/SET_REFRESH");

/* --- Actions --- */
export const setTimelineAction = createAction(SET_TIMELINE);
export const initTimelineAction = createAction(INIT_TIMELINE);
export const setRefreshAction = createAction(SET_REFRESH);
export const initRefreshAction = createAction(INIT_REFRESH);

const initialState = {
  timeline: null,
  refresh: null,
};

const post = handleActions(
  {
    [SET_TIMELINE]: (state, action) => {
      return produce(state, (draft) => {
        draft.timeline = action.payload; //timeline item
      });
    },
    [INIT_TIMELINE]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          timeline: null,
        };
      });
    },
    [SET_REFRESH]: (state, action) => {
      return produce(state, (draft) => {
        draft.refresh = action.payload; //{type: 'id', id: 'postId'}
      });
    },
    [INIT_REFRESH]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          refresh: null,
        };
      });
    },
  },
  initialState
);

export default post;
