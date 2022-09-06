import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Detail from "./Detail";
import ListMobile from "./ListMobile";
import DetailMobile from "./DetailMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"list"} element={<List />} />
          <Route path={"Detail"} element={<Detail />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path={"list"} element={<ListMobile />} />
          <Route path={"Detail"} element={<DetailMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
