import { getErrorMessageFromResultCode } from "@/common/common";
import { apiServer } from "./api";

/**
 * @version 1.0.0
 * @author 조장혁
 */
export const getTimeline = async () => {
  try {
    return await apiServer("get", "/timeline");
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

/**
  report 게시글 신고 
* @version 1.0.0
* @author 2hyunkook
*/
export const setPostIdReportToServer = async (id, params) => {
  try {
    return await apiServer("post", `/post/${id}/report`, params);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};