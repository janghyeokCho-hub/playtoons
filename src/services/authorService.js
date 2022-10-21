/**
 * Account 관련 API
 */

import { apiServer } from "./api";

export const getAuthorList = async () => {
  try {
    return await apiServer("get", "/author");
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthor = async (id) => {
  try {
    return await apiServer("get", `/author/${id}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const setViewAuthor = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/view`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthorPlans = async (params) => {
  try {
    return await apiServer("get", `/subscribeTier/${params.authorId}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const getAuthorRecent = async () => {
  try {
    return await apiServer("get", "/author/recent");
  } catch (e) {
    return { status: e.response.status };
  }
};

export const registerAuthor = async () => {
  try {
    return await apiServer("post", "/author");
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 팔로우
 * @param {number} id 작가 ID
 * @returns
 */
export const insertAuthorFollow = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/follow`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 팔로우 취소
 * @param {number} id 작가 ID
 * @returns
 */
export const deleteAuthorFollow = async (id) => {
  try {
    return await apiServer("delete", `/author/${id}/follow`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요
 * @param {number} id 작가 ID
 * @returns
 */
export const insertAuthorLike = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/like`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요 취소
 * @param {number} id 작가 ID
 * @returns
 */
export const deleteAuthorLike = async (id) => {
  try {
    return await apiServer("delete", `/author/${id}/like`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요
 * @param {number} id 작가 ID
 * @returns
 */
export const insertAuthorDisLike = async (id) => {
  try {
    return await apiServer("post", `/author/${id}/dislike`);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 해당 작가 좋아요 취소
 * @param {number} id 작가 ID
 * @returns
 */
export const deleteAuthorDisLike = async (id) => {
  try {
    return await apiServer("delete", `/author/${id}/dislike`);
  } catch (e) {
    return { status: e.response.status };
  }
};
