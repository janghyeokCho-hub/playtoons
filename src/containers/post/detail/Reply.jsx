import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { useSelector } from "react-redux";
import useFilePath from "@/hook/useFilePath";
import ReportPopup from "../ReportPopup";
import DeletePopup from "../DeletePopup";
import ReplyControlBox from "../ReplyControlBox";

const Reply = ({ item }) => {
  const currentPost = useSelector(({ post }) => post.currentPost);
  // 댓글 수정 시 입력폼으로 변경하기 위한 Flag

  const [isEdit, setIsEdit] = useState(false);
  const [isLikeShow, setIsLikeShow] = useState(false);
  const [isDeletePopupShow, setIsDeletePopupShow] = useState(false);
  const [isReportPopupShow, setIsReportPopupShow] = useState(false);
  const profileImgURL = useFilePath(item?.profileImage);
  // 댓글 제어 모달 Flag
  const [isReplyControlShow, setIsReplyControlShow] = useState(false);

  return (
    <>
      <div className={`col ${item?.level > 1 ? "col_re" : ""}`}>
        <div className="imgs">
          <ImgProfileSpan bgImg={profileImgURL}></ImgProfileSpan>
        </div>
        {(!isEdit && (
          <div className="conts">
            {/* 댓글 내용 */}

            {currentPost?.author?.id === item?.userId && (
              <p className="h1">
                <span className="i-writer">作成者</span>琉桔真緒 ✧◝(⁰▿⁰)◜✧
              </p>
            )}
            <p className="h1">{item?.nickname}</p>
            <p className="d1">
              {/*<span>3日前</span>*/}
              <span>{item?.date}</span>
              <span>コメント</span>
            </p>
            {/* 삭제시 className 에 c-gray 추가 */}
            {item?.isDelete ? (
              <p className="t1 c-gray">削除されたコメントです。</p>
            ) : (
              <p className="t1">
                氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪
                だるまは嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動
                パターン把握したくなります(笑)
              </p>
            )}
            <div className="rgh">
              <button
                type="button"
                className="btn01"
                onClick={() => setIsLikeShow(true)}
              >
                <FontAwesomeIcon icon={faHeart} />
                {item?.likeCount}
              </button>
              {isLikeShow && (
                <div className="box_drop box_favorit">
                  <ul>
                    <li>
                      <button type="button">
                        <span className="i_favorit1">313</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit2">414</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit3">1.2k</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit4">512</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit5">512</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit6">0</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="btn02"
                onClick={() => setIsReplyControlShow(!isReplyControlShow)}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              {isReplyControlShow && (
                <ReplyControlBox
                  item={item}
                  setIsEdit={setIsEdit}
                  setIsDeletePopupShow={setIsDeletePopupShow}
                  setIsReportPopupShow={setIsReportPopupShow}
                  setIsReplyControlShow={setIsReplyControlShow}
                />
              )}
            </div>
          </div>
        )) || (
          <div className="comm">
            {/* 댓글 수정시 입력란 */}
            <textarea
              className="textarea1"
              placeholder="ログインして投稿する"
            ></textarea>
            <div className="btns">
              <div className="l">
                <button type="button" className="btn-pk s blue2">
                  <span>アイコン</span>
                </button>
              </div>
              <div className="r">
                <button
                  type="button"
                  className="btn-pk s tran"
                  onClick={() => setIsEdit(false)}
                >
                  <span>取り消</span>
                </button>
                <button type="button" className="btn-pk s blue">
                  <span>登録する</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeletePopupShow && (
          <DeletePopup onClose={() => setIsDeletePopupShow(false)} />
        )}
        {isReportPopupShow && (
          <ReportPopup onClose={() => setIsReportPopupShow(false)} />
        )}
      </div>
    </>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Reply;
