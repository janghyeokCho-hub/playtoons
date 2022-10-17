import { apiServer } from "./api";
import { getParamsToQuery } from "@/common/common";

/**
 * Get tag list
 * @version 1.0.0
 * @author 조장혁
 */
export const getTags = async () => {
  const params = {
    orderKey: "popular",
    order: "DESC",
    page: 1,
    limit: 10,
  };
  try {
    return await apiServer("get", `/tag${getParamsToQuery(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
