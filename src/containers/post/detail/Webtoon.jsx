import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Header from "@COMPONENTS/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-light-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Webtoon = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header className="ty1 mdetail" type="post" />

      <div id="container" className="container sub mpost bg">
        <div className="inr-c">
          <div className="wrap_detail">
            <div className="area_detail2">
              <h2 className="h1">シェルターアーク 2話</h2>
              <p className="d1">2022.06.10</p>
              <p className="t1 c-gray">
                モと戦う為、特殊チームレンジャーを創設したが、クモの圧倒的な力には勝てず。
              </p>
            </div>

            <div className="area_webtoon">
              <img src={require("@IMAGES/tmp_comic3.png")} alt="" />
            </div>

            <div className="area_detail2">
              <p className="t1 c-gray">
                リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。
              </p>
            </div>

            <div className="area_detail3">
              <div className="box_profile">
                <ImgTmpProfileBgDiv
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
                  <div className="btns">
                    <a href="#" className="btn-pk n blue">
                      <span>フォロー</span>
                    </a>
                    <a href="#" className="btn-pk n blue2">
                      <span>支援する</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap_comment">
            <div className="top_comm">
              <div className="imgs">
                <ImgProfileSpan
                  bgImg={require("@IMAGES/img_profile.png")}
                ></ImgProfileSpan>
              </div>
              <div className="conts">
                <textarea
                  name=""
                  id=""
                  className="textarea1"
                  placeholder="ログインして投稿する"
                ></textarea>
                <div className="btns">
                  <button type="button" className="btn-pk s gray">
                    <span>アイコン</span>
                  </button>
                  <button type="button" className="btn-pk s blue">
                    <span>登録</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lst_comm">
              <div className="col">
                <div className="imgs">
                  <ImgProfileSpan
                    bgImg={require("@IMAGES/img_profile.png")}
                  ></ImgProfileSpan>
                </div>
                <div className="conts">
                  <p className="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
                  <p className="d1">
                    <span>3日前</span>
                    <span>コメント</span>
                  </p>
                  <p className="t1">
                    氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
                    だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
                    パターン把握したくなります(笑)
                  </p>
                  <div className="rgh">
                    <button type="button" className="btn01">
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ marginRight: "8px" }}
                      />
                      123
                    </button>
                    <button type="button" className="btn02">
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        style={{ marginRight: "8px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="imgs">
                  <ImgProfileSpan
                    bgImg={require("@IMAGES/img_profile.png")}
                  ></ImgProfileSpan>
                </div>
                <div className="conts">
                  <p className="h1">琉桔真緒 ✧◝(⁰▿⁰)◜✧</p>
                  <p className="d1">
                    <span>3日前</span>
                    <span>コメント</span>
                  </p>
                  <p className="t1">
                    氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
                    だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
                    パターン把握したくなります(笑)
                  </p>
                  <div className="rgh">
                    <button type="button" className="btn01">
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ marginRight: "8px" }}
                      />
                      123
                    </button>
                    <button type="button" className="btn02">
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        style={{ marginRight: "8px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="botm">
                <a href="#">コメントをもっと見る</a>
              </div>
            </div>
          </div>

          <div className="detail_botm_slider">
            <div className="slider">
              <div className="swiper-container mySwiper1">
                <Swiper className="swiper-wrapper">
                  <BoxVslideDiv className="box_vslide swiper-slide">
                    <a href="#">
                      <ImgComicDiv
                        className="thumb"
                        bgImg={require("@IMAGES/tmp_comic3.png")}
                      ></ImgComicDiv>
                      <div className="txt">
                        <p className="h1">シェルターアーク</p>
                        <p className="t1">1話</p>
                        <p className="t2">
                          小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                        </p>
                      </div>
                    </a>
                  </BoxVslideDiv>
                  <BoxVslideDiv className="box_vslide swiper-slide">
                    <a href="#">
                      <ImgComicDiv
                        className="thumb"
                        bgImg={require("@IMAGES/tmp_comic3.png")}
                      ></ImgComicDiv>
                      <div className="txt">
                        <p className="h1">シェルターアーク</p>
                        <p className="t1">1話</p>
                        <p className="t2">
                          小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                        </p>
                      </div>
                    </a>
                  </BoxVslideDiv>
                  <BoxVslideDiv className="box_vslide swiper-slide">
                    <a href="#">
                      <ImgComicDiv
                        className="thumb"
                        bgImg={require("@IMAGES/tmp_comic3.png")}
                      ></ImgComicDiv>
                      <div className="txt">
                        <p className="h1">シェルターアーク</p>
                        <p className="t1">1話</p>
                        <p className="t2">
                          小ページで気軽に漫画描きたくて、描いたやつFANBOXにアップする名目で
                        </p>
                      </div>
                    </a>
                  </BoxVslideDiv>
                </Swiper>
              </div>
              <button type="button" className="swiper-button-prev my1">
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <button type="button" className="swiper-button-next my1">
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

const ImgComicDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const BoxVslideDiv = styled.div`
  width: 316.5px;
  margin-right: 27px;
`;

export default Webtoon;
