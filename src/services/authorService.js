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
