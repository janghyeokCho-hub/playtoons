import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import List from "./List";
import Plan from "./Plan";
import Post from "./Post";
import Series from "./Series";
import Register from "./Register";
import Store from "./Store";
import Detail from "./Detail";
import Container from "@COMPONENTS/Container";
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
  const navigate = useNavigate();
  const menus = {
    探索: [
      {
        code: "search",
        name: "探索",
        icon: {
          on: faHouseChimneyWindowON,
          off: faHouseChimneyWindowOFF,
        },
        callback: () => navigate(""),
      },
      {
        code: "timeline",
        name: "タイムライン",
        icon: {
          on: faInfinityON,
          off: faInfinityOFF,
        },
        callback: () => navigate(""),
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
        callback: () => navigate(""),
      },
      {
        code: "maquettePlace",
        name: "マケットプレイス",
        icon: {
          on: faCartShoppingON,
          off: faCartShoppingOFF,
        },
        callback: () => navigate(""),
      },
    ],
  };
  return (
    <>
      <Container menus={menus} type="author">
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
