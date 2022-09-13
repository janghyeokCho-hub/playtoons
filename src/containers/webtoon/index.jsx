import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Webtoon from "./Webtoon";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Webtoon />} />
      </Routes>
    </>
  );
};

export default App;
