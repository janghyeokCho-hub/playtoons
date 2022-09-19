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

/**
 * Login Password Check
 * @param {string} password
 * @returns
 */
export const loginPasswordCheck = (params) => {
  try {
    return apiAuthServer("post", "/auth/login/check", params);
  } catch (e) {
    return { status: e.response.status };
  }
};