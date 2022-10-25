import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as postApi from "@API/postService";
import * as reactionApi from "@API/reactionService";
import {
  AUTHOR_MINE,
  EDIT_POST,
  POST_DETAIL,
  GET_CURRENT_POST,
  GET_POST_REACTION,
} from "../ducks/post";
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

      const response = yield call(
        postApi.getPostIdMineFromServer,
        action.payload
      );
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      } else {
        yield put({
          type: `${type}_FAILURE`,
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
// get current post
//==============================================================================
function createCurrentPostRequestSaga(type, func) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      /** 게시글 상세 조회 */
      const response = yield call(
        postApi.getPostDetailFromServer,
        action.payload
      );
      if (response?.status === 200) {
        const payload = response.data?.post;

        /** 게시글 조회 수 증가 */
        const viewResponse = yield call(postApi.setPostView, payload.id);
        console.log("viewResponse : ", viewResponse);

        /** 게시글의 content 조회 */
        const contentResponse = yield call(postApi.getPostContent, payload.id);
        if (contentResponse?.status === 200) {
          payload.content = response.data?.content;
          payload.isLock = false;
        } else {
          payload.content = null;
          payload.isLock = true;
        }

        /** 게시글의 댓글 목록 조회 (최초 3개만) */
        const reactionResponse = yield call(reactionApi.getReaction, {
          postId: payload.id,
          limit: 3,
        });

        if (reactionResponse?.status === 200) {
          payload.reactions = reactionResponse.data?.reactions || [];
        } else {
          payload.reactions = [];
        }

        yield put({
          type: `${type}_SUCCESS`,
          payload: payload,
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

/** 게시글의 댓글 더 보기 누를 경우 실행 */
//==============================================================================
// get current post reactions
//==============================================================================
function createPostReactionRequestSaga(type, func) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      /** 게시글의 댓글 목록 */
      const response = yield call(reactionApi.getReaction, action.payload);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response?.data,
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
  yield takeLatest(
    GET_CURRENT_POST,
    createCurrentPostRequestSaga(GET_CURRENT_POST)
  );
  yield takeLatest(
    GET_POST_REACTION,
    createPostReactionRequestSaga(GET_POST_REACTION)
  );
}
