import React from "react";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import Webtoon from "./Webtoon";
import Container from "@COMPONENTS/webtoon/Container";
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
        link: "",
      },
      {
        code: "timeline",
        name: "タイムライン",
        icon: {
          on: faInfinityON,
          off: faInfinityOFF,
        },
        link: "",
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
        link: "",
      },
    ],
  };
  return (
    <Container menus={menus}>
      <Routes>
        <Route path="*" element={<Webtoon />} />
      </Routes>
    </Container>
  );
};

export default App;
