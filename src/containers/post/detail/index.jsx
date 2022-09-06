import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Locked from "./Locked";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import LockedMobile from "./LockedMobile";
import NovelMobile from "./NovelMobile";
import WebtoonMobile from "./WebtoonMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"locked"} element={<Locked />} />
          <Route path={"novel"} element={<Novel />} />
          <Route path={"webtoon"} element={<Webtoon />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path={"locked"} element={<LockedMobile />} />
          <Route path={"novel"} element={<NovelMobile />} />
          <Route path={"webtoon"} element={<WebtoonMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
