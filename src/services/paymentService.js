import { getErrorMessageFromResultCode } from "@/common/common";
import { apiServer } from "./api";


/**
  get author's playcoin on payment page
* @version 1.0.0
* @author 2hyunkook
* @param id authorId
*/
export const getAuthorBalanceFromServer = async (id) => {
  try {
    return await apiServer("get", `/author/balance/${id}`);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};

/**
  set payment subscribe
* @version 1.0.0
* @author 2hyunkook
* @param params subscribeTierId type
*/
export const setPaymentSubscribeToServer = async (params) => {
  try {
    return await apiServer("post", `/payment/subscribe`, params);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};

/**
  가격목록
* @version 1.0.0
* @author 2hyunkook
* @param currency 통화코드
*/
export const getPaymentPriceFromServer = async (currency) => {
  try {
    return await apiServer("get", `/payment/price/${currency}`, );
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};

/**
  Play coin 충전
* @version 1.0.0
* @author 2hyunkook
* @param priceId 충전 금액 id
*/
export const setPaymentChargeToServer = async (params) => {
  try {
    return await apiServer("post", `/payment/charge`, params);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};