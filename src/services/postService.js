import { apiServer } from "./api";
import { getGetMethodUrl, getParamsToQuery } from "@/common/common";

/**
*
   post upload 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setPostToServer = async (params) => {
  try {
    return await apiServer("post", "/post", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   post detail 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostDetailFromServer = async (params) => {
  try {
    return await apiServer("get", `/post/${params.id}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   post edit 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const editPostToServer = async (params) => {
  try {
    return await apiServer("patch", "/post", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   post edit 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostSeriesMine = async (params) => {
  try {
    return await apiServer(
      "get",
      `/post/series/mine${getGetMethodUrl(params)}`
    );
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   post edit 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getAuthorMineFromServer = async () => {
  try {
    return await apiServer("get", "/author/mine");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
*
   post edit 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getAccountsFromServer = async () => {
  try {
    return await apiServer("get", "/accounts");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 게시글 검색
 * @version 1.0.0
 * @author 조장혁
 */
export const getPosts = async (params) => {
  try {
    return await apiServer("get", `/post${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 시리즈 검색
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostSeries = async (params) => {
  try {
    return await apiServer("get", `/post/series${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 아이디로 시리즈 검색
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostSeriesDetail = async (id) => {
  try {
    return await apiServer("get", `/post/series/${id}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 시리즈 아이디로 시리즈의 게시글 수
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostSeriesCount = async (id) => {
  try {
    return await apiServer("get", `/post/series/${id}/count`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * Get post type list
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostTypes = async () => {
  try {
    return await apiServer("get", `/post/type`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * Get post list
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostList = async (type, params = {}, tags, typeId) => {
  params.type = typeId;
  if (type === "COMPLETED") {
    params.completed = 1;
  } else if (type === "SERIES") {
    params.series = 1;
  } else if (type === "SHORT") {
    params.short = 1;
  }
  try {
    return await apiServer("get", `/post${getParamsToQuery(params, tags)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 타입 별 카테고리 목록
 * @version 1.0.0
 * @author 조장혁
 */
export const getCategorys = async (id) => {
  try {
    return await apiServer("get", `/post/category/${id}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
