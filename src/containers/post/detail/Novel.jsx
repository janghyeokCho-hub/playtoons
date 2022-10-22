import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
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
import { getCurrentPost } from "@/modules/redux/ducks/post";
import useFilePath from "@/hook/useFilePath";
import { getPostContent as getPostContentAPI } from "@API/postService";
import { setAuthorFollow } from "@API/authorService";

const Novel = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // 현재 게시물의 아이디
  const id = params?.id;
  // content 접근 여부로 Lock 판단
  const [isLock, setIsLock] = useState(true);
  const [content, setContent] = useState(null);
  const contentURL = useFilePath(content);
  // 현재 게시물 상세 정보
  const currentPost = useSelector(({ post }) => post.currentPost);
  const authorProfileImgURL = useFilePath(currentPost?.author?.profileImage);
  const backgroundImgURL = useFilePath(currentPost?.author?.backgroundImage);
  // 로그인 한 사용자
  const isLogined = useSelector(({ login }) => login.isLogined);
  const userInfo = useSelector(({ login }) => login.userInfo);
  const myProfileImgURL = useFilePath(userInfo?.profileImage);
  // 이전회차 / 다음회차 버튼 Ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const getPostContent = useCallback(async () => {
    const response = await getPostContentAPI(id);
    if (response.status === 200) {
      setIsLock(false);
      setContent(response.data?.content);
    } else {
      setIsLock(true);
      setContent(null);
    }
  }, [id]);

  useEffect(() => {
    if (isLogined) {
      dispatch(getCurrentPost({ id: id }));
      getPostContent();
    } else {
      navigate("/account", { state: { next: location?.pathname } });
    }
  }, [dispatch, id, isLogined, location, navigate]);

  const handleFollow = useCallback(
    async (type) => {
      if (currentPost?.author?.id) {
        const response = await setAuthorFollow(type, currentPost.author.id);
        if (type === "post") {
          if (response?.status === 201) {
            alert("SUCCESS");
          } else {
            alert(response?.data?.message);
          }
        } else {
          if (response?.status === 200) {
            alert("DELETE SUCCESS");
          } else {
            alert(response?.data?.message);
          }
        }
      }
    },
    [currentPost]
  );

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

  return (
    <>
      {currentPost && (
        <>
          <div className="wrap_detail">
            <div className="area_detail2">
              <h2 className="h1">{currentPost.title}</h2>
              <p className="d1">
                {moment(currentPost.startAt).format("YYYY/MM/DD HH:mm")}
              </p>
              <p className="t1 c-gray">{currentPost.outline}</p>
            </div>

            <div className="area_novel">
              <img
                src={contentURL || require("@IMAGES/sampleImage.png")}
                alt=""
              />
              {isLock && (
                <div className="area_lock">
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                    <p>500PC /月</p>
                    <p>クリエイターを支援してコンテンツ解禁！</p>
                    <a href="#" className="btn-pk s blue bdrs">
                      <span>支援する</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="area_detail3">
              <div className="box_profile">
                <ImgTmpProfileBgDiv bgImg={backgroundImgURL} />
                <div className="pf_txt">
                  <div className="icon">
                    <img src={authorProfileImgURL} alt="profile" />
                  </div>
                  <p className="h1">{currentPost?.author?.nickname}</p>
                  <div className="btns">
                    <Link
                      to=""
                      className="btn-pk n blue"
                      onClick={() => handleFollow("delete")}
                    >
                      <span>임시언팔</span>
                    </Link>
                    <Link
                      to=""
                      className="btn-pk n blue"
                      onClick={() => handleFollow("post")}
                    >
                      <span>フォロー</span>
                    </Link>
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
              <div className="swiper-container mySwiper1">
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
              </div>
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
      )}
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

export default Novel;
