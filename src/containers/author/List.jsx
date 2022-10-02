import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/css/swiper.css";

const List = () => {
  const navigate = useNavigate();

  console.log("Author");
  return (
    <div className="contents mauthor">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="h_tit0">最近確認したクリエイター</h2>
        </div>

        <div className="slider_profile">
          <div className="swiper-container mySwiper1">
            <Swiper className="swiper-wrapper">
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                style={{
                  width: "408px",
                  marginRight: "15px",
                }}
              >
                <div className="box_profile">
                  <a href="#">
                    <ImgTmpProfileBgDiv
                      className="pf_thumb"
                      bgImg={require("@IMAGES/tmp_profile_bg.png")}
                    />
                    <div className="pf_txt">
                      <div className="icon">
                        <img
                          src={require("@IMAGES/img_profile.png")}
                          alt="profile"
                        />
                      </div>
                      <p className="h1">
                        名前のない人間23349名前のない人間23349
                      </p>
                      <p className="t1">
                        はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                        ファッション、夜と光の絵…
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <button type="button" className="swiper-button-prev my1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" className="swiper-button-next my1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>

        <div className="hd_titbox">
          <h2 className="h_tit0">おすすめクリエイター</h2>
        </div>
        <div className="lst_author_profile">
          <div className="item">
            <div className="box_profile _half">
              <a href="#">
                <ImgTmpProfileBgDiv
                  className="pf_thumb"
                  bgImg={require("@IMAGES/tmp_profile_bg.png")}
                />
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
                    ファッション、夜と光の絵MV制作🥀🥀 音楽、
                    ファッション、夜と光の絵MV制作🥀🥀 音楽、
                    ファッション、夜と光の絵…
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className="item">
            <div className="box_profile _half">
              <a href="#">
                <ImgTmpProfileBgDiv
                  className="pf_thumb"
                  bgImg={require("@IMAGES/tmp_profile_bg.png")}
                />
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
          <div className="item">
            <div className="box_profile _half">
              <a href="#">
                <ImgTmpProfileBgDiv
                  className="pf_thumb"
                  bgImg={require("@IMAGES/tmp_profile_bg.png")}
                />
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
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default List;
