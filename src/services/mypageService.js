import { getGetMethodUrl } from "@/common/common";
import { apiServer } from "./api";

export const getShopProductMineFromServer = async (params) => {
  try {
    return await apiServer("get", `/shop/product/mine${getGetMethodUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};

export const getShopProductFromServer = async (params) => {
  try {
    return await apiServer("get", `/shop/product${getGetMethodUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: e.message };
  }
};
