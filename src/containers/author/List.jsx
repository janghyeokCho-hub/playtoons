import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";

import "@/css/swiper.css";
import {
  getAuthorList,
  getAuthorRecent,
  setCurrentAuthor,
} from "@/modules/redux/ducks/author";

import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";

const renderItems = (items) => {
  return items.map((item, index) => {
    return (
      <SwiperSlide key={index} className="cx">
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
  });
};

const RecommentAuthorComponent = ({ item, callback }) => {
  return (
    <div className="item">
      <div className="box_profile _half">
        <Link
          to={{
            pathname: "/author/post",
          }}
          state={{ item }}
          onClick={callback}
        >
          <div className="pf_thumb bind3">
            {/*<!-- 202210 수정 -->*/}
            <ImgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")} />
            <ImgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")} />
            <div></div>
          </div>
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
  const dispatch = useDispatch();
  const authors = useSelector(({ author }) => author.authors);
  const recents = useSelector(({ author }) => author.recents);

  useEffect(() => {
    if (!authors?.length) {
      dispatch(getAuthorList());
    }
  }, [dispatch, authors]);

  useEffect(() => {
    if (!recents?.length) {
      dispatch(getAuthorRecent());
    }
  }, [dispatch, recents]);

  const handleCurrentAuthor = (item) => {
    dispatch(setCurrentAuthor(item));
  };

  return (
    <div className="contents mauthor">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="h_tit0">最近確認したクリエイター</h2>
        </div>

        <div className="slider_profile">
          {recents && (
            <SwiperContainer
              className={"mySwiper1"}
              slidesPerView={5}
              breakpoints={{
                960: {
                  slidesPerView: 1.75,
                  spaceBetween: 8,
                },
                961: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              list={() => renderItems(recents)}
            />
          )}
        </div>

        <div className="hd_titbox">
          <h2 className="h_tit0">おすすめクリエイター</h2>
        </div>
        <div className="lst_author_profile">
          {authors &&
            authors.map((item, index) => (
              <RecommentAuthorComponent
                key={index}
                item={item}
                callback={() => handleCurrentAuthor(item)}
              />
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

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default List;
