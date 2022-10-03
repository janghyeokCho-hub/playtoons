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

const Novel = () => {
  const navigate = useNavigate();

  return (
    <div class="contents">
      <div class="inr-c">
        <div class="lst_banner long">
          <div class="swiper-container mySwiper1">
            <div class="swiper-wrapper">
              <div class="item swiper-slide">
                <a href="#">
                  <img src={require("@IMAGES/tmp_banner.png")} alt="이미지" />
                </a>
              </div>
              <div class="item swiper-slide">
                <a href="#">
                  <img src={require("@IMAGES/tmp_banner.png")} alt="이미지" />
                </a>
              </div>
            </div>
          </div>

          <div class="swiper-pagination my1"></div>

          <button type="button" className="swiper-button-prev bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" className="swiper-button-next bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>

        <div class="tabs ty1">
          <ul>
            <li class="on">
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

        <div class="main_sch">
          <div class="lft">
            <a href="#" class="btn-pk n blue bdrs">
              すべて
            </a>
            <div class="inp_txt sch">
              <button type="button" class="btns" title="検索">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              <input type="text" class="" placeholder="ハッシュタグ検索" />
            </div>
            <a href="#" class="btn-pk n blue2 bdrs">
              異世界
            </a>
            <a href="#" class="btn-pk n blue2 bdrs">
              SF
            </a>
            <a href="#" class="btn-pk n blue2 bdrs">
              恋愛
            </a>
            <a href="#" class="btn-pk n blue2 bdrs">
              アクション
            </a>
            <a href="#" class="btn-pk n blue2 bdrs">
              日常
            </a>
            <a href="#" class="btn-pk n blue2 bdrs">
              その他
            </a>
          </div>
          <div class="rgh">
            <select class="select1">
              <option value="">おすすめ順</option>
            </select>
          </div>
        </div>

        <div class="lst_main_comic">
          <ul>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アークシェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p class="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div class="cx_txt">
                  <p class="h1">シェルター・アーク</p>
                  <p class="t1">Studio reBorn</p>
                  <p class="t1 c-gray">96話</p>
                  <div class="lst_tag">
                    <div class="i_tag">#男性におすすめ</div>
                    <div class="i_tag">#異世界</div>
                    <div class="i_tag">#初公開</div>
                    <div class="i_tag">#SF</div>
                    <div class="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div class="pagenation">
          <ul>
            <li class="prev">
              <a href="#">
                <i class="fa-light fa-angle-left"></i>
              </a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
            <li class="on">
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li class="next">
              <a href="#">
                <i class="fa-light fa-angle-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Novel;
