import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";
import { LOGOUT_REQUEST_SUCCESS } from "./login";

/* --- Action Types --- */
export const [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE] =
  createRequestActionTypes("post/EDIT");
export const [UPLOAD_POST, UPLOAD_POST_SUCCESS, UPLOAD_POST_FAILURE] =
  createRequestActionTypes("post/UPLOAD");
export const [POST_DETAIL, POST_DETAIL_SUCCESS, POST_DETAIL_FAILURE] =
  createRequestActionTypes("post/DETAIL");
export const [AUTHOR_MINE, AUTHOR_MINE_SUCCESS, AUTHOR_MINE_FAILURE] =
  createRequestActionTypes("author/MINE");
export const [
  GET_CURRENT_POST,
  GET_CURRENT_POST_SUCCESS,
  GET_CURRENT_POST_FAILURE,
] = createRequestActionTypes("post/GET_CURRENT_POST");
export const [
  GET_POST_REACTION,
  GET_POST_REACTION_SUCCESS,
  GET_POST_REACTION_FAILURE,
] = createRequestActionTypes("post/GET_POST_REACTION");

/* --- Actions --- */
export const setPostEditAction = createAction(EDIT_POST);
export const getPostDetailAction = createAction(POST_DETAIL);
export const getAuthorMineAction = createAction(AUTHOR_MINE);
export const getCurrentPost = createAction(GET_CURRENT_POST);
export const getPostReaction = createAction(GET_POST_REACTION);

const initialState = {
  post: null,
  authorMine: null,
  reactions: [],
  timelines: [],
  currentPost: null,
};

const post = handleActions(
  {
    [EDIT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.post = action.payload.post;
      });
    },
    [POST_DETAIL_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.post = action.payload.post;
      });
    },
    [AUTHOR_MINE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.authorMine = action.payload;
      });
    },
    [AUTHOR_MINE]: (state, action) => {
      console.log("AUTHOR_MINE", action.payload);
    },
    [GET_CURRENT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentPost = action.payload;
      });
    },
    [GET_POST_REACTION_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.currentPost.reactions = action.payload.reactions;
      });
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {
      //2022.11.01 lhk- logout 시 author 정보도 초기화
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
