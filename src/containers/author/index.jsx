import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Plan from "./Plan";
import Post from "./Post";
import Series from "./Series";
import Register from "./Register";
import Store from "./Store";
import Detail from "./Detail";
import ListMobile from "./ListMobile";
import PlanMobile from "./PlanMobile";
import PostMobile from "./PostMobile";
import SeriesMobile from "./SeriesMobile";
import RegisterMobile from "./RegisterMobile";
import StoreMobile from "./StoreMobile";
import DetailMobile from "./DetailMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path="store" element={<Store />} />
          <Route path="list" element={<List />} />
          <Route path="plan" element={<Plan />} />
          <Route path="post" element={<Post />} />
          <Route path="series" element={<Series />} />
          <Route path="register" element={<Register />} />
          <Route path="detail" element={<Detail />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path="store" element={<StoreMobile />} />
          <Route path="list" element={<ListMobile />} />
          <Route path="plan" element={<PlanMobile />} />
          <Route path="post" element={<PostMobile />} />
          <Route path="series" element={<SeriesMobile />} />
          <Route path="register" element={<RegisterMobile />} />
          <Route path="detail" element={<DetailMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
