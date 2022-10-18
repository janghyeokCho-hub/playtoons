import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import Comment from "./Comment";
import { getPostDetailAction } from "@/modules/redux/ducks/post";
import useFilePath from "@/hook/useFilePath";

const Webtoon = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const userInfo = useSelector(({ login }) => login.userInfo);

  const post = useSelector(({ post }) => post?.post);

  const [isLock, setIsLock] = useState(false);
  const authorProfileImgURL = useFilePath(post?.author?.profileImage);
  const myProfileImgURL = useFilePath(userInfo?.profileImage);
  const backgroundImgURL = useFilePath(post?.author?.backgroundImage);
  const thumbnailImgURL = useFilePath(post?.thumbnailImage);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    dispatch(getPostDetailAction({ id: id }));
  }, [dispatch, id]);

  const tempComment = [
    {
      profileImage: null,
      author: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      date: "3日前",
      comment: `
      氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
      だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
      パターン把握したくなります(笑)`,
      likeCount: 123,
    },
    {
      profileImage: null,
      author: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      date: "3日前",
      comment: `
      氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
      だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
      パターン把握したくなります(笑)`,
      likeCount: 123,
    },
    {
      profileImage: null,
      author: "琉桔真緒 ✧◝(⁰▿⁰)◜✧",
      date: "3日前",
      comment: `
      氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
      だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
      パターン把握したくなります(笑)`,
      likeCount: 123,
    },
  ];

  if (post) {
    return (
      <>
        <div className="wrap_detail">
          <div className="area_detail2">
            <h2 className="h1">{post.title}</h2>
            <p className="d1">
              {moment(post.startAt).format("YYYY/MM/DD HH:mm")}
            </p>
            <p className="t1 c-gray">{post.outline}</p>
          </div>

          <div className="area_webtoon">
            <img src={thumbnailImgURL} alt="" />
            {/* 잠금 시작 */}
            {isLock && (
              <div class="area_lock">
                <div>
                  <p>
                    <FontAwesomeIcon icon={faLock} />
                  </p>
                  <p>500PC /月</p>
                  <p>クリエイターを支援してコンテンツ解禁！</p>
                  <a href="#" class="btn-pk s blue bdrs">
                    <span>支援する</span>
                  </a>
                </div>
              </div>
            )}
            {/* 잠금 끝 */}
          </div>

          <div className="area_detail2">
            <p className="t1 c-gray">
              リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。
            </p>
          </div>

          <div className="area_detail3">
            <div className="box_profile">
              <ImgTmpProfileBgDiv bgImg={backgroundImgURL} />
              <div className="pf_txt">
                <div className="icon">
                  <img src={authorProfileImgURL} alt="profile" />
                </div>
                <p className="h1">{post?.author?.name}</p>
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
              <ImgProfileSpan bgImg={myProfileImgURL}></ImgProfileSpan>
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
            {tempComment &&
              tempComment.map((comment, index) => (
                <Comment key={`comment_${index}`} item={comment} />
              ))}

            <div className="botm">
              <a href="#">コメントをもっと見る</a>
            </div>
          </div>
        </div>

        <div className="detail_botm_slider">
          <div className="slider">
            <Swiper
              className="swiper-container mySwiper1"
              slidesPerView={2}
              spaceBetween={10}
              observer={true}
              observeParents={true}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              onUpdate={() => {
                nextRef?.current?.classList?.add("slide_st");
                prevRef?.current?.classList?.add("slide_st");
              }}
            >
              <SwiperSlide
                className="box_vslide swiper-slide"
                style={{
                  width: "316.5px",
                  marginRight: "27px",
                }}
              >
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
              </SwiperSlide>
              <SwiperSlide
                className="box_vslide swiper-slide"
                style={{
                  width: "316.5px",
                  marginRight: "27px",
                }}
              >
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
              </SwiperSlide>
              <SwiperSlide
                className="box_vslide swiper-slide"
                style={{
                  width: "316.5px",
                  marginRight: "27px",
                }}
              >
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
              </SwiperSlide>
            </Swiper>
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
      </>
    );
  } else {
    return <></>;
  }
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

export default Webtoon;
