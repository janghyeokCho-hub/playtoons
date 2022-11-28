import { apiServer } from "./api";
import { getParamsToQuery } from "@/common/common";

/**
 * 해당 작가 Store
 * @param {number} authorId 작가 ID
 * @param {string} keyword 검색키워드
 * @returns
 */
export const getProduct = async (params) => {
  try {
    return await apiServer("get", `/shop/product${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};

/**
 * 해당 작가 Store
 */
export const getProductType = async () => {
  try {
    return await apiServer("get", "/shop/product/type");
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
