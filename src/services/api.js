import axios from "axios";
import Config from "@/env/config";
import { isJSONStr } from "@/common/common";

const SERVER = Config.apiUrl;
const AUTH_SERVER = Config.apiAuthUrl;

const getToken = () => {
  const rootData = localStorage.getItem("persist:root");
  const rootJSON = isJSONStr(rootData) ? JSON.parse(rootData) : rootData;
  const loginData = rootJSON.login;
  const loginJSON = isJSONStr(loginData) ? JSON.parse(loginData) : loginData;
  return loginJSON.token;
};

/**
 * API 호출 공통 로직
 * @param {string} method
 * @param {string} url
 * @param {json} params
 * @param {json} headers
 */
export const apiServer = (method, url, params, headers) => {
  /**
   * 기본 옵션
   */
  const reqOptions = {
    method: method,
    url: `${SERVER}${url}`,
    data: params,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken()}`,
      ...headers,
    },
  };
  return axios(reqOptions);
};

/**
 * Auth API
 * @param {string} method
 * @param {string} url
 * @param {json} params
 * @param {json} headers
 */
export const apiAuthServer = (method, url, params, headers) => {
  /**
   * 기본 옵션
   */
  const reqOptions = {
    method: method,
    url: `${AUTH_SERVER}${url}`,
    data: params,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getToken()}`,
      ...headers,
    },
  };
  return axios(reqOptions);
};
