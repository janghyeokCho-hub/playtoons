import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Header from "@COMPONENTS/Header";
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
  const isLogined = useSelector(({ login }) => login.isLogined);

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
    <div id="wrap" className={`${isLogined && "wrap_tophd"}`}>
      <Container
        menus={menus}
        headerOptions={{
          className: "ty1 mdetail",
          type: "post",
          isDetailView: true,
        }}
      >
        <div id="container" className="container sub mpost bg">
          <div className="inr-c">
            <Routes>
              <Route path={"novel/:id"} element={<Novel />} />
              <Route path={"webtoon/:id"} element={<Webtoon />} />
            </Routes>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;
