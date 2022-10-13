import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import SearchPopup from "./SearchPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import { getFileUrlFromServer } from "@API/fileService";

import { getPostType as getPostTypeAPI } from "@API/postService";
import { getPostCategoryListFromServer as getCategoryListAPI } from "@API/dashboardService";
import { getAuthor as getAuthorAPI } from "@API/authorService";

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

const Webtoon = () => {
  SwiperCore.use([Navigation, Pagination]);

  const navigate = useNavigate();
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [isSelectShow, setIsSelectShow] = useState(false);
  const [selectMenu, setSelectMenu] = useState("おすすめ順");
  const [selectTab, setSelectTab] = useState("すべて");
  const [selectCategorys, setSelectCategorys] = useState([]);
  const [curation4, setCuration4] = useState([]);
  const [postType, setPostType] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const getPostType = async () => {
    const response = await getPostTypeAPI();
    if (response.status === 200) {
      setPostType(response.data.types);
    }
  };

  const getCategoryList = async (id) => {
    const response = await getCategoryListAPI(id);
    if (response.status === 200) {
      setCategoryList(response.data.categories);
    }
  };

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

  useEffect(() => {
    if (!postType?.length) {
      getPostType();
    }
  }, [postType]);

  useEffect(() => {
    if (!curation4?.length) {
      getCurationList(4, setCuration4);
    }
  }, [curation4]);

  useEffect(() => {
    if (postType?.length && !categoryList?.length) {
      const webtoon = postType.find((post) => post.code === "webtoon");
      getCategoryList(webtoon.id);
    }
  }, [categoryList, postType]);

  const handleSelectMenu = (menu) => {
    setIsSelectShow(!isSelectShow);
    setSelectMenu(menu);
  };

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const CurationComponent = ({ item, category }) => {
    const [author, setAuthor] = useState(null);
    const [backgroundImgURL, setBackgroundImgURL] = useState(null);
    const [profileImgURL, setProfileImg] = useState(null);

    useEffect(() => {
      if (item?.backgroundImage) {
        getFileURLData(item.backgroundImage, setBackgroundImgURL);
      }

      if (item?.authorId) {
        getAuthor(item?.authorId, setAuthor);
      }

      if (item?.profileImage) {
        getFileURLData(item?.profileImage, setProfileImg);
      }
    }, [item]);

    return (
      <Link to="/">
        <ContBgDiv className="cont" bgImg={backgroundImgURL}>
          <div>
            <p className="b1">
              <span className="i-txt">{category?.name}</span>
            </p>
            <p className="h1">{item.title}</p>
            <p className="t1">{item.description}</p>
            <p className="t2">{author?.name}</p>
          </div>
        </ContBgDiv>
        <div className="imgs">
          <img src={profileImgURL} alt="이미지" />
        </div>
      </Link>
    );
  };

  const renderItems = (items) => {
    return items.map((item, index) => {
      const category = categoryList.find(
        (category) => category.id === item.categoryId
      );
      return (
        <SwiperSlide key={index} className="cx">
          <CurationComponent item={item} category={category} />
        </SwiperSlide>
      );
    });
  };

  const [selectTag, setSelectTag] = useState(null);
  const tags = [
    {
      id: "different",
      name: "異世界",
    },
    {
      id: "sf",
      name: "SF",
    },
    {
      id: "love",
      name: "恋愛",
    },
    {
      id: "action",
      name: "アクション",
    },
    {
      id: "everyday",
      name: "日常",
    },
    {
      id: "others",
      name: "その他",
    },
  ];

  return (
    <>
      <div className="contents">
        <div className="inr-c">
          {curation4 && (
            <div className="lst_banner">
              <Swiper
                className="swiper-container mySwiper1"
                slidesPerView={3}
                slidesPerGroup={1}
                spaceBetween={12}
                centeredSlides={true}
                loop={true}
                observer={true}
                observeParents={true}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1.3,
                    spaceBetween: 16,
                  },
                  1000: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  1400: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                  },
                }}
                onUpdate={(swiper) => {
                  nextRef?.current?.classList?.add("slide_st");
                  prevRef?.current?.classList?.add("slide_st");
                }}
              >
                {renderItems(curation4)}
              </Swiper>

              <div className="swiper-pagination my1"></div>

              <button
                ref={prevRef}
                type="button"
                className="swiper-button-prev my1 hide-m"
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button
                ref={nextRef}
                type="button"
                className="swiper-button-next my1 hide-m"
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          )}

          <div className="tabs ty1">
            <ul>
              <li
                className={selectTab === "すべて" ? "on" : ""}
                onClick={() => handleSelectTab("すべて")}
              >
                <a href="#">
                  <span>すべて</span>
                </a>
              </li>
              <li
                className={selectTab === "連載" ? "on" : ""}
                onClick={() => handleSelectTab("連載")}
              >
                <a href="#">
                  <span>連載</span>
                </a>
              </li>
              <li
                className={selectTab === "完結" ? "on" : ""}
                onClick={() => handleSelectTab("完結")}
              >
                <a href="#">
                  <span>完結</span>
                </a>
              </li>
              <li
                className={selectTab === "短編" ? "on" : ""}
                onClick={() => handleSelectTab("短編")}
              >
                <a href="#">
                  <span>短編</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="main_sch">
            <div className="lft">
              <a href="#" className="btn-pk n blue bdrs">
                すべて
              </a>
              <button
                type="button"
                className="btn_sch_input"
                onClick={() => setIsSearchPopupShow(!isSearchPopupShow)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
              </button>
              {categoryList &&
                categoryList.map((tag, index) => (
                  <Link
                    key={`tag_${index}`}
                    to=""
                    className={`btn-pk n bdrs blue2 ${
                      tag.id === selectTag ? "on" : ""
                    }`}
                    onClick={() => {
                      if (tag.id === selectTag) {
                        setSelectTag(null);
                      } else {
                        setSelectTag(tag.id);
                      }
                    }}
                  >
                    {tag.name}
                    {tag.id === selectTag && (
                      <button
                        type="button"
                        className="btn_sch_del"
                        onClick={() => setSelectTag(null)}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>
                    )}
                  </Link>
                ))}
            </div>
            <div className="rgh">
              {/*<!-- 20221005 수정 : 셀렉트드롭다운 -->*/}
              <div className="btn_select1">
                <button
                  type="button"
                  className="select_tit"
                  onClick={() => setIsSelectShow(!isSelectShow)}
                >
                  {selectMenu}
                </button>
                <div
                  className="select_list"
                  style={{ display: isSelectShow ? "" : "none" }}
                >
                  <ul>
                    <li onClick={() => handleSelectMenu("おすすめ順")}>
                      <a href="#">おすすめ順</a>
                    </li>
                    <li onClick={() => handleSelectMenu("最新順")}>
                      <a href="#">最新順</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/*<!--// 20221005 수정 : 셀렉트드롭다운 -->*/}
            </div>
          </div>

          <div className="lst_main_comic">
            <ul>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アークシェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                    </span>
                    <p className="t_like">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="h1">シェルター・アーク</p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1 c-gray">96話</p>
                    <div className="lst_tag">
                      <div className="i_tag">#男性におすすめ</div>
                      <div className="i_tag">#異世界</div>
                      <div className="i_tag">#初公開</div>
                      <div className="i_tag">#SF</div>
                      <div className="i_tag">#BL</div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="pagenation">
            <ul>
              <li className="prev">
                <a href="#">
                  <i className="fa-light fa-angle-left"></i>
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li className="on">
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li className="next">
                <a href="#">
                  <i className="fa-light fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isSearchPopupShow && (
        <SearchPopup handleClose={() => setIsSearchPopupShow(false)} />
      )}
    </>
  );
};

const ContBgDiv = styled.div`
  color: #fff;
  background-image: url(${(props) => props.bgImg});
`;

export default Webtoon;
