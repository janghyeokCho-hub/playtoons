/**
 * Login 관련 API
 */

import { apiServer } from "./api";

export const loginRequest = async (params) => {
  console.log("login API : ", params);
  return apiServer("post", "/auth/login", params);
};
