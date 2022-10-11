import { call, put, takeLatest } from "redux-saga/effects";
import { createSaga, } from "@REDUX/saga/createRequestSaga";
import * as postApi from '@API/postService';
import { EDIT_POST, POST_DETAIL } from "../ducks/post";

//==============================================================================
// edit post
//==============================================================================
function createEditPostRequestSaga(type) {
  return function* (action) {
    const response = yield call(postApi.editPostToServer);
    console.log("createEditPostRequestSaga response : ", response);
    if (response?.status === 200) {
      yield put({
        type: `${type}_SUCCESS`,
        payload: response.data,
      });
    }
  };
}

//==============================================================================
// get post detail
//==============================================================================
function createPostDetailRequestSaga(type) {
  return function* (action) {
    const params = {
      id: action.payload.id,
    };
    const response = yield call(postApi.getPostDetailFromServer, params);
    console.log("createPostDetailRequestSaga response : ", response);
    if (response?.status === 200) {
      yield put({
        type: `${type}_SUCCESS`,
        payload: response.data,
      });
    }

   
  };
}



export default function* postSaga() {
  yield takeLatest(EDIT_POST, createSaga(EDIT_POST, createEditPostRequestSaga));
  yield takeLatest(POST_DETAIL, createSaga(POST_DETAIL, createPostDetailRequestSaga));
}
