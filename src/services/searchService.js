import { apiServer } from "./api";
import { getParamsToQuery } from "@/common/common";

export const getSearchPost = async (params) => {
  // /post?keyword=[검색키워드]&orderKey=rank&order=desc
  try {
    return await apiServer("get", `/post${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

export const getSearchSeries = async (params) => {
  try {
    return await apiServer("get", `/post/series${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

export const getSearchAuthor = async (params) => {
  try {
    return await apiServer("get", `/Author${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

export const getSearchTags = async (params) => {
  try {
    return await apiServer("get", `/tag${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
