import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Detail from "./detail";

const App = () => {
  return (
    <Routes>
      <Route path={"detail/*"} element={<Detail />} />
    </Routes>
  );
};

export default App;
