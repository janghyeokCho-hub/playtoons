import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Header from "@COMPONENTS/Header";

const App = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <Header className="ty1 mdetail" type="post" isDetailView={true} />
      <div id="container" className="container sub mpost bg">
        <div className="inr-c">
          <Routes>
            <Route path={"novel/:id"} element={<Novel />} />
            <Route path={"webtoon/:id"} element={<Webtoon />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
