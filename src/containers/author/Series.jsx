import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import ImgComic2 from "@IMAGES/tmp_comic2.jpg";

const Series = () => {
  const navigate = useNavigate();

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={require("@IMAGES/tmp_profile_bg.png")}
          ></ImgTmpProfileBgDiv>
          <div className="pf_txt">
            <div className="icon">
              <img src={require("@IMAGES/img_profile.png")} alt="profile" />
            </div>
            <p className="h1">名前のない人間23349名前のない人間23349</p>
            <p className="t1">
              はみんぐです。アニメーター、イラスト、MV制作🥀🥀
              音楽、ファッション、夜と光の絵。ポートフォリオポートフォリオポートフォリオポートフォリオポートフォリオ
              ポートフォリオポートフォォリオポートフォリオポートフォリオポートフォリオ
              ポートフォリオポートフォォリオポートフォリオポートフォリオポートフォリオ
              ポートフォリオポートフォリオポートフォリオ…
            </p>
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
              <li>
                <a href="#">
                  <span>投稿</span>
                </a>
              </li>
              <li className="on">
                <a href="#">
                  <span>シリーズ</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>プラン</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>ストア</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lst_series">
            <ul>
              <li>
                <a href="#">
                  <div className="thumb">
                    <img src={ImgComic2} alt="만화책" />
                  </div>
                  <div className="txt">
                    <p className="t1">
                      ウェブトゥーンウェブトゥーンウェブトゥーン
                    </p>
                    <p className="h1">
                      阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート阿修羅ゲート
                    </p>
                    <button type="button" className="btn-pk s blue2">
                      <FontAwesomeIcon icon={faObjectUnion} />
                      233
                    </button>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="thumb">
                    <img src={ImgComic2} alt="만화책" />
                  </div>
                  <div className="txt">
                    <p className="t1">ウェブトゥーン</p>
                    <p className="h1">阿修羅ゲート</p>
                    <button type="button" className="btn-pk s blue2">
                      <FontAwesomeIcon icon={faObjectUnion} />
                      233
                    </button>
                  </div>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="thumb">
                    <img src={ImgComic2} alt="만화책" />
                  </div>
                  <div className="txt">
                    <p className="t1">ウェブトゥーン</p>
                    <p className="h1">阿修羅ゲート</p>
                    <button type="button" className="btn-pk s blue2">
                      <FontAwesomeIcon icon={faObjectUnion} />
                      233
                    </button>
                  </div>
                </a>
              </li>
            </ul>
          </div>
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

export default Series;
