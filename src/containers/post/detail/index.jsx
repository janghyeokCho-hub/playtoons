import React from "react";
import { Route, Routes } from "react-router-dom";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Header from "@COMPONENTS/Header";

const App = () => {
  return (
    <div id="wrap">
      <Header className="ty1 mdetail" type="post" isDetailView={true} />
      <div id="container" className="container sub mpost bg">
        <div className="inr-c">
          <Routes>
            <Route path={"novel/:id"} element={<Novel />} />
            <Route path={"webtoon/:id"} element={<Webtoon />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
