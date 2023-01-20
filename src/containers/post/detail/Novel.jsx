import IconWithText from "@/components/dashboard/IconWithText";
import Image from "@/components/dashboard/Image";
import ImageBackground from "@/components/dashboard/ImageBackground";
import SeeMoreComent from "@/components/dashboard/SeeMoreComent";
import PostItems from "@/components/webtoon/PostItems";
import useFilePath from "@/hook/useFilePath";
import { currentAuthorInit } from "@/modules/redux/ducks/author";
import { getCurrentPost, getPostReaction } from "@/modules/redux/ducks/post";
import { setAuthorFollow } from "@API/authorService";
import { faLock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sanitize } from "dompurify";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [ stateIsAddComent, setStateIsAddComent ] = useState(false);
  // content 접근 여부로 Lock 판단
  const isLock = currentPost?.isLock;
  const content = currentPost?.content;
  // 로그인 한 사용자
  const userInfo = useSelector(({ login }) => login.userInfo);

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


  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

  const getComent = (page, isAdd) => {
    setStateIsAddComent(isAdd);
    dispatch(getPostReaction({ postId: id, limit: 3, page: page }))
  };

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
                // <div className="editor_p ws_pre">
                //   {getHtmlElementFromHtmlString(content)}
                // </div>
                <div className="editor_p ws_pre" dangerouslySetInnerHTML={{ __html : sanitize(content) }} />
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
                      to={`/author/${currentPost?.author?.id}/plan/1`}
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
                <ImageBackground 
                  className={"bg"}
                  type={"div"}
                  hash={currentPost?.author?.backgroundImage}
                  />
                <div className="pf_txt">
                  <div className="icon">
                    <Image hash={currentPost?.author?.backgroundImage}  />
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
                    <Link to={`/author/${currentPost?.author?.id}/plan/1`} className="btn-pk n blue2">
                      <span>支援する</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap_comment">
            <div className="top_comm">
              <div className="imgs">
                <ImageBackground 
                  hash={userInfo?.profileImage || reduxAuthors?.[0].profileImage}
                  />
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
              <ReplyItems isAdd={stateIsAddComent} />
              
              <SeeMoreComent 
                text={{see_more_coment: 'コメントをもっと見る'}}
                meta={currentPost?.reactions?.meta}
                callback={(page) => getComent(page, true)}
                />
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

export default Novel;
