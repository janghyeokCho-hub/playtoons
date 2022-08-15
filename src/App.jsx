import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";
import DashboardSeries from "@CONTAINERS/dashboardSeries/DashboardSeries";
import Account from "@CONTAINERS/account/Account";
import LangingPage from "@CONTAINERS/landing/LangingPage";
import LangingPageMobile from "@CONTAINERS/landing/LangingPageMobile";

import { BrowserView, MobileView } from "react-device-detect";

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LangingPage />} />
            <Route path="/dashboard-series" element={<DashboardSeries />} />
            <Route path="/auth-login" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LangingPageMobile />} />
          </Routes>
        </BrowserRouter>
      </MobileView>
    </Provider>
  );
}

export default App;
