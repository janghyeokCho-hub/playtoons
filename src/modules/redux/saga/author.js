import { takeLatest, call, put } from "redux-saga/effects";
import { GET_AUTHOR_LIST, SET_CURRENT_AUTHOR } from "@REDUX/ducks/author";
import { startLoading, finishLoading } from "@REDUX/ducks/loading";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as authorApi from "@API/authorService";
import * as postApi from "@API/postService";

function createGetAuthorListRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put(startLoading(type));
      // 작가 리스트
      const authors = yield call(authorApi.getCurationList);
      if (authors?.status === 200) {
        const payload = {
          authorsMeta: authors?.data?.meta,
          authors: authors?.data?.authors,
        };
        const recents = yield call(authorApi.getAuthorRecent);

        if (recents?.status === 200) {
          payload.recents = recents?.data?.authors;
          payload.recentsMeta = recents?.data?.meta;
        }

        yield put({
          type: SUCCESS,
          payload: payload,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: FAILURE,
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
const getAuthorListSaga = createGetAuthorListRequestSaga(GET_AUTHOR_LIST);

function createSetCurrentAuthorRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        yield call(authorApi.setViewAuthor, action.payload);
        const response = yield call(authorApi.getAuthor, action.payload);

        if (response.status === 200) {
          const payload = response?.data?.author;
          /** 해당 작가의 게시물 목록 */
          const postResponse = yield call(postApi.getPosts, {
            authorId: payload?.id || action.payload,
          });

          if (postResponse?.status === 200) {
            payload.posts = postResponse?.data?.posts || [];
          } else {
            payload.posts = [];
          }

          /** 해당 작가의 시리즈 목록 */
          const seriesResponse = yield call(postApi.getPostSeries, {
            authorId: payload?.id || action.payload,
          });
          if (seriesResponse?.status === 200) {
            payload.series = seriesResponse?.data?.series || [];
          } else {
            payload.series = [];
          }

          /** 해당 작가의 구독 플랜 목록 */
          const planResponse = yield call(authorApi.getAuthorPlans, {
            authorId: payload?.id || action.payload,
          });
          if (planResponse?.status === 200) {
            payload.subscribeTiers = planResponse?.data?.subscribeTiers || [];
          } else {
            payload.subscribeTiers = [];
          }

          yield put({
            type: SUCCESS,
            payload: payload,
          });
        }
      } catch (e) {
        console.dir(e);
        yield call(exceptionHandler, { e: e, redirectError: false });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
        });
      }
    } else {
      yield put({
        type: SUCCESS,
        payload: action.payload,
      });
    }
  };
}

const setCurrentAuthorSaga =
  createSetCurrentAuthorRequestSaga(SET_CURRENT_AUTHOR);

export default function* authorSaga() {
  yield takeLatest(GET_AUTHOR_LIST, getAuthorListSaga);
  yield takeLatest(SET_CURRENT_AUTHOR, setCurrentAuthorSaga);
}
