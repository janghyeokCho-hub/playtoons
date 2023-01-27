import React, { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import ChargeDetail from "./ChargeDetail";
import CancelDetail from "./CancelDetail";
import PlanDetail from "./PlanDetail";
import Page404 from "@COMPONENTS/Page404";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import { useLayoutEffect } from "react";


const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    dispatch(
      setContainer({
        headerClass: "header",
        containerClass: "container dashboard payment purchase",
        isHeaderShow: true,
        isMenuShow: true,
        headerType: "post",
        menuType: "MAIN",
        isDetailView: false,
        activeMenu: null,
        isFooterShow: false,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    handleContainer();
  }, []);

  return (
    <>
      <Routes>
        <Route path={"/product/detail/:id"} element={<Detail />} />
        <Route path={"/charge/detail/:id"} element={<ChargeDetail />} />
        <Route path={"/cancel/detail/:id"} element={<CancelDetail />} />
        <Route path={"/plan/detail/:id"} element={<PlanDetail />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
