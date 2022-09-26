import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@/modules/redux/ducks/login";
import Header from "@/components/Header";

const LandingPage = () => {
  const dispatch = useDispatch();

  // redux 초기화 테스트
  const handleLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return (
    <div>
      <Header />    {/* 2022.09.26 link 작업때문에 추가 */}
      <button onClick={handleLogout}>임시로그아웃</button>
    </div>
  );
};

export default LandingPage;
