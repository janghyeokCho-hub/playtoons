import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import ImgComic1 from "@IMAGES/tmp_comic1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentQuote,
  faShare,
} from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import Plan from "./Plan";

const PostItem = () => {
  return (
    <>
      <div className="lst_detail">
        <ul>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src={ImgComic1} alt="" />
              </div>
              <div className="txt">
                <p className="h1">
                  2話 :
                  シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "7px" }}
                  />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faCommentQuote}
                    style={{ marginRight: "7px" }}
                  />
                  966
                </button>
              </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <div className="thumb">
                <img src={ImgComic1} alt="" />
              </div>
              <div className="txt">
                <p className="h1">3話 : シェルターアーク</p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "7px" }}
                  />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon
                    icon={faCommentQuote}
                    style={{ marginRight: "7px" }}
                  />
                  966
                </button>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li className="on">
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

const Post = () => {
  const location = useLocation();
  const { item } = location.state;

  const [authorData, setAuthorData] = useState(null);
  const [selectTab, setSelectTab] = useState("POST");

  useEffect(() => {
    async function getAuthor() {
      const response = await getAuthorAPI(item.id);
      console.log(response);
      const { status, data } = response;

      if (status === 200) {
        setAuthorData(data.author);
      }
    }

    if (item) {
      getAuthor();
    }
  }, [item]);

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={authorData?.backgroundImage}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              <img src={authorData?.profileImage} alt="profile" />
            </div>
            <p className="h1">{authorData?.nickname}</p>
            <p className="t1">{authorData?.description}</p>
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
                <a>
                  <span>投稿</span>
                </a>
              </li>
              <li
                className={selectTab === "POST1" ? "on" : ""}
                onClick={() => setSelectTab("POST1")}
              >
                <a>
                  <span>シリーズ</span>
                </a>
              </li>
              <li
                className={selectTab === "PLAN" ? "on" : ""}
                onClick={() => setSelectTab("PLAN")}
              >
                <a>
                  <span>プラン</span>
                </a>
              </li>
              <li
                className={selectTab === "POST2" ? "on" : ""}
                onClick={() => setSelectTab("POST2")}
              >
                <a>
                  <span>ストア</span>
                </a>
              </li>
            </ul>
          </div>
          {selectTab === "POST" && <PostItem />}
          {selectTab === "PLAN" && <Plan />}
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
