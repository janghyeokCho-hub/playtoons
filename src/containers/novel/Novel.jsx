import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import SearchPopup from "./SearchPopup";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

const Novel = () => {
  SwiperCore.use([Navigation, Pagination]);

  const navigate = useNavigate();
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [isSelectShow, setIsSelectShow] = useState(false);
  const [selectMenu, setSelectMenu] = useState("おすすめ順");
  const [selectTab, setSelectTab] = useState("すべて");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
  };

  const handleSelectMenu = (menu) => {
    setIsSelectShow(!isSelectShow);
    setSelectMenu(menu);
  };

  const renderItems = (items) => {
    return items.map((item, index) => {
      return (
        <SwiperSlide key={index} className="cx">
          <Link to="/">
            <img src={item.image} alt="이미지" />
          </Link>
        </SwiperSlide>
      );
    });
  };

  const bannerItems = [
    {
      image: require("@IMAGES/tmp_banner.png"),
    },
    {
      image: require("@IMAGES/tmp_banner.png"),
    },
    {
      image: require("@IMAGES/tmp_banner.png"),
    },
  ];

  return (
    <>
      <div className="contents">
        <div className="inr-c">
          <div className="lst_banner long">
            <Swiper
              className="swiper-container mySwiper1"
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={0}
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
              onUpdate={(swiper) => {
                nextRef?.current?.classList?.add("slide_st");
                prevRef?.current?.classList?.add("slide_st");
              }}
            >
              {renderItems(bannerItems)}
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
              <a href="#" className="btn-pk n blue2 bdrs">
                異世界
              </a>
              <a href="#" className="btn-pk n blue2 bdrs">
                SF
              </a>
              <a href="#" className="btn-pk n blue2 bdrs">
                恋愛
              </a>
              <a href="#" className="btn-pk n blue2 bdrs">
                アクション
              </a>
              <a href="#" className="btn-pk n blue2 bdrs">
                日常
              </a>
              <a href="#" className="btn-pk n blue2 bdrs">
                その他
              </a>
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

export default Novel;
