import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

const Webtoon = () => {
  const navigate = useNavigate();
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="lst_banner">
          <div className="swiper-container mySwiper1">
            <div className="swiper-wrapper">
              <div className="item swiper-slide">
                <a href="#">
                  <ContBgDiv
                    className="cont"
                    bgImg={require("@IMAGES/tmp_banner_bg.png")}
                  >
                    <div>
                      <p className="b1">
                        <span className="i-txt">おすすめ作品</span>
                      </p>
                      <p className="h1">かまちょマン</p>
                      <p className="t1">超能力ストリーマー</p>
                      <p className="t2">SIKBONG / SUKOONCE</p>
                    </div>
                  </ContBgDiv>
                  <div className="imgs">
                    <img
                      src={require("@IMAGES/tmp_banner_img.png")}
                      alt="이미지"
                    />
                  </div>
                </a>
              </div>
              <div className="item swiper-slide">
                <a href="#">
                  <ContBgDiv
                    className="cont"
                    bgImg={require("@IMAGES/tmp_banner_bg.png")}
                  >
                    <div>
                      <p className="b1">
                        <span className="i-txt">おすすめ作品</span>
                      </p>
                      <p className="h1">かまちょマン</p>
                      <p className="t1">阿修羅の力を発揮せよ…！</p>
                      <p className="t2">SIKBONG / SUKOONCE</p>
                    </div>
                  </ContBgDiv>
                  <div className="imgs">
                    <img
                      src={require("@IMAGES/tmp_banner_img.png")}
                      alt="이미지"
                    />
                  </div>
                </a>
              </div>
              <div className="item swiper-slide">
                <a href="#">
                  <ContBgDiv
                    className="cont"
                    bgImg={require("@IMAGES/tmp_banner_bg.png")}
                  >
                    <div>
                      <p className="b1">
                        <span className="i-txt">おすすめ作品</span>
                      </p>
                      <p className="h1">かまちょマン</p>
                      <p className="t1">超能力ストリーマー</p>
                      <p className="t2">SIKBONG / SUKOONCE</p>
                    </div>
                  </ContBgDiv>
                  <div className="imgs">
                    <img
                      src={require("@IMAGES/tmp_banner_img.png")}
                      alt="이미지"
                    />
                  </div>
                </a>
              </div>
              <div className="item swiper-slide">
                <a href="#">
                  <ContBgDiv
                    className="cont"
                    bgImg={require("@IMAGES/tmp_banner_bg.png")}
                  >
                    <div>
                      <p className="b1">
                        <span className="i-txt">おすすめ作品</span>
                      </p>
                      <p className="h1">かまちょマン</p>
                      <p className="t1">超能力ストリーマー</p>
                      <p className="t2">SIKBONG / SUKOONCE</p>
                    </div>
                  </ContBgDiv>
                  <div className="imgs">
                    <img
                      src={require("@IMAGES/tmp_banner_img.png")}
                      alt="이미지"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="swiper-pagination my1"></div>
          <button type="button" className="swiper-button-prev bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" className="swiper-button-next bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>

        <div className="tabs ty1">
          <ul>
            <li className="on">
              <a href="#">
                <span>すべて</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>連載</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>完結</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>短編</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="main_sch">
          <div className="lft">
            <a href="#" className="btn-pk n blue bdrs">
              すべて
            </a>
            <div className="inp_txt sch">
              <button type="button" className="btns" title="検索">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input type="text" className="" placeholder="ハッシュタグ検索" />
            </div>
            <a href="#" className="btn-pk n blue2 bdrs">
              異世界
            </a>
            <a href="#" className="btn-pk n blue2 bdrs">
              SF
            </a>
            <a href="#" className="btn-pk n blue2 bdrs">
              恋愛
            </a>
            <a href="#" className="btn-pk n blue2 bdrs">
              アクション
            </a>
            <a href="#" className="btn-pk n blue2 bdrs">
              日常
            </a>
            <a href="#" className="btn-pk n blue2 bdrs">
              その他
            </a>
          </div>
          <div className="rgh">
            <select className="select1">
              <option value="">おすすめ順</option>
            </select>
          </div>
        </div>

        <div className="lst_main_comic">
          <ul>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アークシェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
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
                <i className="fa-light fa-angle-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ContBgDiv = styled.div`
  color: #fff;
  background-image: url(${(props) => props.bgImg});
`;

export default Webtoon;
