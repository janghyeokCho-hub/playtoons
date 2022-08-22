import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";
import DashboardSeries from "@CONTAINERS/dashboardSeries/DashboardSeries";
import DashboardSeriesMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesMobile";
import DashboardSeriesDetail from "@CONTAINERS/dashboardSeries/DashboardSeriesDetail";
import DashboardSeriesDetailMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesDetailMobile";
import DashboardUploadSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";
import DashboardEditSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";
import Account from "@CONTAINERS/account/Account";
import AccountMobile from "@CONTAINERS/account/AccountMobile";
import LandingPage from "@CONTAINERS/landing/LandingPage";
import LandingPageMobile from "@CONTAINERS/landing/LandingPageMobile";
import RegisterCompleted from "@CONTAINERS/account/RegisterCompleted";

import Header from "@COMPONENTS/Header";
import Footer from "@COMPONENTS/Footer";

import { BrowserView, MobileView } from "react-device-detect";

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  const [isNavbar, setIsNavbar] = useState(false);

  useEffect(() => {
    const path = window.location.href;
    if (path.includes("account")) {
      setIsNavbar(false);
    } else {
      setIsNavbar(true);
    }
  }, [window.location.href]);
  return (
    <Provider store={store}>
      {isNavbar && <Header />}
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard-series" element={<DashboardSeries />} />
            <Route
              path="/dashboard-series-detail/:id"
              element={<DashboardSeriesDetail />}
            >
              {" "}
            </Route>
            <Route
              path="/dashboard-upload-series"
              element={<DashboardUploadSeries />}
            />
            <Route
              path="/dashboard-edit-series/:id"
              element={<DashboardEditSeries />}
            />
            <Route path="/account/*" element={<Account />} />
            <Route path="/register-completed" element={<RegisterCompleted />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageMobile />} />
            <Route path="/account" element={<AccountMobile />} />
            <Route path="/register-completed" element={<RegisterCompleted />} />
            <Route
              path="/dashboard-series"
              element={<DashboardSeriesMobile />}
            />
            <Route
              path="/dashboard-series-detail/:id"
              element={<DashboardSeriesDetailMobile />}
            />
            <Route
              path="/dashboard-upload-series"
              element={<DashboardUploadSeries />}
            />
            <Route
              path="/dashboard-edit-series/:id"
              element={<DashboardEditSeries />}
            />
          </Routes>
        </BrowserRouter>
      </MobileView>
      {isNavbar && <Footer />}
    </Provider>
  );
}

export default App;
