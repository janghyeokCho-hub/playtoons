import React, { useEffect } from "react";

import { Provider, useDispatch } from "react-redux";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "@REDUX/store";
import rootSaga from "@REDUX/saga";
import { PersistGate } from "redux-persist/integration/react";

import Account from "@CONTAINERS/account/Account";
import LandingPage from "@CONTAINERS/landing/LandingPage";
import Webtoon from "@CONTAINERS/webtoon";
import Novel from "@CONTAINERS/novel";
import Post from "@CONTAINERS/post";
import Author from "@CONTAINERS/author";
import Payment from "@CONTAINERS/payment";
import Product from "@CONTAINERS/product";
import Purchase from "@CONTAINERS/purchase";
import Review from "@CONTAINERS/review";
import Search from "@CONTAINERS/search";
import Inquiry from "@CONTAINERS/inquiry";
import Dashboard from "@CONTAINERS/dashboard/Dashboard";
import ScrollToTop from "@COMPONENTS/ScrollToTop";
import ModalContainer from "./components/ModalContainer";

export const store = configureStore();
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={store.persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/webtoon/*" element={<Webtoon />} />
            <Route path="/novel/*" element={<Novel />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/post/*" element={<Post />} />
            <Route path="/author/*" element={<Author />} />
            <Route path="/payment/*" element={<Payment />} />
            <Route path="/product/*" element={<Product />} />
            <Route path="/purchase/*" element={<Purchase />} />
            <Route path="/review/*" element={<Review />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/inquiry/*" element={<Inquiry />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <ModalContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
