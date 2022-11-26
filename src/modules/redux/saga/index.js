import { all } from "redux-saga/effects";
import loginSaga from "./login";
import authorSaga from "./author";
import postSaga from "./post";
import storeSaga from "./store";
import dashboardSaga from "./dashboard";

function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할을 함.
  yield all([
    loginSaga(),
    authorSaga(),
    postSaga(),
    storeSaga(),
    dashboardSaga(),
  ]);
}
export default rootSaga;
