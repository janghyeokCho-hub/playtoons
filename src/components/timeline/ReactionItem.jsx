import { getReactionDate } from "@/common/common";
import Image from "@/components/dashboard/Image";
import DeletePopup from "@/containers/post/DeletePopup";
import ReplyControlBox from "@/containers/post/ReplyControlBox";
import post from "@/modules/redux/ducks/dashboard";
import {
  deleteLikeReaction, insertLikeReaction
} from "@API/reactionService";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ProfileSpan from "../dashboard/ProfileSpan";
import ReportPopup from "../dashboard/ReportPopup";
import LikeButton from "./LikeButton";


export default function ReactionItem(props){
  const { item, postInfo } = props;
  const [isLikeShow, setIsLikeShow] = useState(false);
  const [isDeletePopupShow, setIsDeletePopupShow] = useState(false);
  const [isReportPopupShow, setIsReportPopupShow] = useState(false);
  const [isReplyControlShow, setIsReplyControlShow] = useState(false);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const { t } = useTranslation();


  const handleLike = useCallback(async () => {
    const reactionId = 0;
    if (isLikeShow) {
      const response = await deleteLikeReaction(reactionId);
      if (response?.status === 200) {
        alert("좋아요 성공");
        setIsLikeShow(true);
      } else {
        alert("좋아요 실패");
        setIsLikeShow(false);
      }
    } else {
      const response = await insertLikeReaction(reactionId);
      if (response?.status === 200) {
        alert("좋아요 삭제 성공");
        setIsLikeShow(false);
      } else {
        alert("좋아요 삭제 실패");
        setIsLikeShow(true);
      }
    }
  }, [isLikeShow]);

  return (
    <>
      <div className={`col ${item?.level > 1 ? "col_re" : ""}`}>
        <div className="imgs">
          <ProfileSpan hash={item?.profileImage} />
        </div>
        <div className="conts">
          {/* 댓글 내용 */}

          <p className="h1">
            {
              item?.authorId === postInfo?.authorId && (
                <span className="i-writer">作成者</span>
              )
            }
            {item?.account?.name || item?.author?.nickname}
          </p>

          <p className="h1">{item?.name}</p>
          <p className="d1">
            <span>{getReactionDate(item?.createdAt, t)}</span>
            <span>コメント</span>
          </p>
          {
            item?.deleted ? (
              <p className="t1 c-gray">削除されたコメントです。</p>
            ) : (
              <>
                <p className="t1">{item?.content}</p>
                {item?.iconImage && (
                  <p className="icon_image">
                    <Image hash={item?.iconImage} />
                  </p>
                )}
              </>
            )
          }
          <div className="rgh">
            <LikeButton item={item} />

            <button
              type="button"
              className="btn02"
              onClick={() => setIsReplyControlShow(!isReplyControlShow)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            {
              isReplyControlShow && (
                <ReplyControlBox
                  item={item}
                  setIsDeletePopupShow={setIsDeletePopupShow}
                  setIsReportPopupShow={setIsReportPopupShow}
                  setIsReplyControlShow={setIsReplyControlShow}
                />
              )
            }
          </div>
        </div>
        {isDeletePopupShow && (
          <DeletePopup
            onClose={() => setIsDeletePopupShow(false)}
            postId={item?.id}
          />
        )}
        {isReportPopupShow && (
          <ReportPopup
            onClose={() => setIsReportPopupShow(false)}
            postId={item?.id}
            content={item?.content}
          />
        )}
      </div>
    </>
  );
};

