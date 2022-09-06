import React from "react";
import { Route, Routes } from "react-router-dom";
import Edit from "./Edit";
import Upload from "./Upload";
import EditMobile from "./EditMobile";
import UploadMobile from "./UploadMobile";

import { BrowserView, MobileView } from "react-device-detect";

const App = () => {
  return (
    <>
      <BrowserView>
        <Routes>
          <Route path={"edit"} element={<Edit />} />
          <Route path={"upload"} element={<Upload />} />
        </Routes>
      </BrowserView>
      <MobileView></MobileView>

      <MobileView>
        <Routes>
          <Route path={"edit"} element={<EditMobile />} />
          <Route path={"upload"} element={<UploadMobile />} />
        </Routes>
      </MobileView>
    </>
  );
};

export default App;
