import PostItems from "@/components/webtoon/PostItems";
import IconWithText from "@/components/dashboard/IconWithText";
import useFilePath from "@/hook/useFilePath";
import { currentAuthorInit } from "@/modules/redux/ducks/author";
import { getCurrentPost, getPostReaction } from "@/modules/redux/ducks/post";
import { setAuthorFollow } from "@API/authorService";
import { faLock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SwiperCore, { Navigation } from "swiper";
import ReplyItems from "./ReplyItems";

const Novel = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // 현재 게시물의 아이디
  const id = params?.id;
  // 현재 게시물 상세 정보
  const currentPost = useSelector(({ post }) => post.currentPost);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const { filePath: authorProfileImgURL, loading: authorProfileImgLoading } = useFilePath(currentPost?.author?.profileImage);
  const { filePath: backgroundImgURL, loading: backgroundImgLoading } =
    useFilePath(currentPost?.author?.backgroundImage);
  // content 접근 여부로 Lock 판단
  const isLock = currentPost?.isLock;
  const content = currentPost?.content;
  const { filePath: contentURL, loading: contentLoading } =
    useFilePath(content);
  // 로그인 한 사용자
  const userInfo = useSelector(({ login }) => login.userInfo);
  const { filePath: myProfileImgURL, loading: myProfileLoading } = useFilePath(
    userInfo?.profileImage || reduxAuthors?.[0].profileImage);
  // 이전회차 / 다음회차 버튼 Ref
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  // 이모티콘 Ref
  const prevEmoticonRef = useRef(null);
  const nextEmoticonRef = useRef(null);
  // 댓글 이모티콘 창 활성 플래그
  const [isEmoticonShow, setIsEmoticonShow] = useState(false);
  // 이모티콘 선택
  const [selectEmoticon, setSelectEmoticon] = useState(null);
  const [replyLimit, setReplyLimit] = useState(
    currentPost?.reactions?.length || 0
  );
  const [replyInput, setReplyInput] = useState("");

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

  useEffect(() => {
    if (replyLimit > 0) {
      dispatch(getPostReaction({ postId: id, limit: replyLimit }));
    }
  }, [dispatch, id, replyLimit]);

  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

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
              {(content && (
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              )) || <img src={require("@IMAGES/sampleImage.png")} alt="" />}

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
                      onClick={handleCurrentAuthorInit}
                    >
                      <span>支援する</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="area_detail3">
              <div className="box_profile">
                {!backgroundImgLoading && (
                  <ImgTmpProfileBgDiv bgImg={backgroundImgURL} />
                )}
                <div className="pf_txt">
                  <div className="icon">
                    {!authorProfileImgLoading && (
                      <img src={authorProfileImgURL} alt="profile" />
                    )}
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
                {!myProfileLoading && (
                  <ImgProfileSpan bgImg={myProfileImgURL}></ImgProfileSpan>
                )}
              </div>
              <IconWithText
                postInfo={currentPost}
                text={{
                  icon: "アイコン",
                  sing_in_to_post: "リアクションする",
                  register: "登録",
                }}
                callback={() => dispatch(getPostReaction({ postId: id, limit: 3 }))}
              />
            </div>
            {/* 댓글 목록 */}
            <div className="lst_comm">
              <ReplyItems />
              
              <div
                className="botm"
                onClick={() => setReplyLimit(replyLimit + 3)}
              >
                <Link to="">コメントをもっと見る</Link>
              </div>
            </div>
          </div>

          <div className="detail_botm_slider">
            <PostItems seriesId={currentPost?.seriesId} />
          </div>
        </>
      )}
    </>
  );
};

const ImgProfileSpan = styled.span`
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
