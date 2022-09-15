/**
 * Login 관련 API
 */

import { apiAuthServer } from "./api";

export const loginRequest = (params) => {
  try {
    return apiAuthServer("post", "/auth/login", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const loginSnsRequest = (type) => {
  try {
    return apiAuthServer("get", `/auth/${type}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const loginSnsCallback = async (type) => {
  try {
    return await apiAuthServer("get", `/auth/callback/${type}`);
  } catch (e) {
    return { status: e.response.status };
  }
};
