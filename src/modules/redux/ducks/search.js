import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SET_SEARCH, SET_SEARCH_SUCCESS, SET_SEARCH_FAILURE] =
  createRequestActionTypes("search/SET_SEARCH");

/* --- Actions --- */
export const setSearch = createAction(SET_SEARCH);

/**
 * login reducer 초기값
 */
const initialState = {
  posts: [],
  postsMeta: null,
  series: [],
  seriesMeta: null,
  authors: [],
  authorsMeta: null,
};

const search = handleActions(
  {
    [SET_SEARCH_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.posts = action.payload?.posts;
        draft.postsMeta = action.payload?.postsMeta;
        draft.series = action.payload?.series;
        draft.seriesMeta = action.payload?.seriesMeta;
        draft.authors = action.payload?.authors;
        draft.authorsMeta = action.payload?.authorsMeta;
      });
    },
  },
  initialState
);

export default search;
