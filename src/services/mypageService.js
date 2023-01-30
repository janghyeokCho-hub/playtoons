import { getErrorMessageFromResultCode, getStringForUrl } from "@/common/common";
import { apiServer } from "./api";

/**
   mypage purchase list 
* @version 1.0.0
* @author 2hyunkook
*/
export const getShopPurchaseFromServer = async (params) => {
  try {
    return await apiServer("get", `/shop/purchase${getStringForUrl(params)}`);
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

/**
   mypage inquiry list -> delete inquiry
* @version 1.0.0
* @author 2hyunkook
*/
export const deleteShopInquiryIdToServer = async (id) => {
  try {
    return await apiServer("delete", `/shop/inquiry/${id}`);
  } catch (e) {
    return { status: e.response.status, data: getErrorMessageFromResultCode(e.response.data), };
  }
};
