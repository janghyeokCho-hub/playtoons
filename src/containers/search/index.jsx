import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import All from "./All";
import Author from "./Author";
import HashTag from "./HashTag";
import Series from "./Series";
import Store from "./Store";

const App = () => {
  return (
    <Routes>
      <Route path={"all"} element={<All />} />
      <Route path={"author"} element={<Author />} />
      <Route path={"hash-tag"} element={<HashTag />} />
      <Route path={"series"} element={<Series />} />
      <Route path={"store"} element={<Store />} />
    </Routes>
  );
};

export default App;
