import { requestPromise } from "./index";

export const getSeriesStoryList = (params) => {
  return requestPromise("GET_FILE", params);
};

export const getPostTypeList = (params) => {
  return requestPromise("GET_POST_TYPE", params, false, true);
};

