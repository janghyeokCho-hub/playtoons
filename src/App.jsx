import React from "react";
import { Routes, Route } from "react-router-dom";
import Account from "@CONTAINERS/account/Account";
import Home from "@CONTAINERS/home/Home";
import LandingPage from "@CONTAINERS/landing/LandingPage";
import Webtoon from "@CONTAINERS/webtoon/Webtoon";
import Novel from "@CONTAINERS/novel/Novel";
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
import ModalContainer from "@COMPONENTS/ModalContainer";
import Container from "@COMPONENTS/Container";
import Page404 from "@COMPONENTS/Page404";

function App() {
  return (
    <>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/*" element={<Page404 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
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
      </Container>
      <ModalContainer />
    </>
  );
}

export default App;
