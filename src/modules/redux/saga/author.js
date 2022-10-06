import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_AUTHOR_LIST,
  GET_AUTHOR_RECENT,
  SET_CURRENT_AUTHOR,
  SET_AUTHOR_PLANS,
} from "@REDUX/ducks/author";
import { startLoading, finishLoading } from "@REDUX/ducks/loading";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as authorApi from "@API/authorService";

function createGetAuthorListRequestSaga(type) {
  console.log("createGetAuthorListRequestSaga");
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put(startLoading(type));
      // 작가 리스트
      const response = yield call(authorApi.getAuthorList);
      console.log("getAuthorList response : ", response);
      if (response?.status === 200) {
        yield put({
          type: SUCCESS,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: FAILURE,
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
const getAuthorListSaga = createGetAuthorListRequestSaga(GET_AUTHOR_LIST);

function createGetAuthorRecentRequestSaga(type) {
  console.log("createGetAuthorRecentRequestSaga");
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put(startLoading(type));
      // 작가 리스트
      const response = yield call(authorApi.getAuthorRecent);
      console.log("getAuthorRecent response : ", response);
      if (response?.status === 200) {
        yield put({
          type: SUCCESS,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: FAILURE,
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

const getAuthorRecentSaga = createGetAuthorRecentRequestSaga(GET_AUTHOR_RECENT);

function createSetCurrentAuthorRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        const response = yield call(authorApi.setViewAuthor, action.payload.id);
        console.log("getAuthor response : ", response);

        yield put({
          type: SUCCESS,
          payload: action.payload,
        });
      } catch (e) {
        console.dir(e);
        yield call(exceptionHandler, { e: e, redirectError: false });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
        });
      }
    } else {
      yield put({
        type: SUCCESS,
        payload: action.payload,
      });
    }
  };
}

const setCurrentAuthorSaga =
  createSetCurrentAuthorRequestSaga(SET_CURRENT_AUTHOR);

function createSetAuthorPlansRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        const params = {
          authorId: action.payload.authorId,
          keyword: action.payload.keyword || null,
          orderKey: action.payload.orderKey || null,
          order: action.payload.order || null, // ASC || DESC
          page: action.payload.page || null,
          limit: action.payload.limit || null,
        };
        const response = yield call(authorApi.getAuthorPlans, params);
        console.log("getAuthorPlans response : ", response);
        if (response.status === 200) {
          yield put({
            type: SUCCESS,
            payload: response.data,
          });
        }
      } catch (e) {
        console.dir(e);
        yield call(exceptionHandler, { e: e, redirectError: false });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
        });
      }
    } else {
      yield put({
        type: SUCCESS,
        payload: action.payload,
      });
    }
  };
}

const setAuthorPlansSaga = createSetAuthorPlansRequestSaga(SET_AUTHOR_PLANS);

export default function* authorSaga() {
  yield takeLatest(GET_AUTHOR_LIST, getAuthorListSaga);
  yield takeLatest(GET_AUTHOR_RECENT, getAuthorRecentSaga);
  yield takeLatest(SET_CURRENT_AUTHOR, setCurrentAuthorSaga);
  yield takeLatest(SET_AUTHOR_PLANS, setAuthorPlansSaga);
}
