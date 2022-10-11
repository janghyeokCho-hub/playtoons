import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faHeart } from "@fortawesome/pro-solid-svg-icons";
import Footer from "@COMPONENTS/Footer";
import { useEffect } from "react";

import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";

const LandingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      dispatch();
    }
  }, [dispatch, code]);

  const vogueItems = [
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
  ];
  const latestItems = [
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
  ];
  const recommendedWebtoonItems = [
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
  ];
  const recommendedNovelItems = [
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
    {
      preview: require("@IMAGES/tmp_comic2.jpg"),
      like: "1.2k",
      category: "ウェブトゥーン",
      title:
        "大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル",
      studio: "Studio reBorn",
      episodes: "43",
    },
  ];

  const renderItems = (items) => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={index} className="cx">
          <Link to="/">
            <div className="cx_thumb">
              <span>
                <img src={item.preview} alt="사진" />
              </span>
              <p className="t_like">
                <FontAwesomeIcon icon={faHeart} />
                <span>{item.like}</span>
              </p>
            </div>
            <div className="cx_txt">
              <p className="t1 c-blue">{item.category}</p>
              <p className="h1">{item.title}</p>
              <p className="t1">{item.studio}</p>
              <p className="t1">{item.episodes}話</p>
            </div>
          </Link>
        </SwiperSlide>
      );
    });
  };

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
              <span>
                <img src={require("@IMAGES/main_visual_img.png")} alt="사진" />
              </span>
              <p className="copy">&copy;Studio reBorn</p>
            </div>
            {/*<!-- 202210 수정 -->*/}
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
              <SwiperContainer
                className={"mySwiper1"}
                slidesPerView={5}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  961: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
                list={() => renderItems(vogueItems)}
              />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">⚡最新</h2>
            <div className="lst_comic1 long">
              <SwiperContainer
                className={"mySwiper1"}
                slidesPerView={5}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  961: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
                list={() => renderItems(latestItems)}
              />
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
              <SwiperContainer
                className={"mySwiper1"}
                slidesPerView={5}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  961: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
                list={() => renderItems(recommendedWebtoonItems)}
              />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">📝おすすめウェブ小説</h2>
            <div className="lst_comic1 long">
              <SwiperContainer
                className={"mySwiper1"}
                slidesPerView={5}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                  },
                  961: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  1280: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                  },
                }}
                list={() => renderItems(recommendedNovelItems)}
              />
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
