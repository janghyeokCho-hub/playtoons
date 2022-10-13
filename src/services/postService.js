import { getGetMethodUrl } from "@/common/common";
import { apiServer } from "./api";

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
 * 아이디로 시리즈 검색
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostSeries = async (id) => {
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
