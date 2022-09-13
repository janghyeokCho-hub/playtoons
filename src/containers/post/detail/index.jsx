import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Locked from "./Locked";
import Novel from "./Novel";
import Webtoon from "./Webtoon";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"locked"} element={<Locked />} />
        <Route path={"novel"} element={<Novel />} />
        <Route path={"webtoon"} element={<Webtoon />} />
      </Routes>
    </>
  );
};

export default App;
