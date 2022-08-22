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

/**
 * 회원 가입시 이메일 인증코드 확인
 *  @param {string} params.code 이메일
 * @returns
 */
export const verifyCheck = (params) => {
  return requestPromise("INSERT_ACCOUNT_VERIFY", params);
};

/**
 * 회원 가입시 이용약관
 *  @param {string} code 이용약관 계약 코드
 * @returns
 */
export const agreementEula = (code) => {
  return load(`LOAD_AGREEMENT_EULA_${code}`);
};
