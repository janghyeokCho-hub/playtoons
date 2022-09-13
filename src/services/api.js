import axios from "axios";
import Config from "@/env/config";

const SERVER = Config.apiUrl;

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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...headers,
    },
  };
  return axios(reqOptions);
};
