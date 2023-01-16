import { apiServer } from "./api";

export const get = async (params) => {
  try {
    return await apiServer("get", `/tag`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
