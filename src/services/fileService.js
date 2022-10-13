import { apiServer } from "./api";
import { getGetMethodUrl } from "@/common/common";
/**
 * json object to string
 * @returns
 */
const getParamsToQuery = (params) => {
  try {
    let query = "?";
    Object.entries(params).forEach(([key, value], index) => {
      if (index > 0) {
        query += `&`;
      }
      query += `${key}=${value}`;
    });
    return query;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 파일 경로 불러오기
 * @version 1.0.0
 * @author 조장혁
 * @return 파일경로
 */
export const getFileUrlFromServer = async (hash, query) => {
  let queryStr = "";
  if (query) {
    queryStr = getParamsToQuery(query);
  }
  try {
    return await apiServer("get", `/file/${hash}${queryStr}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};