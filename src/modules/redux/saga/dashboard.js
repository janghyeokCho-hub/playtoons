import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler, } from "@REDUX/saga/createRequestSaga";
import * as api from '@API/dashboardService';
import { GET_DASHBOARD_AUTHOR, GET_DASHBOARD_PLAN, GET_DASHBOARD_SERIES_DETAIL } from "../ducks/dashboard";
import { finishLoading, startLoading } from "../ducks/loading";

//==============================================================================
// get plan list
//==============================================================================
function createPostDetailRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        authorId: action.payload.authorId,
      };
      const response = yield call(api.getSubscribeTierAuthorIdFromServer, params);
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
// get series detail
//==============================================================================
function createSeriesDetailRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        id: action.payload.id,
      };
      const response = yield call(api.getSeriesDetailFromServer, params);
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
// get series detail
//==============================================================================
function createAuthorIdRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        id: action.payload.id,
      };
      const response = yield call(api.getAuthorIdFromServer, params);
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
  yield takeLatest(GET_DASHBOARD_PLAN, createPostDetailRequestSaga(GET_DASHBOARD_PLAN));
  yield takeLatest(GET_DASHBOARD_SERIES_DETAIL, createSeriesDetailRequestSaga(GET_DASHBOARD_SERIES_DETAIL));
  yield takeLatest(GET_DASHBOARD_AUTHOR, createAuthorIdRequestSaga(GET_DASHBOARD_AUTHOR));
}
