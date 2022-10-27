import { apiServer } from "./api";
import { getErrorMessageFromResultCode, getGetMethodUrl, getParamsToQuery } from "@/common/common";

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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
  }
};

/**
*
   post detail 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const getPostIdMineFromServer = async (params) => {
  try {
    return await apiServer("get", `/post/${params.id}/mine`);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
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
export const getPostList = async (params = {}, tags) => {
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

/**
 * 게시글의 내용 조회
 * @version 1.0.0
 * @author 조장혁
 */
export const getPostContent = async (id) => {
  try {
    return await apiServer("get", `/post/${id}/content`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 게시글 좋아요
 * @version 1.0.0
 * @author 조장혁
 * @param {string} method (post / delete)
 * @param {number} id 해당 게시글 아이디
 */
export const setPostLike = async (method, id) => {
  try {
    return await apiServer(method, `/post/${id}/like`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * 게시글 조회 수 증가
 * @version 1.0.0
 * @author 조장혁
 * @param {number} id 해당 게시글 아이디
 */
export const setPostView = async (id) => {
  try {
    return await apiServer("post", `/post/${id}/view`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
   리액션 작성
* @version 1.0.0
* @author 2hyunkook
* @param params
*/
export const setPostReactionToServer = async (params) => {
  try {
    return await apiServer("post", `/reaction`, params);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data) };
  }
};
