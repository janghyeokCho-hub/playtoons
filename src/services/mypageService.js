import { getErrorMessageFromResultCode, getStringForUrl } from "@/common/common";
import { apiServer } from "./api";

/**
   mypage purchase list 
* @version 1.0.0
* @author 2hyunkook
*/
export const getShopProductFromServer = async (params) => {
  try {
    return await apiServer("get", `/shop/product${getStringForUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data), };
  }
};

/**
   mypage review list 
* @version 1.0.0
* @author 2hyunkook
*/
export const getShopReviewMineFromServer = async (params) => {
  try {
    return await apiServer("get", `/shop/review/mine${getStringForUrl(params)}`);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data), };
  }
};

/**
   mypage review list -> delete review
* @version 1.0.0
* @author 2hyunkook
*/
export const deleteShopReviewIdToServer = async (id) => {
  try {
    return await apiServer("delete", `/shop/review/${id}`);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data), };
  }
};
