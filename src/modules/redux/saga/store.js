import { takeLatest, call, put } from "redux-saga/effects";
import { SET_STORE } from "@REDUX/ducks/store";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as storeApi from "@API/storeService";
import { getHome, getHomeTop } from "@API/homeService";

function createSetStoreRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const payload = {};
      // productTypes
      const typesResp = yield call(storeApi.getProductType);
      if (typesResp?.status === 200) {
        payload.productTypes = typesResp.data?.productTypes;
      }

      // banner
      const bannerResp = yield call(getHomeTop, "shop");
      if (typesResp?.status === 200) {
        payload.banners = bannerResp.data?.contents;
      }

      // contents
      const contentsResp = yield call(getHome, "shop");
      if (typesResp?.status === 200) {
        payload.contents = contentsResp.data?.contents;
      }

      yield put({
        type: SUCCESS,
        payload: payload,
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
  };
}

const setStoreSaga = createSetStoreRequestSaga(SET_STORE);

export default function* storeSaga() {
  yield takeLatest(SET_STORE, setStoreSaga);
}
