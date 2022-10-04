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

export const getAuthorPlans = async (params) => {
  try {
    return await apiServer("get", `/subscribeTier/${params.id}`);
  } catch (e) {
    return { status: e.response.status };
  }
};
