import { showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import ImageBackgroundDiv from "@/components/dashboard/ImageBackgroundDiv";
import { setCurrentAuthor } from "@/modules/redux/ducks/author";
import { setAuthorFollow } from "@API/authorService";
import SharePopup from "@COMPONENTS/author/detail/SharePopup";
import PostItems from "@COMPONENTS/author/PostItems";
import SeriesItems from "@COMPONENTS/author/SeriesItems";
import StoreItems from "@COMPONENTS/author/StoreItems";
import { faShare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Plan from "./Plan";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  const tab = params?.tab;
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const [selectTab, setSelectTab] = useState(tab ? tab : "post");
  const [isSharePopupShow, setIsSharePopupShow] = useState(false);

  useEffect(() => {
    dispatch(setCurrentAuthor(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('tab', tab);
    setSelectTab(tab);
  }, [tab]);

  const handleFollow = useCallback(
    async (type) => {
      if (currentAuthor?.id) {
        const response = await setAuthorFollow(type, currentAuthor.id);
        if (type === "post") {
          if (response?.status === 201) {
            showOneButtonPopup(dispatch, 'フォローしました。');
          } else {
            showOneButtonPopup(dispatch, response?.data?.message);
          }
        } else {
          if (response?.status === 200) {
            showOneButtonPopup(dispatch, 'アンフォローしました。');
          } else {
            showOneButtonPopup(dispatch, response?.data?.message);
          }
        }
      }
    },
    [currentAuthor]
  );

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          {/* 이미지 default 값 필요 */}
          <ImageBackgroundDiv
            className="pf_thumb"
            hash={currentAuthor?.backgroundImage}/>
          {currentAuthor && (
            <div className="pf_txt">
              <div className="icon">
                {/* 이미지 default 값 필요 */}
                <Image hash={currentAuthor?.profileImage} />
              </div>
              <p className="h1">{currentAuthor?.nickname}</p>
              <p className="t1">{currentAuthor?.description}</p>
              <div className="btns">
                <Link
                  to=""
                  className="btn-pk n blue"
                  onClick={() => handleFollow("delete")}
                >
                  임시언팔
                </Link>
                <Link
                  to=""
                  className="btn-pk n blue"
                  onClick={() => handleFollow("post")}
                >
                  フォロー
                </Link>
                <Link
                  to=""
                  className="btn-pk n blue2"
                  onClick={() => setIsSharePopupShow(true)}
                >
                  <FontAwesomeIcon icon={faShare} />
                  共有する
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="inr-c">
          <div className="tabs ty2">
            <ul>
              <li
                className={selectTab === "post" ? "on" : ""}
                onClick={() => navigate(`/author/${id}/post/1`)}
              >
                <Link to="">
                  <span>投稿</span>
                </Link>
              </li>
              <li
                className={selectTab === "series" ? "on" : ""}
                onClick={() => navigate(`/author/${id}/series/1`)}
              >
                <Link to="">
                  <span>シリーズ</span>
                </Link>
              </li>
              <li
                className={selectTab === "plan" ? "on" : ""}
                onClick={() => navigate(`/author/${id}/plan/1`)}
              >
                <Link to="">
                  <span>プラン</span>
                </Link>
              </li>
              <li
                className={selectTab === "store" ? "on" : ""}
                onClick={() => navigate(`/author/${id}/store/1`)}
              >
                <Link to="">
                  <span>ストア</span>
                </Link>
              </li>
            </ul>
          </div>
          {selectTab === "post" && <PostItems />}
          {selectTab === "series" && <SeriesItems />}
          {selectTab === "plan" && <Plan />}
          {selectTab === "store" && <StoreItems />}
        </div>
      </div>

      {isSharePopupShow && (
        <SharePopup onClose={() => setIsSharePopupShow(false)} />
      )}
    </div>
  );
};


export default Post;
