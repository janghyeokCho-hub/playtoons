import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Plan from "./Plan";
import Post from "./Post";
import Series from "./Series";
import Register from "./Register";
import Store from "./Store";
import Detail from "./Detail";
import Container from "@/components/author/Container";
import {
  faHouseChimneyWindow as faHouseChimneyWindowON,
  faInfinity as faInfinityON,
  faStars as faStarsON,
  faCartShopping as faCartShoppingON,
} from "@fortawesome/pro-light-svg-icons";
import {
  faHouseChimneyWindow as faHouseChimneyWindowOFF,
  faInfinity as faInfinityOFF,
  faStars as faStarsOFF,
  faCartShopping as faCartShoppingOFF,
} from "@fortawesome/pro-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("search");

  useEffect(() => {
    switch (location.pathname) {
      case "/author/list":
        setActiveMenu("creatorList");
        break;
      default:
        setActiveMenu("search");
    }
  }, [location.pathname]);
  const menus = {
    探索: [
      {
        code: "search",
        name: "探索",
        icon: {
          on: faHouseChimneyWindowON,
          off: faHouseChimneyWindowOFF,
        },
        link: "/author/plan",
      },
      {
        code: "timeline",
        name: "タイムライン",
        icon: {
          on: faInfinityON,
          off: faInfinityOFF,
        },
        link: "/author/series",
      },
    ],
    創作: [
      {
        code: "creatorList",
        name: "クリエイターリスト",
        icon: {
          on: faStarsON,
          off: faStarsOFF,
        },
        link: "/author/list",
      },
      {
        code: "maquettePlace",
        name: "マケットプレイス",
        icon: {
          on: faCartShoppingON,
          off: faCartShoppingOFF,
        },
        link: "/author/store",
      },
    ],
  };
  return (
    <>
      <Container menus={menus} activeMenu={activeMenu} type="author">
        <Routes>
          <Route path="store" element={<Store />} />
          <Route path="list" element={<List />} />
          <Route path="plan" element={<Plan />} />
          <Route path="post" element={<Post />} />
          <Route path="series" element={<Series />} />
          <Route path="register" element={<Register />} />
          <Route path="detail" element={<Detail />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
