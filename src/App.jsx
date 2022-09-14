import React, { useState, useEffect, useCallback } from "react";

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import configureStore, { sagaMiddleware } from "@REDUX/store";
import rootSaga from "@REDUX/saga";

import Account from "@CONTAINERS/account/Account";
import LandingPage from "@CONTAINERS/landing/LandingPage";
import RegisterCompleted from "@CONTAINERS/account/RegisterCompleted";
import Upload from "@CONTAINERS/upload/Upload";
import Edit from "@CONTAINERS/edit/Edit";
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
import Dashboard from "@CONTAINERS/dashboard/Dashboard";

export const store = configureStore();
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload/*" element={<Upload />} />
          <Route path="/edit/*" element={<Edit />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/register-completed" element={<RegisterCompleted />} />
          <Route path="/webtoon/*" element={<Webtoon />} />
          <Route path="/novel/*" element={<Novel />} />
          <Route path="/series/*" element={<Series />} />
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
    </Provider>
  );
}

export default App;
