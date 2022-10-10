import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "@/css/swiper.css";
import {
  getAuthorList,
  getAuthorRecent,
  setCurrentAuthor,
} from "@/modules/redux/ducks/author";

const SlideItemComponent = ({ item, callback }) => {
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
          onClick={callback}
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
          <div className="swiper-container mySwiper1">
            <Swiper className="swiper-wrapper">
              {/* 최근 확인한 작가 */}
              {recents &&
                recents.map((item, index) => (
                  <SlideItemComponent
                    key={index}
                    item={item}
                    callback={() => handleCurrentAuthor(item)}
                  />
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
