import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler, } from "@REDUX/saga/createRequestSaga";
import * as api from '@API/dashboardService';
import { EDIT_DASHBOARD_PROFILE, GET_DASHBOARD_AUTHOR, GET_DASHBOARD_PLAN, GET_DASHBOARD_SERIES_DETAIL, GET_DASHBOARD_TYPE } from "../ducks/dashboard";
import { finishLoading, startLoading } from "../ducks/loading";
import { getErrorMessageFromResultCode } from "@/common/common";

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
//==============================================================================
// get post type
//==============================================================================
function createTypeRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const response = yield call(api.getPostTypeListFromServer);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: getErrorMessageFromResultCode(response.data),
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: e,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// set series 
//==============================================================================
function createSeriesRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const response = yield call(api.getPostTypeListFromServer);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }
      else{
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
        payload: e,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// edit profile
//==============================================================================
function createEditProfileRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      let params = {
        ...action.payload
      };
      // profile upload
      if( action.payload.fileInfoProfile !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "profile"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoProfile);
        const reponse = yield call(api.setFileToServer, formData);
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

      // background upload
      if( action.payload.fileInfoBackground !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "background"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoBackground);
        const response = yield call(api.setFileToServer, formData);
        if (response?.status === 201) {
          params.backgroundImage = response?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...response,
              type: 'background'
            }
          });
          return;
        }
      }

      // edit profile
      delete params["authorId"];
      delete params["fileInfoProfile"];
      delete params["fileInfoBackground"];
      delete params["rating"]; //TODO rating 있어야 하는 건가? 넣으면 에러 
      
      const response = yield call(api.editAuthorIdToServer, action.payload.authorId, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'edit'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: e,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}


export default function* dashboardSaga() {
  yield takeLatest(GET_DASHBOARD_PLAN, createPostDetailRequestSaga(GET_DASHBOARD_PLAN));
  yield takeLatest(GET_DASHBOARD_SERIES_DETAIL, createSeriesDetailRequestSaga(GET_DASHBOARD_SERIES_DETAIL));
  yield takeLatest(GET_DASHBOARD_AUTHOR, createAuthorIdRequestSaga(GET_DASHBOARD_AUTHOR));
  yield takeLatest(GET_DASHBOARD_TYPE, createTypeRequestSaga(GET_DASHBOARD_TYPE));
  yield takeLatest(EDIT_DASHBOARD_PROFILE, createEditProfileRequestSaga(EDIT_DASHBOARD_PROFILE));
}
