import { takeLatest, call, put } from "redux-saga/effects";
import { LOGIN_REQUEST, SYNC } from "@REDUX/ducks/login";
import { startLoading, finishLoading } from "@REDUX/ducks/loading";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as loginApi from "@API/loginService";

function createLoginRequestSaga(loginType, syncType) {
  const SUCCESS = `${loginType}_SUCCESS`;
  const FAILURE = `${loginType}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        yield put(startLoading(loginType));

        const response = yield call(loginApi.loginRequest, action.payload);
        // 로그인 성공 시 로컬스토리지에 token 값 저장
        if (response?.status === 200) {
          const { accessToken } = response.data;
          localStorage.setItem("token", accessToken);
          yield put({ type: SUCCESS, payload: action.payload });
        } else {
          console.log("response : ", response);
          yield put({
            type: FAILURE,
            payload: action.payload,
            error: true,
          });
        }
        yield put(finishLoading(loginType));
      } catch (e) {
        console.dir(e.response?.status);
        yield call(exceptionHandler, { e: e, redirectError: true });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
          errStatus: e.response.status,
          errMessage: e.response.data.message,
        });
      } finally {
        // loading state가 해제되지 않는 현상 수정
        yield put(finishLoading(loginType));
        yield put(finishLoading(syncType));
      }
    }
  };
}

const loginRequestSaga = createLoginRequestSaga(LOGIN_REQUEST, SYNC);

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
}
