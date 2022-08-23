import { requestPromise } from "./index";

export const getSeriesStoryList = (params) => {
  return requestPromise("GET_SERIES_STORY", params);
};

