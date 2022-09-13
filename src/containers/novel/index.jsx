import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Novel from "./Novel";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Novel />} />
      </Routes>
    </>
  );
};

export default App;
