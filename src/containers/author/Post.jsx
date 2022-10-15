import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/pro-solid-svg-icons";
import Plan from "./Plan";
import SeriesItems from "@COMPONENTS/author/SeriesItems";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import PostItems from "@COMPONENTS/author/PostItems";

const Post = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const backgroundImgURL = useFilePath(currentAuthor?.backgroundImage);
  const profileImgURL = useFilePath(currentAuthor?.profileImage);

  const [selectTab, setSelectTab] = useState("POST");

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
            <p className="h1">{currentAuthor?.nickname}</p>
            <p className="t1">{currentAuthor?.description}</p>
            <div className="btns">
              <a href="#" className="btn-pk n blue">
                フォロー
              </a>
              <a href="#" className="btn-pk n blue2">
                <FontAwesomeIcon icon={faShare} />
                共有する
              </a>
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
          {selectTab === "POST" && <PostItems item={currentAuthor} />}
          {selectTab === "SERIES" && <SeriesItems item={currentAuthor} />}
          {selectTab === "PLAN" && <Plan item={currentAuthor} />}
        </div>
      </div>
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
