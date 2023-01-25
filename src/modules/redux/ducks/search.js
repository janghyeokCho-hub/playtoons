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
  keyword: null,
  totalItems: 0,
  posts: [],
  postsMeta: null,
  series: [],
  seriesMeta: null,
  authors: [],
  authorsMeta: null,
  tags: [],
  tagsMeta: null,
  totalProductItems: 0,
  productCategories: [],
};

const search = handleActions(
  {
    [SET_SEARCH_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.keyword = action.payload?.keyword;
        draft.posts = action.payload?.posts;
        draft.postsMeta = action.payload?.postsMeta;
        draft.series = action.payload?.series;
        draft.seriesMeta = action.payload?.seriesMeta;
        draft.authors = action.payload?.authors;
        draft.authorsMeta = action.payload?.authorsMeta;
        draft.tags = action.payload?.tags;
        draft.tagsMeta = action.payload?.tagsMeta;
        draft.productCategories = action.payload?.productCategories;
        draft.totalProductItems = action.payload?.totalProductItems;
        // totalItems에 productsMeta.totalItems는 미포함
        draft.totalItems =
          action.payload?.postsMeta?.totalItems +
          action.payload?.seriesMeta?.totalItems +
          action.payload?.authorsMeta?.totalItems +
          action.payload?.tagsMeta?.totalItems;
      });
    },
  },
  initialState
);

export default search;
