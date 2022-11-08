import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Mypage from "./Mypage";

const App = () => {
  console.log("mypage");
  const dispatch = useDispatch();
  useEffect(() => {
    const container = {
      headerClass: "header",
      containerClass: "container list",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<Mypage />} />
    </Routes>
  );
};

export default App;
