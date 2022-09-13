/**
 * 로그아웃 시 스토리지 지우기
 * @returns
 */
export function clearUserData() {
  if (!localStorage) {
    return;
  }
  localStorage.removeItem("token");
}
