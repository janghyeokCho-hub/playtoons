import React from "react";
import { Route, Routes } from "react-router-dom";
import Edit from "./Edit";
import Upload from "./Upload";

const App = () => {
  return (
    <Routes>
      <Route path={"edit"} element={<Edit />} />
      <Route path={"upload"} element={<Upload />} />
    </Routes>
  );
};

export default App;
