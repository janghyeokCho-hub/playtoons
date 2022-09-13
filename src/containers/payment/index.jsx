import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Payment from "./Payment";
import Complete from "./Complete";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"payment"} element={<Payment />} />
        <Route path={"complete"} element={<Complete />} />
      </Routes>
    </>
  );
};

export default App;
