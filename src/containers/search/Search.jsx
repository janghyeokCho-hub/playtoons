import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";

const Search = () => {
  const [selectTab, setSelectTab] = useState("SEARCH");
  return (
    <>
      <div class="hd_tabbox">
        <div class="tabs ty1">
          <ul class="inr-c">
            <li
              class={selectTab === "SEARCH" ? "on" : ""}
              onClick={() => setSelectTab("SEARCH")}
            >
              <Link to="">
                <span>探索</span>
              </Link>
            </li>
            <li
              class={selectTab === "STORE" ? "on" : ""}
              onClick={() => setSelectTab("STORE")}
            >
              <Link to="">
                <span>マケットプレイス</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div class="top_search inr-c">
        <h2 class="m_tit1">
          <span class="c-blue">“エヴァンゲリオン”</span>の検索結果 4112件
        </h2>
        <div class="in ty1">
          <div class="lft">
            <div class="tabs ty2">
              <ul>
                <li class="on">
                  <a href="#">すべて</a>
                </li>
                <li>
                  <a href="#">シリーズ</a>
                </li>
                <li>
                  <a href="#">ハッシュタグ</a>
                </li>
                <li>
                  <a href="#">クリエイター</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="rgh">
            <div class="btn_select1">
              <button type="button" class="select_tit">
                おすすめ順
              </button>
              <div class="select_list">
                <ul>
                  <li>
                    <a href="#">おすすめ順</a>
                  </li>
                  <li>
                    <a href="#">最新順</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="area_schmain inr-c">
        <div class="hd_titbox">
          <h2 class="m_tit1 mb0">人気</h2>
        </div>

        <div class="lst_comic1 long">
          <div id="mainSlider1" class="swiper-container mySwiper1">
            <div class="swiper-wrapper">
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                    <p class="t1">43話</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
              <div class="cx swiper-slide">
                <a href="#">
                  <div class="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p class="t_like">
                      <i class="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div class="cx_txt">
                    <p class="t1 c-blue">ウェブトゥーン</p>
                    <p class="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p class="t1">Studio reBorn</p>
                    <p class="t1">43話</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <button type="button" class="swiper-button-prev bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" class="swiper-button-next bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>

      <div class="area_schmain inr-c">
        <div class="hd_titbox">
          <h2 class="m_tit1 mb0">シリーズ</h2>
          <a href="#" class="rgh btn-pk n blue2">
            <span class="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
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
      </div>

      <div class="area_schmain inr-c">
        <div class="hd_titbox">
          <h2 class="m_tit1 mb0">クリエーター</h2>
          <a href="#" class="rgh btn-pk n blue2">
            <span class="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
        </div>
        <div class="slider_profile">
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div class="box_profile">
            <a href="#">
              <ImgDiv
                class="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div class="pf_txt">
                <div class="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p class="h1">名前のない人間23349名前のない人間23349</p>
                <p class="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Search;
