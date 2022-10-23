import React, { useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/pro-solid-svg-icons";
import Plan from "./Plan";
import SeriesItems from "@COMPONENTS/author/SeriesItems";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import PostItems from "@COMPONENTS/author/PostItems";
import { setAuthorFollow } from "@API/authorService";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import { useEffect } from "react";
import SharePopup from "@COMPONENTS/author/detail/SharePopup";

const Post = () => {
  const params = useParams();
  const id = params?.id;

  const location = useLocation();
  const tab = location?.state?.tab;

  const [author, setAuthor] = useState(null);
  const [selectTab, setSelectTab] = useState(tab ? tab : "POST");
  const [isSharePopupShow, setIsSharePopupShow] = useState(false);
  const backgroundImgURL = useFilePath(author?.backgroundImage);
  const profileImgURL = useFilePath(author?.profileImage);

  const getAuthor = useCallback(async () => {
    const response = await getAuthorAPI(id);
    if (response?.status === 200) {
      setAuthor(response.data.author);
    }
  }, [id]);

  useEffect(() => {
    getAuthor();
  }, []);

  const handleFollow = useCallback(
    async (type) => {
      if (author?.id) {
        const response = await setAuthorFollow(type, author.id);
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
    [author]
  );

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          {/* 이미지 default 값 필요 */}
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={backgroundImgURL}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              {/* 이미지 default 값 필요 */}
              <img src={profileImgURL} alt="profile" />
            </div>
            <p className="h1">{author?.nickname}</p>
            <p className="t1">{author?.description}</p>
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
        </div>

        <div className="inr-c">
          <div className="tabs ty2">
            <ul>
              <li
                className={selectTab === "POST" ? "on" : ""}
                onClick={() => setSelectTab("POST")}
              >
                <Link to="">
                  <span>投稿</span>
                </Link>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => setSelectTab("SERIES")}
              >
                <Link to="">
                  <span>シリーズ</span>
                </Link>
              </li>
              <li
                className={selectTab === "PLAN" ? "on" : ""}
                onClick={() => setSelectTab("PLAN")}
              >
                <Link to="">
                  <span>プラン</span>
                </Link>
              </li>
              <li
                className={selectTab === "POST2" ? "on" : ""}
                onClick={() => setSelectTab("POST2")}
              >
                <Link to="">
                  <span>ストア</span>
                </Link>
              </li>
            </ul>
          </div>
          {selectTab === "POST" && <PostItems item={author} />}
          {selectTab === "SERIES" && <SeriesItems item={author} />}
          {selectTab === "PLAN" && <Plan item={author} />}
        </div>
      </div>

      {isSharePopupShow && (
        <SharePopup onClose={() => setIsSharePopupShow(false)} />
      )}
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Post;
