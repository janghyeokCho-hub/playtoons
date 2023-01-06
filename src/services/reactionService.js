import { getErrorMessageFromResultCode, getParamsToQuery } from "@/common/common";
import { apiServer } from "./api";

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const getReaction = async (params) => {
  try {
    return await apiServer("get", `/reaction${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const insertReaction = async (params) => {
  try {
    return await apiServer("post", "/reaction", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const updateReaction = async (params) => {
  try {
    return await apiServer("patch", "/reaction", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const deleteReaction = async (id) => {
  try {
    return await apiServer("delete", `/reaction/${id}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const reportReaction = async ({ id, params }) => {
  try {
    return await apiServer("post", `/reaction/${id}/report`, params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const insertLikeReaction = async (id) => {
  try {
    return await apiServer("post", `/reaction/${id}/like`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const deleteLikeReaction = async (id) => {
  try {
    return await apiServer("delete", `/reaction/${id}/like`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const getReactionIdFromServer = async (id) => {
  try {
    return await apiServer("get", `/reaction/${id}`);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const setReactionIdDislikeToServer = async (id) => {
  try {
    return await apiServer("post", `/reaction/${id}/dislike`);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};
