import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  getAuthorList,
  getAuthorRecent,
  setCurrentAuthor,
} from "@/modules/redux/ducks/author";
import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";
import { getFileUrlFromServer } from "@API/fileService";
import { getPostSeries as getPostSeriesAPI } from "@API/postService";

async function getFileURLData(hash, state) {
  const response = await getFileUrlFromServer(hash);
  if (response.status === 200) {
    state(response?.data?.url);
  }
}

const RecentComponent = ({ item }) => {
  const [backgroundImgURL, setBackgroundImgURL] = useState(null);
  useEffect(() => {
    if (item?.backgroundImage) {
      getFileURLData(item.backgroundImage);
      getFileURLData(item.backgroundImage, setBackgroundImgURL);
    }
  }, [item]);

  return (
    <div className="box_profile">
      <Link
        to={{
          pathname: "/author/post",
        }}
        state={{ item }}
      >
        {/* 이미지 default 값 필요 */}
        <ImgTmpProfileBgDiv className="pf_thumb" bgImg={backgroundImgURL} />
        <div className="pf_txt">
          <div className="icon">
            {/* 이미지 default 값 필요 */}
            <img src={backgroundImgURL} alt="profile" />
          </div>
          <p className="h1">{item.nickname}</p>
          <p className="t1">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};

const renderItems = (items) => {
  return items.map((item, index) => (
    <SwiperSlide key={`recent_${index}`} className="cx">
      <RecentComponent item={item} />
    </SwiperSlide>
  ));
};

const SeriesImgComponent = ({ item }) => {
  const [coverImgURL, setCoverImgURL] = useState(null);
  useEffect(() => {
    if (item?.coverImage) {
      getFileURLData(item.coverImage, setCoverImgURL);
    }

    return () => {
      setCoverImgURL(null);
    };
  }, [item]);
  return <ImgDiv bgImg={coverImgURL} />;
};

const RecommentAuthorComponent = ({ item, callback }) => {
  console.log("RecommentAuthorComponent : ", item);
  const [list, setList] = useState([]);
  const [profileImgURL, setProfileImgURL] = useState(null);

  useEffect(() => {
    async function getPostSeries(id) {
      const response = await getPostSeriesAPI(id);
      if (response.status === 200) {
        console.log("검색 id : ", id);
        console.log("데이터 : ", response?.data?.series);
        let result = response?.data?.series || [];
        if (!Array.isArray(result)) {
          result = new Array(result);
        }

        while (result.length < 3) {
          result.push({ coverImage: null });
        }
        setList(result);
      }
    }

    if (item?.id) {
      getPostSeries(item.id);
    }
  }, [item]);

  useEffect(() => {
    if (item?.profileImage) {
      getFileURLData(item?.profileImage, setProfileImgURL);
    }

    return () => {
      setProfileImgURL(null);
    };
  }, [item]);

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
            {/* 이미지 default 값 필요 */}
            {/* 어떤 이미지를 사용하면서, 배열로 주는지 확인 */}
            {list && list.map((item) => <SeriesImgComponent item={item} />)}
          </div>
          <div className="pf_txt">
            <div className="icon">
              {/* 이미지 default 값 필요 */}
              <img src={profileImgURL} alt="profile" />
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
