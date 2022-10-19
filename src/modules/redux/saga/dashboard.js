import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler, } from "@REDUX/saga/createRequestSaga";
import * as api from '@API/dashboardService';
import { GET_DASHBOARD_PLAN } from "../ducks/dashboard";
import { finishLoading, startLoading } from "../ducks/loading";

//==============================================================================
// get plan detail
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


export default function* postSaga() {
  yield takeLatest(GET_DASHBOARD_PLAN, createPostDetailRequestSaga(GET_DASHBOARD_PLAN));
}
