import React, { useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
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
    </Routes>
  );
};

export default App;
