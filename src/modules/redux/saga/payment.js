import { setPaymentChargeToServer } from "@/services/paymentService";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import { call, put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "../ducks/loading";
import { SET_PAYMENT_CHARGE } from "../ducks/payment";

//==============================================================================
// payment charge
//==============================================================================
function createPaymentChargeRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        priceId: action.payload.id,
      };
      const response = yield call(setPaymentChargeToServer, params);
      if (response?.status === 201) {
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



export default function* paymentSaga() {
  yield takeLatest(SET_PAYMENT_CHARGE, createPaymentChargeRequestSaga(SET_PAYMENT_CHARGE));
}
