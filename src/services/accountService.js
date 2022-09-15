/**
 * Account 관련 API
 */

import { apiAuthServer } from "./api";

export const register = async (params) => {
  try {
    return await apiAuthServer("post", "/account/register", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 이메일로 인증 코드 발송
 * @param {string} email
 * @returns
 */
export const recover = async (params) => {
  try {
    return await apiAuthServer("post", "/account/recover", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 인증 코드 검사
 * @param {string} code
 * @returns
 */
export const recoverCheckCode = async (params) => {
  try {
    return await apiAuthServer("post", "/account/recover/check", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const recoverConfirmPassword = async (params) => {
  try {
    return await apiAuthServer("post", "/account/recover/confirm", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const verifyCheckCode = async (params) => {
  try {
    return await apiAuthServer("post", "/account/verify", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

/**
 * 이용약관 버전 받아오는 API
 * @param {string} code
 * @returns
 */
export const getEulaVersion = async (code) => {
  try {
    return await apiAuthServer("get", `/agreement/eula/${code}`);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const updateAccount = async (params) => {
  try {
    return await apiAuthServer("fatch", "/account", params);
  } catch (e) {
    return { status: e.response.status };
  }
};

export const deleteAccount = async () => {
  try {
    return await apiAuthServer("delete", "/account");
  } catch (e) {
    return { status: e.response.status };
  }
};
