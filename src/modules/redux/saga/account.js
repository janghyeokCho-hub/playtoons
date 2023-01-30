import { updatAccountsToServer, updateAccount } from "@/services/accountService";
import { setFileToServer } from "@/services/dashboardService";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import { call, put, takeLatest } from "redux-saga/effects";
import { SET_ACCOUNT } from "../ducks/account";
import { finishLoading, startLoading } from "../ducks/loading";

//==============================================================================
// payment charge
//==============================================================================
function createAccount(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

        const params = {
          name: action.payload.name,
          // profileImage: "string",
          // companyName: "string",
          // gender: "male",
          // birth: "2023-01-30T02:29:32.125Z",
          // country: "string",
          // language: "string",
          // region: "string"
        };

       // profile upload
       if( action.payload.fileInfoProfile !== undefined ){
        const formData = new FormData();
        formData.append("authorId", "");
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "profile"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoProfile);
        const reponse = yield call(setFileToServer, formData);
        if (reponse?.status === 201) {
          params.profileImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'profile'
            }
          });
          return;
        }
      }

      delete params["fileInfoProfile"];
      
      const response = yield call(updatAccountsToServer, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
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



export default function* accountSaga() {
  yield takeLatest(SET_ACCOUNT, createAccount(SET_ACCOUNT));
}
