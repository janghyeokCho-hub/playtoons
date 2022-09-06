import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Webtoon from "./Webtoon";
import WebtoonMobile from "./WebtoonMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path="*" element={<Webtoon />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path="*" element={<WebtoonMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
