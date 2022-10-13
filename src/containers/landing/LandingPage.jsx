import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faHeart } from "@fortawesome/pro-solid-svg-icons";
import Footer from "@COMPONENTS/Footer";
import SwiperContainer from "@/components/dashboard/Swiper";
import { SwiperSlide } from "swiper/react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { getFileUrlFromServer } from "@API/fileService";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import { getPostType as getPostTypeAPI } from "@API/postService";

async function getFileURLData(hash, state) {
  const response = await getFileUrlFromServer(hash);
  if (response.status === 200) {
    state(response?.data?.url);
  }
}

async function getAuthor(id, state) {
  const response = await getAuthorAPI(id);
  if (response.status === 200) {
    state(response?.data?.author);
  }
}

const LandingPage = () => {
  const [curation1, setCuration1] = useState([]);
  const [curation2, setCuration2] = useState([]);
  const [curation3, setCuration3] = useState([]);
  const [curation4, setCuration4] = useState([]);
  const [curation5, setCuration5] = useState([]);
  const [postType, setPostType] = useState([]);
  const postTypeColor = [
    "#2F83FF",
    "#FFA82F",
    "#9058FD",
    "#FFBE28",
    "#FFDC2F",
    "#FFA82F",
  ];
  const postTypeImg = [
    require("@IMAGES/img_landing_main1.png"),
    require("@IMAGES/img_landing_main2.png"),
    require("@IMAGES/img_landing_main3.png"),
    require("@IMAGES/img_landing_main4.png"),
    require("@IMAGES/img_landing_main5.png"),
    require("@IMAGES/img_landing_main6.png"),
  ];

  const getCurationList = async (num, state) => {
    const response = await getCurationListAPI(num);
    if (response.status === 200) {
      if (num === 3) {
        state(response.data.authors);
      } else {
        console.log(`posts${num} : `, response.data.posts);
        state(response.data.posts);
      }
    }
  };

  const getPostType = async () => {
    const response = await getPostTypeAPI();
    console.log(response);
    if (response.status === 200) {
      setPostType(response.data.types);
    }
  };

  useEffect(() => {
    if (!curation1?.length) {
      getCurationList(1, setCuration1);
    }
  }, [curation1]);

  useEffect(() => {
    if (!curation2?.length) {
      getCurationList(2, setCuration2);
    }
  }, [curation2]);

  useEffect(() => {
    if (!curation3?.length) {
      getCurationList(3, setCuration3);
    }
  }, [curation3]);

  useEffect(() => {
    if (!curation4?.length) {
      getCurationList(4, setCuration4);
    }
  }, [curation4]);

  useEffect(() => {
    if (!curation5?.length) {
      getCurationList(5, setCuration5);
    }
  }, [curation5]);

  useEffect(() => {
    if (!postType?.length) {
      getPostType();
    }
  }, [postType]);

  const Curation1Component = ({ item }) => {
    const [thumbnailImgURL, setThumbnailImgURL] = useState(null);
    const [author, setAuthor] = useState(null);
    useEffect(() => {
      if (item?.thumbnailImage) {
        getFileURLData(item.thumbnailImage, setThumbnailImgURL);
      }

      if (item?.authorId) {
        getAuthor(item.authorId, setAuthor);
      }
    }, [item]);
    return (
      <Link to="/">
        <div className="cx_thumb">
          <span>
            <img src={thumbnailImgURL} alt="사진" />
          </span>
          <p className="t_like">
            <FontAwesomeIcon icon={faHeart} />
            <span>{item.likeCount}</span>
          </p>
        </div>
        <div className="cx_txt">
          <p className="t1 c-blue">
            {item.categoryId}카테고리 아이디만 넘어오고 있음 따로 API 없는듯
          </p>
          <p className="h1">{item.title}</p>
          <p className="t1">{author?.name}</p>
          <p className="t1">{item.endAt || 0}話</p>
        </div>
      </Link>
    );
  };

  const AuthorComponent = ({ item }) => {
    const [backgroundImgURL, setBackgroundImgURL] = useState(null);
    const [profileImgURL, setProfileImgURL] = useState(null);

    useState(() => {
      if (item?.backgroundImage) {
        getFileURLData(item.backgroundImage, setBackgroundImgURL);
      }

      if (item?.profileImage) {
        getFileURLData(item.profileImage, setProfileImgURL);
      }
    }, [item]);

    return (
      <div className="box_profile">
        <a href="#">
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={backgroundImgURL}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              <img src={profileImgURL} alt="profile" />
            </div>
            <p className="h1">{item.name}</p>
            <p className="t1">{item.description}</p>
          </div>
        </a>
      </div>
    );
  };

  const PostTypeComponent = ({ item, bgColor, bgImg }) => {
    return (
      <div className="col">
        <a href="#">
          <div className="thumb ty_b1" style={{ backgroundColor: bgColor }}>
            <ImgBgSpan bgImg={bgImg}></ImgBgSpan>
          </div>
          <div className="txt">
            <p>{item?.name}</p>
          </div>
        </a>
      </div>
    );
  };

  const renderItems = (items) => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={`render_${index}`} className="cx">
          <Curation1Component item={item} />
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
                list={() => renderItems(curation1)}
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
                list={() => renderItems(curation2)}
              />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🎨クリエーター</h2>

            <div className="slider_profile">
              {curation3 &&
                curation3.map((item, index) => (
                  <AuthorComponent key={`author_${index}`} item={item} />
                ))}
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">カテゴリー</h2>

            <div className="lst_card">
              {postType &&
                postType.map((item, index) => (
                  <PostTypeComponent
                    key={`postType_${index}`}
                    item={item}
                    bgColor={postTypeColor[index]}
                    bgImg={postTypeImg[index]}
                  />
                ))}
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
                list={() => renderItems(curation4)}
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
                list={() => renderItems(curation5)}
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
