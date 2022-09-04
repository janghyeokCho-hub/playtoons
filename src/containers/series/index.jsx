import React from "react";
import { Route, Routes } from "react-router-dom";
import Detail from "./Detail";

const Series = () => {
  return (
    <Routes>
      <Route path={"detail"} element={<Detail />} />
    </Routes>
  );
};

export default Series;
