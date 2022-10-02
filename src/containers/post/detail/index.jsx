import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Locked from "./Locked";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Header from "@COMPONENTS/Header";

const App = () => {
  return (
    <>
      <Header className="ty1 mdetail" type="post" />
      <div id="container" class="container sub mpost bg">
        <div class="inr-c">
          <Routes>
            <Route path={"locked"} element={<Locked />} />
            <Route path={"novel"} element={<Novel />} />
            <Route path={"webtoon"} element={<Webtoon />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
