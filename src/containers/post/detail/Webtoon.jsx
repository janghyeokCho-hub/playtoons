import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import moment from "moment";
import { getCurrentPost, getPostReaction } from "@/modules/redux/ducks/post";
import useFilePath from "@/hook/useFilePath";
import { setAuthorFollow } from "@API/authorService";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { insertReaction } from "@API/reactionService";
import ReplyItems from "./ReplyItems";

const Webtoon = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // 현재 게시물의 아이디
  const id = params?.id;
  // 현재 게시물 상세 정보
  const currentPost = useSelector(({ post }) => post.currentPost);
  const authorProfileImgURL = useFilePath(currentPost?.author?.profileImage);
  const backgroundImgURL = useFilePath(currentPost?.author?.backgroundImage);
  // content 접근 여부로 Lock 판단
  const [isLock, setIsLock] = useState(currentPost?.isLock);
  const [content, setContent] = useState(currentPost?.content);
  const contentURL = useFilePath(content);
  // 로그인 한 사용자
  const userInfo = useSelector(({ login }) => login.userInfo);
  const myProfileImgURL = useFilePath(userInfo?.profileImage);
  // 이전회차 / 다음회차 버튼 Ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // 댓글 이모티콘 창 활성 플래그
  const [isEmoticonShow, setIsEmoticonShow] = useState(false);
  // 이모티콘 선택
  const [selectEmoticon, setSelectEmoticon] = useState(null);
  const [replyLimit, setReplyLimit] = useState(
    currentPost?.reactions?.length || 0
  );

  useEffect(() => {
    dispatch(getCurrentPost({ id: id }));
  }, [dispatch, navigate, id, location.pathname]);

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

  const tempEmoticons = [
    require("@IMAGES/icon0.png"),
    require("@IMAGES/icon1.png"),
    require("@IMAGES/icon2.png"),
    require("@IMAGES/icon3.png"),
    require("@IMAGES/icon4.png"),
    require("@IMAGES/icon5.png"),
    require("@IMAGES/icon6.png"),
    require("@IMAGES/icon7.png"),
    require("@IMAGES/icon8.png"),
    require("@IMAGES/icon9.png"),
    require("@IMAGES/icon10.png"),
  ];

  const handleReply = useCallback(async () => {
    const value = document.getElementById("replyInput").innerText;
    if (!value) {
      alert("댓글 내용 없음");
      return;
    }

    const params = {
      content: value,
      iconImage: selectEmoticon,
      type: "reply",
      postId: id,
      authorId: currentPost.author.id,
    };
    const response = await insertReaction(params);
    if (response?.status === 201) {
      alert("댓글 작성 성공");
      dispatch(getPostReaction({ postId: id, limit: replyLimit }));
      document.getElementById("replyInput").innerText = "";
    } else {
      alert("댓글 작성 실패");
    }
  }, [dispatch, selectEmoticon, id, replyLimit, currentPost]);

  useEffect(() => {
    if (replyLimit > 0) {
      dispatch(getPostReaction({ postId: id, limit: replyLimit }));
    }
  }, [dispatch, id, replyLimit]);

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

            <div className="area_webtoon">
              <img
                src={contentURL || require("@IMAGES/sampleImage.png")}
                alt=""
              />
              {/* 잠금 시작 */}
              {isLock && (
                <div className="area_lock">
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                    <p>500PC /月</p>
                    <p>クリエイターを支援してコンテンツ解禁！</p>
                    <Link
                      to={`/author/post/${currentPost?.author?.id}`}
                      state={{ tab: "PLAN" }}
                      className="btn-pk s blue bdrs"
                    >
                      <span>支援する</span>
                    </Link>
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
                <div className={`textarea1 ${selectEmoticon ? "emo" : ""}`}>
                  {/*<!-- 이모티콘 삽입시 텍스트 박스 길어짐 : emo 추가 -->*/}

                  <textarea
                    className="textarea1"
                    placeholder="ログインして投稿する"
                  ></textarea>

                  {/*<!-- 삽입된 이모티콘 -->*/}
                  {selectEmoticon && (
                    <div className="ico_emo">
                      <span>
                        <img src={selectEmoticon} alt="" />
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectEmoticon(null)}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="btns">
                  <button
                    type="button"
                    className="btn-pk s blue2"
                    onClick={() => setIsEmoticonShow(!isEmoticonShow)}
                  >
                    <span>アイコン</span>
                  </button>
                  <button
                    type="button"
                    className="btn-pk s blue"
                    onClick={() => handleReply()}
                  >
                    <span>登録</span>
                  </button>
                </div>

                {/*<!-- 이모티콘 창 활성화시 -->*/}
                {isEmoticonShow && (
                  <div className="box_emoji" style={{ display: "block" }}>
                    <div className="tit_emo">
                      <Swiper
                        className="swiper-container myEmoji1"
                        slidesPerView="auto"
                        spaceBetween={10}
                        observer={true}
                        observeParents={true}
                        navigation={{
                          nextEl: ".swiper-button-next.myem",
                          prevEl: ".swiper-button-prev.myem",
                        }}
                        onSlideChange={() => {}}
                        onInit={(swiper) => {}}
                        onSwiper={(swiper) => {
                          // console.log('swiper', swiper);
                        }}
                      >
                        <div className="swiper-wrapper">
                          <SwiperSlide className="swiper-slide">
                            <img src={require("@IMAGES/icon0.png")} alt="" />
                          </SwiperSlide>
                        </div>
                      </Swiper>
                      <button type="button" className="swiper-button-prev myem">
                        <FontAwesomeIcon
                          className="fa-regular fa-angle-left"
                          icon={faAngleLeft}
                        />
                      </button>
                      <button type="button" className="swiper-button-next myem">
                        <FontAwesomeIcon
                          className="fa-regular fa-angle-right"
                          icon={faAngleRight}
                        />
                      </button>
                    </div>
                    <div className="cont_emo scrollY">
                      <ul>
                        {tempEmoticons.map((item, index) => (
                          <li
                            key={`emoticon_${index}`}
                            onClick={() => setSelectEmoticon(item)}
                          >
                            <span>
                              <img src={item} alt="" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* 댓글 목록 */}
            <div className="lst_comm">
              <ReplyItems currentPost={currentPost} />
              <div
                className="botm"
                onClick={() => setReplyLimit(replyLimit + 3)}
              >
                <Link to="">コメントをもっと見る</Link>
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
      )}
    </>
  );
};

const InputReply = styled.div`
  &:empty:before {
    content: attr(placeholder);
    color: #909dab !important;
  }
`;

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
