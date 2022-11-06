import React, { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleChevronLeft,
  faCircleChevronRight,
  faAngleRight,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

const All = ({ openSearch }) => {
  SwiperCore.use([Navigation, Pagination]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <div className="main_sch">
        <div className="inr-c">
          <div className="lft">
            <Link to="" className="btn-pk n blue bdrs">
              すべて
            </Link>
            <button
              type="button"
              className="btn_sch_input"
              onClick={() => openSearch()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
            </button>

            <Link to="" className="btn-pk n blue2 bdrs">
              異世界
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              SF
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              恋愛
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              アクション
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              日常
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              その他
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="main_area lst_banner long">
        <div className="inr-c">
          <Swiper
            className="swiper-container mySwiper0"
            slidesPerView={3}
            spaceBetween={12}
            centeredSlides={true}
            loop={true}
            observer={true}
            observeParents={true}
            navigation={{
              prevEl: ".swiper-button-prev.my1",
              nextEl: ".swiper-button-next.my1",
            }}
            pagination={{
              el: ".swiper-pagination.my1",
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.3,
                spaceBetween: 16,
              },
              961: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
            }}
            onUpdate={() => {
              nextRef?.current?.classList?.add("slide_st");
              prevRef?.current?.classList?.add("slide_st");
            }}
          >
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={require("@IMAGES/tmp_store1_1.png")} alt="이미지" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={require("@IMAGES/tmp_store1_2.png")} alt="이미지" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={require("@IMAGES/tmp_store1_3.png")} alt="이미지" />
                </Link>
              </SwiperSlide>
            </div>
          </Swiper>

          <div className="swiper-pagination my1"></div>
          <button
            ref={prevRef}
            type="button"
            className="swiper-button-prev my1"
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="swiper-button-next my1"
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1 mb0">⏱️タイムセール</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>
          <div className="lst_store1 mb0 widn">
            <div className="cx">
              <a href="#">
                <div className="cx_per">60%</div>
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>
                        Studio reBornStudio reBornStudio reBornStudio reBorn
                      </span>
                    </div>
                    <p className="c1">
                      <span className="line">2000PC</span>
                      <strong className="b">7200PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_per">60%</div>
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>名前のない</span>
                    </div>
                    <p className="c1">
                      <span className="line">2000PC</span>
                      <strong className="b">7200PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_per">60%</div>
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <span className="line">2000PC</span>
                      <strong className="b">7200PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_per">60%</div>
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <span className="line">2000PC</span>
                      <strong className="b">7200PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1 mb0">PlayToonsのベストアセット</h2>
          </div>
          <div className="lst_store1 widn">
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>
                        Studio reBornStudio reBornStudio reBornStudio reBorn
                      </span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>名前のない</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="cx">
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                <div className="cx_txt">
                  <p className="h1">
                    大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                  </p>
                  <div className="btm">
                    <div className="t_profile">
                      <ImgSpan
                        className="im"
                        bgImg={require("@IMAGES/img_profile.png")}
                      ></ImgSpan>
                      <span>Studio reBornStudio reBorn</span>
                    </div>
                    <p className="c1">
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="botm_plus">
            <a href="#">
              <span className="ico">
                <i className="fa-regular fa-plus"></i>
              </span>
              <span className="t">もっとみる</span>
            </a>
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1 mb0">PlayToonsのベストアセット</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>
          <div className="lst_store1 mb0">
            <div id="mainSlider1" className="swiper-container mySwiper11">
              <div className="swiper-wrapper">
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>
                            Studio reBornStudio reBornStudio reBornStudio reBorn
                          </span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>名前のない</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
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
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1 mb0">異世界アセット</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>
          <div className="lst_store1 mb0">
            <div id="mainSlider2" className="swiper-container mySwiper11">
              <div className="swiper-wrapper">
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>
                            Studio reBornStudio reBornStudio reBornStudio reBorn
                          </span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>名前のない</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cx swiper-slide">
                  <a href="#">
                    <div className="cx_thumb">
                      <span>
                        <img
                          src={require("@IMAGES/tmp_comic1.jpg")}
                          alt="사진"
                        />
                      </span>
                      <p className="t_like">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>1.2k</span>
                      </p>
                    </div>
                    <div className="cx_txt">
                      <p className="h1">
                        大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                      </p>
                      <div className="btm">
                        <div className="t_profile">
                          <ImgSpan
                            className="im"
                            bgImg={require("@IMAGES/img_profile.png")}
                          ></ImgSpan>
                          <span>Studio reBornStudio reBorn</span>
                        </div>
                        <p className="c1">
                          <strong>1000PC</strong>
                        </p>
                      </div>
                    </div>
                  </a>
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
      </div>
    </>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default All;
