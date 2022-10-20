import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Post from "./Post";
import Register from "./Register";
import RegisterForm from "./RegisterForm";
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

const App = () => {
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
          <Route path="post" element={<Post />} />
          <Route path="register" element={<Register />} />
          <Route path="register/form" element={<RegisterForm />} />
          <Route path="detail/:type/:id" element={<Detail />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
