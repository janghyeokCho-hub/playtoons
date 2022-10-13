import { apiServer } from "./api";

/**
 * landingPage API
 * @version 1.0.0
 * @author 조장혁
 * @return list
 */
export const getCurationList = async (num) => {
  try {
    return await apiServer("get", `/curation/${num}/list`);
  } catch (e) {
    return { status: e.response.status, data: e };
  }
};
