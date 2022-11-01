import React, { useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Page404 from "@COMPONENTS/Page404";
import { setHeader } from "@/modules/redux/ducks/container";

const App = () => {
  const dispatch = useDispatch();
  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header ty1 mdetail",
      containerClass: "container sub mpost bg",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: true,
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route path={"novel/:id"} element={<Novel />} />
      <Route path={"webtoon/:id"} element={<Webtoon />} />
      <Route path={"*"} element={<Page404 />} />
    </Routes>
  );
};

export default App;
