import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";
import DashboardSeries from "@CONTAINERS/dashboardSeries/DashboardSeries";
import DashboardSeriesMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesMobile";
import Account from "@CONTAINERS/account/Account";
import LandingPage from "@/containers/landing/LandingPage";
import LandingPageMobile from "@/containers/landing/LandingPageMobile";

import { BrowserView, MobileView } from "react-device-detect";

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard-series" element={<DashboardSeries />} />
            <Route path="/auth-login" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageMobile />} />
            <Route path="/dashboard-series" element={<DashboardSeriesMobile />} />
            <Route path="/auth-login" element={<Account />} />
          </Routes>
        </BrowserRouter>
      </MobileView>
    </Provider>
  );
}

export default App;
