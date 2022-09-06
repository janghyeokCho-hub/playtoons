import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Novel from "./Novel";
import NovelMobile from "./NovelMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path="*" element={<Novel />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path="*" element={<NovelMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
