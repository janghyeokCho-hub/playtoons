import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/css/swiper.css";
import { useState } from "react";
import { getAuthorList as getAuthorListAPI } from "@API/authorService";

const SlideItemComponent = ({ item }) => {
  return (
    <SwiperSlide
      className="swiper-slide"
      style={{
        width: "408px",
        marginRight: "15px",
      }}
    >
      <div className="box_profile">
        <Link
          to={{
            pathname: "/author/post",
          }}
          state={{ item }}
        >
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={item.backgroundImage}
          />
          <div className="pf_txt">
            <div className="icon">
              <img src={item.profileImage} alt="profile" />
            </div>
            <p className="h1">{item.nickname}</p>
            <p className="t1">{item.description}</p>
          </div>
        </Link>
      </div>
    </SwiperSlide>
  );
};

const RecommentAuthorComponent = ({ item }) => {
  return (
    <div className="item">
      <div className="box_profile _half">
        <Link
          to={{
            pathname: "/author/post",
          }}
          state={{ item }}
        >
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={item.backgroundImage}
          />
          <div className="pf_txt">
            <div className="icon">
              <img src={item.profileImage} alt="profile" />
            </div>
            <p className="h1">{item.nickname}</p>
            <p className="t1">{item.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const List = () => {
  const [recommendedData, setRecommendedData] = useState([]);

  useEffect(() => {
    async function getAuthorList() {
      const response = await getAuthorListAPI();
      const { status, data } = response;

      if (status === 200) {
        setRecommendedData(data.authors);
      }
    }

    if (!recommendedData?.length) {
      getAuthorList();
    }
  }, [recommendedData]);

  /**
   * 최근 확인한 작가 임시 데이터
   */
  const slideList = [
    {
      id: "1",
      description: "string",
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "h54h",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: "string",
      backgroundImage: "string",
    },
    {
      id: "2",
      description: `はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
      ファッション、夜と光の絵…`,
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "2_名前のない人間23349名前のない人間23349",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: require("@IMAGES/img_profile.png"),
      backgroundImage: require("@IMAGES/tmp_profile_bg.png"),
    },
    {
      id: "3",
      description: `はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
      ファッション、夜と光の絵…`,
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "3_名前のない人間23349名前のない人間23349",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: require("@IMAGES/img_profile.png"),
      backgroundImage: require("@IMAGES/tmp_profile_bg.png"),
    },
    {
      id: "4",
      description: `はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
      ファッション、夜と光の絵…`,
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "4_名前のない人間23349名前のない人間23349",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: require("@IMAGES/img_profile.png"),
      backgroundImage: require("@IMAGES/tmp_profile_bg.png"),
    },
    {
      id: "5",
      description: `はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
      ファッション、夜と光の絵…`,
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "5_名前のない人間23349名前のない人間23349",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: require("@IMAGES/img_profile.png"),
      backgroundImage: require("@IMAGES/tmp_profile_bg.png"),
    },
    {
      id: "6",
      description: `はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
      ファッション、夜と光の絵…`,
      name: "string",
      nameEng: "string",
      nameKana: "string",
      nickname: "6_名前のない人間23349名前のない人間23349",
      nicknameEng: "string",
      nicknameKana: "string",
      logoImage: "string",
      profileImage: require("@IMAGES/img_profile.png"),
      backgroundImage: require("@IMAGES/tmp_profile_bg.png"),
    },
  ];

  return (
    <div className="contents mauthor">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="h_tit0">最近確認したクリエイター</h2>
        </div>

        <div className="slider_profile">
          <div className="swiper-container mySwiper1">
            <Swiper className="swiper-wrapper">
              {/* 최근 확인한 작가 */}
              {slideList.map((item, index) => (
                <SlideItemComponent key={index} item={item} />
              ))}
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
          {/* 추천 작가 */}
          {recommendedData.map((item, index) => (
            <RecommentAuthorComponent key={index} item={item} />
          ))}
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
