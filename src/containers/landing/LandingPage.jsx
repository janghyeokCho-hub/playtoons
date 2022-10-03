import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutRequest } from "@/modules/redux/ducks/login";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import Footer from "@COMPONENTS/Footer";
const LandingPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Header isMenus={false} />
      <div id="container" className="container landing">
        <div className="main_notice">
          <p>
            クレジットカードのメンテナンスお知らせ <br className="view-m" />
            2022年6月14日 07時00分
          </p>
          <button type="button" className="btn_del">
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>

        <div className="main_visual">
          <div className="inr-c">
            <div className="thumb">
              <span className="hide-m">
                <img src={require("@IMAGES/main_visual.png")} alt="사진" />
              </span>
              <span className="view-m">
                <img src={require("@IMAGES/main_visual_m.png")} alt="사진" />
              </span>
            </div>
            <div className="txt ta-c">
              <p className="h1">あなたの好きなことが見つかる。</p>
              <p className="t1">
                PlayToons「プレイトゥーンズ」は、
                <br />
                クリエイターと支援者を繋ぐコミュニティです。
                <br />
                イラスト、ウェブトゥーン、小説など、
                <br />
                数えきれない作品をご覧にいただけます。
              </p>
              <div className="btn-bot">
                <a href="#" className="btn-pk b blue2 bdrs">
                  <span>はじめる</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🔥人気</h2>
            <div className="lst_comic1 long">
              <div id="mainSlider1" className="swiper-container mySwiper1">
                <div className="swiper-wrapper">
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn</p>
                        <p className="t1">43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>

                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="swiper-button-prev bt_mainSlider1"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                type="button"
                className="swiper-button-next bt_mainSlider1"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">⚡最新</h2>
            <div className="lst_comic1 long">
              <div id="mainSlider2" className="swiper-container mySwiper1">
                <div className="swiper-wrapper">
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn</p>
                        <p className="t1">43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="swiper-button-prev bt_mainSlider2"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                type="button"
                className="swiper-button-next bt_mainSlider2"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🎨クリエーター</h2>

            <div className="slider_profile">
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
              <div className="box_profile">
                <a href="#">
                  <ImgTmpProfileBgDiv
                    className="pf_thumb"
                    bgImg={require("@IMAGES/tmp_profile_bg.png")}
                  ></ImgTmpProfileBgDiv>
                  <div className="pf_txt">
                    <div className="icon">
                      <img
                        src={require("@IMAGES/img_profile.png")}
                        alt="profile"
                      />
                    </div>
                    <p className="h1">名前のない人間23349名前のない人間23349</p>
                    <p className="t1">
                      はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                      ファッション、夜と光の絵…
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">カテゴリー</h2>

            <div className="lst_card">
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_b1"
                    style={{ backgroundColor: "#2F83FF" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main1.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>アート</p>
                  </div>
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_c1"
                    style={{ backgroundColor: "#FFA82F" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main2.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>素材</p>
                  </div>
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_c1"
                    style={{ backgroundColor: "#9058FD" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main3.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>3Dアセット</p>
                  </div>
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_b1"
                    style={{ backgroundColor: "#FFBE28" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main4.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>ウェブトゥーン</p>
                  </div>
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_c1"
                    style={{ backgroundColor: "#FFDC2F" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main5.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>背景</p>
                  </div>
                </a>
              </div>
              <div className="col">
                <a href="#">
                  <div
                    className="thumb ty_c1"
                    style={{ backgroundColor: "#FFA82F" }}
                  >
                    <ImgBgSpan
                      bgImg={require("@IMAGES/img_landing_main6.png")}
                    ></ImgBgSpan>
                  </div>
                  <div className="txt">
                    <p>小説</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🌈おすすめウェブトゥーン</h2>
            <div className="lst_comic1 long">
              <div id="mainSlider3" className="swiper-container mySwiper1">
                <div className="swiper-wrapper">
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn</p>
                        <p className="t1">43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="swiper-button-prev bt_mainSlider3"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                type="button"
                className="swiper-button-next bt_mainSlider3"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">📝おすすめウェブ小説</h2>
            <div className="lst_comic1 long">
              <div id="mainSlider4" className="swiper-container mySwiper1">
                <div className="swiper-wrapper">
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn</p>
                        <p className="t1">43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                  <div className="cx swiper-slide">
                    <a href="#">
                      <div className="cx_thumb">
                        <span>
                          <img
                            src={require("@IMAGES/tmp_comic2.jpg")}
                            alt="사진"
                          />
                        </span>
                        <p className="t_like">
                          <FontAwesomeIcon icon={faHeart} />
                          <span>1.2k</span>
                        </p>
                      </div>
                      {/*<!-- 202209 ico수정 -->*/}
                      <div className="cx_txt">
                        <p className="t1 c-blue">ウェブトゥーン</p>
                        <p className="h1">
                          大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                        </p>
                        <p className="t1">Studio reBorn・43話</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="swiper-button-prev bt_mainSlider4"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                type="button"
                className="swiper-button-next bt_mainSlider4"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default LandingPage;
