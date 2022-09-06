import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Payment from "./Payment";
import Complete from "./Complete";
import PaymentMobile from "./PaymentMobile";
import CompleteMobile from "./CompleteMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"payment"} element={<Payment />} />
          <Route path={"complete"} element={<Complete />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path={"payment"} element={<PaymentMobile />} />
          <Route path={"complete"} element={<CompleteMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
