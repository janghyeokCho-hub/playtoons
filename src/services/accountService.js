import { store, load, requestPromise, type } from "./index";

/**
 * 회원가입
 *  @param {string} params.email 이메일
 *  @param {string} params.password 비밀번호
 *  @param {string} params.referralCode 추천인
 *  @param {number} params.eulaVersion 이용약관 버전
 *  @param {number} params.privacyVersion 개인정보 보호정책 버전
 * @returns
 */
export const createRegisterUser = (params) => {
  return requestPromise("INSERT_ACCOUNT_REGISTER", params);
};
