import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import All from "./All";
import Author from "./Author";
import HashTag from "./HashTag";
import Series from "./Series";
import Store from "./Store";
import AllMobile from "./AllMobile";
import AuthorMobile from "./AuthorMobile";
import HashTagMobile from "./HashTagMobile";
import SeriesMobile from "./SeriesMobile";
import StoreMobile from "./StoreMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"all"} element={<All />} />
          <Route path={"author"} element={<Author />} />
          <Route path={"hash-tag"} element={<HashTag />} />
          <Route path={"series"} element={<Series />} />
          <Route path={"store"} element={<Store />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path={"all"} element={<AllMobile />} />
          <Route path={"author"} element={<AuthorMobile />} />
          <Route path={"hash-tag"} element={<HashTagMobile />} />
          <Route path={"series"} element={<SeriesMobile />} />
          <Route path={"store"} element={<StoreMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
