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

const App = () => {
  return (
    <Routes>
      <Route path="store" element={<Store />} />
      <Route path="list" element={<List />} />
      <Route path="plan" element={<Plan />} />
      <Route path="post" element={<Post />} />
      <Route path="series" element={<Series />} />
      <Route path="register" element={<Register />} />
      <Route path="detail" element={<Detail />} />
    </Routes>
  );
};

export default App;
