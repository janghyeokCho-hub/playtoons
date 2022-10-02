import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyWindow as faHouseChimneyWindowON,
  faInfinity as faInfinityON,
  faStars as faStarsON,
  faCartShopping as faCartShoppingON,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/pro-light-svg-icons";
import {
  faHouseChimneyWindow as faHouseChimneyWindowOFF,
  faInfinity as faInfinityOFF,
  faStars as faStarsOFF,
  faCartShopping as faCartShoppingOFF,
  faHeart,
  faCommentQuote,
  faShare,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";

import ImgComic1 from "@IMAGES/tmp_comic1.jpg";
import ImgComic2 from "@IMAGES/tmp_comic2.jpg";
import ImgProfile from "@IMAGES/img_profile.png";

const Detail = () => {
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
    <Container menus={menus} type="series">
      <div className="inr-c">
        <div className="wrap_series_detail">
          <div className="top_detail">
            <div className="ar_view">
              <div className="thumb">
                <img src={ImgComic2} alt="만화책" />
              </div>
              <div className="cont">
                <div className="tit">
                  <p className="h1">シェルターアーク</p>
                  <div className="rgh">
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faHeart} />
                      1.2k
                    </button>
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faCommentQuote} />
                      966
                    </button>
                    <button type="button" className="btn-pk n blue2">
                      <FontAwesomeIcon icon={faShare} />
                      共有する
                    </button>
                  </div>
                </div>
                <p className="t1">
                  No.13の災害後、人類はシェルターにバラバラに散った。
                  そして、奇妙なロボット”クモ”の出現によりシェルター周
                  辺に防壁が張り巡らされた。
                  クモと戦う為、特殊チームレンジャーを創設したが、クモ
                  の圧倒的な力には勝てず…
                </p>

                <div className="lst_tag">
                  <div className="i_tag">#アクション</div>
                  <div className="i_tag">#異世界</div>
                </div>
              </div>
            </div>
            <div className="ar_name">
              <div>
                <div className="icon">
                  <ImgProfileSpan
                    bgImg={require("@IMAGES/img_profile.png")}
                  ></ImgProfileSpan>
                </div>
                <p>Studio reBorn</p>
              </div>
              <a href="#" className="btn-pk n blue">
                支援する
              </a>
              <a href="#" className="btn-pk n blue2">
                フォロー
              </a>
            </div>
          </div>

          <div className="tabs">
            <ul>
              <li className="on">
                <a href="#">
                  <span>最新話から</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>1話から</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lst_detail">
            <ul>
              <li className="item">
                <a href="#">
                  <div className="thumb">
                    <img src={ImgComic1} alt="" />
                  </div>
                  <div className="txt">
                    <p className="h1">
                      2話 :
                      シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                    </p>
                    <p className="t1">
                      モと戦う為、特殊チームレンジャーを創設したが、
                      <br />
                      クモの圧倒的な力には勝てず。
                    </p>
                  </div>
                  <div className="botm">
                    <p className="d1">2022/09/12 12:00</p>
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faHeart} />
                      1.2k
                    </button>
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faCommentQuote} />
                      966
                    </button>
                  </div>
                </a>
              </li>
              <li className="item">
                <a href="#">
                  <div className="thumb">
                    <img src={ImgComic1} alt="" />
                    <div className="area_lock">
                      {/*<!-- 잠금 -->*/}
                      <div>
                        <p>
                          <FontAwesomeIcon icon={faLock} />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="txt">
                    <p className="h1">
                      <span className="i-txt">支援</span>3話 : シェルターアーク
                    </p>
                    <p className="t1">
                      モと戦う為、特殊チームレンジャーを創設したが、
                      <br />
                      クモの圧倒的な力には勝てず。
                    </p>
                  </div>
                  <div className="botm">
                    <p className="d1">2022/09/12 12:00</p>
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faHeart} />
                      1.2k
                    </button>
                    <button type="button" className="btn01">
                      <FontAwesomeIcon icon={faCommentQuote} />
                      966
                    </button>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="pagenation">
            <ul>
              <li className="prev">
                <a href="#">
                  <i className="fa-light fa-angle-left"></i>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li className="on">
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li className="next">
                <a href="#">
                  <FontAwesomeIcon icon={faAngleRight} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Detail;
