import React, { useCallback, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";
import Payment from "./Payment";
import PaymentPlan from "./PaymentPlan";
import PaymentComplete from "./PaymentComplete";
import PaymentDetail from "./PaymentDetail";
import CompletedCharge from "./CompletedCharge";
import Checking from "./Checking";
import Failed from "./Failed";
import CompletedPlan from "./CompletedPlan";
import Charge from "./Charge";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard payment",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };

    if ( location.pathname.includes("/payment/completed/charge") 
          ||  location.pathname.includes("/payment/checking") 
          ||  location.pathname.includes("/payment/failed") 
          ||  location.pathname.includes("/payment/completed/plan") 
          ) {
      container.containerClass = "container dashboard payment bgw";
    }


    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route index element={<Payment />} />
      <Route path="/plan/:id" element={<PaymentPlan />} />
      <Route path="/complete/:id" element={<PaymentComplete />} />
      <Route path="/detail/:id" element={<PaymentDetail />} />
      <Route path="/completed/charge/:id" element={<CompletedCharge />} />
      <Route path="/checking/:id" element={<Checking />} />
      <Route path="/failed/:id" element={<Failed />} />
      <Route path="/completed/plan/:id" element={<CompletedPlan />} />
      <Route path="/charge" element={<Charge />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
