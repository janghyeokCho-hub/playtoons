import { getErrorMessageFromResultCode } from "@/common/common";
import { apiServer } from "./api";

/**
   상품상세
* @author 2hyunkook
* @param id productId
*/
export const getShopProductIdFromServer = (id) => {
  try {
    return apiServer("get", `/shop/product/${id}`);
  } catch (e) {
    return {
      status: e.response.status,
      data: getErrorMessageFromResultCode(e.response.data),
    };
  }
};
