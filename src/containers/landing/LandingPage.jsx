import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@/modules/redux/ducks/login";

const LandingPage = () => {
  const dispatch = useDispatch();

  // redux 초기화 테스트
  const handleLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleLogout}>임시로그아웃</button>
    </div>
  );
};

export default LandingPage;
