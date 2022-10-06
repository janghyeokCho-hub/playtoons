import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_FAILURE,
] = createRequestActionTypes("author/GET_AUTHOR_LIST");

export const [
  GET_AUTHOR_RECENT,
  GET_AUTHOR_RECENT_SUCCESS,
  GET_AUTHOR_RECENT_FAILURE,
] = createRequestActionTypes("author/GET_AUTHOR_RECENT");

export const [
  SET_CURRENT_AUTHOR,
  SET_CURRENT_AUTHOR_SUCCESS,
  SET_CURRENT_AUTHOR_FAILURE,
] = createRequestActionTypes("author/SET_CURRENT_AUTHOR");

export const [
  SET_AUTHOR_PLANS,
  SET_AUTHOR_PLANS_SUCCESS,
  SET_AUTHOR_PLANS_FAILURE,
] = createRequestActionTypes("author/SET_AUTHOR_PLANS");

/* --- Actions --- */
export const getAuthorList = createAction(GET_AUTHOR_LIST);
export const getAuthorRecent = createAction(GET_AUTHOR_RECENT);
export const setCurrentAuthor = createAction(SET_CURRENT_AUTHOR);
export const setAuthorPlans = createAction(SET_AUTHOR_PLANS);

/**
 * login reducer 초기값
 */
const initialState = {
  authorsMeta: null,
  authors: [],
  recentsMeta: null,
  recents: [],
  currentAuthor: null,
};

const author = handleActions(
  {
    [GET_AUTHOR_LIST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        console.log("GET_AUTHOR_LIST_SUCCESS : ", action.payload);
        draft.authorsMeta = action.payload.meta || null;
        draft.authors = action.payload.authors || [];
      });
    },
    [GET_AUTHOR_RECENT_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        console.log("GET_AUTHOR_RECENT_SUCCESS : ", action.payload);
        draft.recentsMeta = action.payload.meta || null;
        draft.recents = action.payload.authors || [];
      });
    },
    [SET_CURRENT_AUTHOR_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("SET_CURRENT_AUTHOR : ", action.payload);
        draft.currentAuthor = action.payload;
      });
    },
    [SET_AUTHOR_PLANS_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log("SET_CURRENT_AUTHOR : ", action.payload);
        draft.currentAuthor = {
          ...draft.currentAuthor,
          plan: action.payload,
        };
        // draft.currentAuthor = action.payload;
      });
    },
  },
  initialState
);

export default author;
