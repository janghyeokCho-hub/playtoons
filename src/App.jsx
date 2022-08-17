import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";
import DashboardSeries from "@CONTAINERS/dashboardSeries/DashboardSeries";
import DashboardSeriesMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesMobile";
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
    if (path.includes("auth-login")) {
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
            <Route path="/auth-login" element={<Account />} />
            <Route path="/dashboard-series" element={<DashboardSeries />} />
            <Route path="/register-completed" element={<RegisterCompleted />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageMobile />} />
            <Route path="/auth-login" element={<AccountMobile />} />
            <Route
              path="/dashboard-series"
              element={<DashboardSeriesMobile />}
            />
            <Route path="/register-completed" element={<RegisterCompleted />} />
          </Routes>
        </BrowserRouter>
      </MobileView>
      {isNavbar && <Footer />}
    </Provider>
  );
}

export default App;
