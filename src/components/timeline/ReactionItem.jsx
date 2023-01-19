import { getReactionDate, showOneButtonPopup } from "@/common/common";
import Image from "@/components/dashboard/Image";
import DeletePopup from "@/containers/post/DeletePopup";
import ReplyControlBox from "@/containers/post/ReplyControlBox";
import {
  getReactionIdFromServer
} from "@API/reactionService";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import IconWithText from "../dashboard/IconWithText";
import ImageBackgroundSpan from "../dashboard/ImageBackgroundSpan";
import ReportPopup from "@/containers/post/ReportPopup";
import LikeButton from "./LikeButton";


export default function ReactionItem(props){
  const { item, postInfo, callback } = props;
  const [stateItem, setStateItem] = useState(item);
  const [stateIsEdit, setStateEdit] = useState(false);
  const [isDeletePopupShow, setIsDeletePopupShow] = useState(false);
  const [isReportPopupShow, setIsReportPopupShow] = useState(false);
  const [isReplyControlShow, setIsReplyControlShow] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const getReaction = async () => {
    const {status, data} = await getReactionIdFromServer(stateItem?.id);
    console.log('getReaction', status, data);
    
    if( status === 200 ){
      setStateItem(data?.reaction);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };


  const handleUpdate = async () => {
    getReaction();
    setStateEdit(false);
  };

  useEffect(() => {
    setStateItem(item);
  }, [item]);
  


  return (
    <>
      <div className={`col ${stateItem?.level > 1 ? "col_re" : ""}`}>
        <div className="imgs">
          <ImageBackgroundSpan hash={stateItem?.profileImage} />
        </div>
        <div className="conts">
          {/* 댓글 내용 */}

          <p className="h1">
            {
              stateItem?.authorId === postInfo?.authorId && (
                <span className="i-writer">作成者</span>
              )
            }
            { stateItem?.account?.name || stateItem?.author?.nickname }
          </p>

          <p className="h1">{stateItem?.name}</p>
          <p className="d1">
            <span>{getReactionDate(stateItem?.createdAt, t)}</span>
            <span>コメント</span>
          </p>
          {
            stateItem?.deleted ? (
              //deleted
              <p className="t1 c-gray">削除されたコメントです。</p>
            ) : (
              stateIsEdit ? ( 
                //edit
                <>
                  <IconWithText 
                    type={'edit'}
                    reactionItem={stateItem}
                    callback={handleUpdate}
                    cancelCallback={() => setStateEdit(false)}
                    />
                </>
              ) : ( 
                // normal
                <>
                  <p className="t1">{stateItem?.content}</p>
                  {
                    stateItem?.iconImage && 
                      <p className="icon_image">
                        <Image hash={stateItem?.iconImage} />
                      </p>
                  }
                </>
              )
            )
          }
          <div className="rgh">
            <LikeButton 
              item={stateItem} 
              callback={() => getReaction()}
              />

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
                  item={stateItem}
                  setIsEdit={setStateEdit}
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
            callback={callback}
            postId={stateItem?.id}
          />
        )}
        {isReportPopupShow && (
          <ReportPopup
            onClose={() => setIsReportPopupShow(false)}
            postId={stateItem?.id}
            content={stateItem?.content}
          />
        )}
      </div>
    </>
  );
};

