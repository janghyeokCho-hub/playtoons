import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import DetailMobile from "./DetailMobile";

import { BrowserView, MobileView } from "react-device-detect";

const Series = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"detail"} element={<Detail />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Route path={"detail"} element={<DetailMobile />} />
      </MobileView>
    </>
  );
};

export default Series;
