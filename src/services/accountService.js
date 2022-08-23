import { store, load, requestPromise, type } from "./index";

/**
 * Method: POST
 * URL : /account/register
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
 * Method: POST
 * URL : /account/verify
 * 회원 가입시 이메일 인증코드 확인
 *  @param {string} params.code 코드
 * @returns
 */
export const verifyCheck = (params) => {
  return requestPromise("INSERT_ACCOUNT_VERIFY", params);
};

/**
 * Method: POST
 * URL : /account/verify/resend
 * 1. 회원 가입시 이메일 인증 번호 재전송
 * 2. 이메일 변경시 새로운 이메일 인증코드 확인
 *  @param {string} params.email 이메일
 * @returns
 */
export const verifyCheckResend = (params) => {
  return requestPromise("INSERT_ACCOUNT_VERIFY_RESEND", params);
};

/**
 * Method: POST
 * URL : /account/recover
 * 패스워드 변경시 이메일 인증 번호 전송
 *  @param {string} params.email 이메일
 * @returns
 */
export const recoverCheckSend = (params) => {
  return requestPromise("INSERT_ACCOUNT_RECOVER", params);
};

/**
 * Method: POST
 * URL : /account/recover/resend
 * 패스워드 변경시 이메일 인증 번호 재전송
 *  @param {string} params.email 이메일
 * @returns
 */
export const recoverCheckReSend = (params) => {
  return requestPromise("INSERT_ACCOUNT_RECOVER_RESEND", params);
};

/**
 * Method: POST
 * URL : /account/recover/check
 * 패스워드 변경시 이메일 인증 번호 학인
 *  @param {string} params.code 인증 코드
 * @returns
 */
export const recoverCheck = (params) => {
  return requestPromise("INSERT_ACCOUNT_RECOVER_CHECK", params);
};

/**
 * Method: POST
 * URL : /account/recover/confirm
 * 패스워드 변경시 이메일 인증 번호 학인
 *  @param {string} params.code 인증 코드
 * @returns
 */
export const recoverConfirm = (params) => {
  return requestPromise("INSERT_ACCOUNT_RECOVER_CONFIRM", params);
};

/**
 * Method: GET
 * URL : /agreement/eula/${code}
 * 계약 코드 (user: 일반 이용자 / 'author' : 작가 / 'publisher': 출판사 등)
 * 회원 가입시 이용약관
 *  @param {string} code 이용약관 계약 코드
 * @returns
 */
export const agreementEula = (code) => {
  return load(`LOAD_AGREEMENT_EULA_${code}`);
};

/**
 * Method: PATCH
 * URL : /account
 * 회원 정보 변경
 * @returns
 */
export const accountPatch = (params) => {
  return requestPromise("PATCH_ACCOUNT", params);
};
