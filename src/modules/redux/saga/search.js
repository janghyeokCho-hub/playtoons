import { takeLatest, call, put } from "redux-saga/effects";
import { SET_SEARCH } from "@REDUX/ducks/search";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as searchApi from "@API/searchService";

function createSetSearchRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const payload = {
        keyword: action.payload,
      };
      const params = {
        keyword: action.payload,
        orderKey: "rank",
        order: "DESC",
      };
      // productTypes
      const postResp = yield call(searchApi.getSearchPost, params);
      if (postResp?.status === 200) {
        payload.posts = postResp?.data?.posts;
        payload.postsMeta = postResp?.data?.meta;
      }

      const seriesResp = yield call(searchApi.getSearchSeries, {
        keyword: action.payload,
      });
      if (seriesResp?.status === 200) {
        payload.series = seriesResp?.data?.series;
        payload.seriesMeta = seriesResp?.data?.meta;
      }

      const authorResp = yield call(searchApi.getSearchAuthor, {
        post: { keyword: action.payload },
      });
      if (authorResp?.status === 200) {
        payload.authors = authorResp?.data?.authors;
        payload.authorsMeta = authorResp?.data?.meta;
      }

      const tagsResp = yield call(searchApi.getSearchTags, {
        post: { keyword: action.payload },
      });
      if (tagsResp?.status === 200) {
        payload.tags = tagsResp?.data?.tags;
        payload.tagsMeta = tagsResp?.data?.meta;
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

const setSearchSaga = createSetSearchRequestSaga(SET_SEARCH);

export default function* searchSaga() {
  yield takeLatest(SET_SEARCH, setSearchSaga);
}
