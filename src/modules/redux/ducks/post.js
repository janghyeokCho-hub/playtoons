import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE] = createRequestActionTypes("post/EDIT");
export const [POST_DETAIL, POST_DETAIL_SUCCESS, POST_DETAIL_FAILURE] = createRequestActionTypes("post/DETAIL");


/* --- Actions --- */
export const setPostEditAction = createAction(EDIT_POST);
export const getPostDetailAction = createAction(POST_DETAIL);

const initialState = {
  post: null,
  reactions: [],
  timelines: []
};

const post = handleActions(
  {
    [EDIT_POST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        console.log('post edit', action.payload);
        draft.post = action.payload.post;
      });
    },
    [POST_DETAIL_SUCCESS]: (state, action) => {
      console.log('post detail', action.payload);
      return produce(state, (draft) => {
        console.log('post detail', action.payload);
        draft.post = action.payload.post;
      });
    },

  },
  initialState
);

export default post;
