import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "./modules/redux/store";
import globalSaga from "./modules/redux/saga/globalSaga";

import Account from "@CONTAINERS/account/Account";
import AccountMobile from "@CONTAINERS/account/AccountMobile";
import LandingPage from "@CONTAINERS/landing/LandingPage";
import LandingPageMobile from "@CONTAINERS/landing/LandingPageMobile";
import RegisterCompleted from "@CONTAINERS/account/RegisterCompleted";
import RegisterCompletedMobile from "@CONTAINERS/account/RegisterCompletedMobile";
import Dashboard from "@CONTAINERS/dashboard/Dashboard";
import DashboardMobile from "@CONTAINERS/dashboard/DashboardMobile";
import Upload from "@CONTAINERS/upload/Upload";
import UploadMobile from "@CONTAINERS/upload/UploadMobile";
import Edit from "@CONTAINERS/edit/Edit";
import EditMobile from "@CONTAINERS/edit/EditMobile";
import Webtoon from "@CONTAINERS/webtoon";
import Novel from "@CONTAINERS/novel";
import Series from "@CONTAINERS/series";
import Post from "@CONTAINERS/post";
import Author from "@CONTAINERS/author";
import Payment from "@CONTAINERS/payment";
import Product from "@CONTAINERS/product";
import Purchase from "@CONTAINERS/purchase";
import Review from "@CONTAINERS/review";
import Search from "@CONTAINERS/search";
import Inquiry from "@CONTAINERS/inquiry";

import Header from "@COMPONENTS/Header";
import Footer from "@COMPONENTS/Footer";

import { BrowserView, MobileView } from "react-device-detect";

export const store = configureStore();
sagaMiddleware.run(globalSaga);

function App() {
  const [isNavbar, setIsNavbar] = useState(false);

  const path = window.location.href;
  useEffect(() => {
    if (path.includes("account")) {
      setIsNavbar(false);
    } else {
      setIsNavbar(true);
    }
  }, [path]);
  return (
    <Provider store={store}>
      {isNavbar && <Header />}
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/upload/*" element={<Upload />} />
            <Route path="/edit/*" element={<Edit />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/register-completed" element={<RegisterCompleted />} />
            <Route path="/webtoon" element={<Webtoon />} />
            <Route path="/novel" element={<Novel />} />
            <Route path="/series/*" element={<Series />} />
            <Route path="/post/*" element={<Post />} />
            <Route path="/author/*" element={<Author />} />
            <Route path="/payment/*" element={<Payment />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/purchase/*" element={<Purchase />} />
            <Route path="/review/*" element={<Review />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/inquiry/*" element={<Inquiry />} />
          </Routes>
        </BrowserRouter>
      </BrowserView>
      <MobileView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageMobile />} />
            <Route path="/account/*" element={<AccountMobile />} />
            <Route
              path="/register-completed"
              element={<RegisterCompletedMobile />}
            />
            <Route path="/dashboard/*" element={<DashboardMobile />} />
            <Route path="/upload/*" element={<UploadMobile />} />
            <Route path="/edit/*" element={<EditMobile />} />
          </Routes>
        </BrowserRouter>
      </MobileView>
      {isNavbar && <Footer />}
    </Provider>
  );
}

export default App;
