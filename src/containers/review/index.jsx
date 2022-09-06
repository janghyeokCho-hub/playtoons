import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import ListMobile from "./ListMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"list"} element={<List />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path={"list"} element={<ListMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
