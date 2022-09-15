import { apiServer } from "./api";

export const getSeriesStoryList = () => {
  return apiServer("get", "/post/series");
};

export const getPostTypeList = () => {
  return apiServer("get", "/post/type");
};

export const setFileToServer = (params) => {
  const header = {
    "content-type": "multipart/form-data",
  };

  return apiServer("post", "/file", params, header);
};

export const getFileFromServer = (hash, params) => {
  return apiServer("get", `/file/${hash}`, params);
};
