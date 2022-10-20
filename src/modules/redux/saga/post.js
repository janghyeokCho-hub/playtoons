import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler, } from "@REDUX/saga/createRequestSaga";
import * as postApi from '@API/postService';
import { AUTHOR_MINE, EDIT_POST, POST_DETAIL } from "../ducks/post";
import { finishLoading, startLoading } from "../ducks/loading";

//==============================================================================
// edit post
//==============================================================================
function createEditPostRequestSaga(type, func) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const response = yield call(postApi.editPostToServer);
      console.log("createEditPostRequestSaga response : ", response);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: action.payload,
        error: true,
        errStatus: e.response.status,
        errMessage: e.response.data.message,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}

//==============================================================================
// get post detail
//==============================================================================
function createPostDetailRequestSaga(type, func) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        id: action.payload.id,
      };
      const response = yield call(postApi.getPostIdMineFromServer, params);
      console.log("createPostDetailRequestSaga response : ", response);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: action.payload,
        error: true,
        errStatus: e.response.status,
        errMessage: e.response.data.message,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}

//==============================================================================
// get author mine
//==============================================================================
function createAuthorMineRequestSaga(type, func) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        // id: action.payload.id,
      };
      const response = yield call(postApi.getAuthorMineFromServer, params);
      console.log("createAuthorMineRequestSaga response : ", response);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: action.payload,
        error: true,
        errStatus: e.response.status,
        errMessage: e.response.data.message,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}



export default function* postSaga() {
  yield takeLatest(EDIT_POST, createEditPostRequestSaga(EDIT_POST));
  yield takeLatest(POST_DETAIL, createPostDetailRequestSaga(POST_DETAIL));
  yield takeLatest(AUTHOR_MINE, createAuthorMineRequestSaga(AUTHOR_MINE));
}
