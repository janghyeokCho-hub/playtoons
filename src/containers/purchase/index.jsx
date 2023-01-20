import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Page404 from "@COMPONENTS/Page404";


const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/detail/:id"} element={<Detail />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
