import { getGetMethodUrl } from "@/common/common";
import { apiServer } from "./api";

/**
*
   post upload 
*
* @version 1.0.0
* @author 2hyunkook
*/
export const setPostToServer = async (params) => {
  try {
    return await apiServer("post", "/post", params);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};