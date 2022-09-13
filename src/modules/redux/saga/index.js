import { all } from "redux-saga/effects";
import loginSaga from "./login";

function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할을 함.
  yield all([loginSaga()]);
}
export default rootSaga;
