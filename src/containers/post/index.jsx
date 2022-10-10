import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./detail";
import Upload from "@CONTAINERS/post/PostUpload";
import Edit from "@CONTAINERS/post/PostEdit";

const App = () => {
  return (
    <div id="wrap">
      <Routes>
        <Route path={"detail/*"} element={<Detail />} />
        <Route path={"upload/*"} element={<Upload />} />
        <Route path={"edit/:id"} element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
