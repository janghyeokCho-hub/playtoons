import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/pro-solid-svg-icons";

const Plan = () => {
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
          <div className="tabs ty2 pr-mb1">
            <ul>
              <li>
                <a href="#">
                  <span>投稿</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>シリーズ</span>
                </a>
              </li>
              <li className="on">
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

          <header className="hd_titbox3">
            <h2 className="h_tit0">
              <span>無限のお菓子バッグについて</span>
            </h2>
            <p className="t1">
              氷室くんの感情の機微を、冬月さんはどのくらい把握出来てるのかなぁ…嬉しい時の雪だるまは
              <br className="hide-m" />
              嬉しそうな雰囲気に見えてるんだろうか…第三者的に見てると、観察して行動パターン把握したくなります(笑)
            </p>
          </header>

          <div className="lst_mainplan">
            <div className="col">
              <div className="icon">
                <img src={require("@IMAGES/img_mainplan1.jpg")} alt="image" />
              </div>
              <div className="cont">
                <h3 className="h1">ダイヤモンドプラン</h3>
                <p className="t1">
                  <span className="c-blue">1,000PC</span> /月
                </p>
                <p className="t2">
                  ひと月だけでも嬉しいです！タイムラプスや未統合
                  その他限定記事が見れます。更新は不定期ですが、
                  なるべく沢山更新できるよう頑張ります。
                </p>
                <div className="t_dot1">
                  <p>・差分が見れます</p>
                  <p>
                    ・ダイヤモンドプランの内容＋psdファイルを公開しています。
                  </p>
                </div>
                <a href="#" className="btn-pk b blue w100p">
                  <span>編集する</span>
                </a>
              </div>
            </div>
            <div className="col">
              <div className="icon">
                <img src={require("@IMAGES/img_mainplan2.jpg")} alt="image" />
              </div>
              <div className="cont">
                <h3 className="h1">プラチナプラン</h3>
                <p className="t1">
                  <span className="c-blue">2,000CP</span> /月
                </p>
                <p className="t2">
                  ひと月だけでも嬉しいです！タイムラプスや未統合
                  その他限定記事が見れます。更新は不定期ですが、
                  なるべく沢山更新できるよう頑張ります。
                </p>
                <div className="t_dot1">
                  <p>・差分が見れます</p>
                  <p>
                    ・ダイヤモンドプランの内容＋psdファイルを公開しています。
                  </p>
                </div>
                <a href="#" className="btn-pk b blue w100p">
                  <span>編集する</span>
                </a>
              </div>
            </div>
            <div className="col">
              <div className="icon">
                <img src={require("@IMAGES/img_mainplan3.jpg")} alt="image" />
              </div>
              <div className="cont">
                <h3 className="h1">VIPプラン</h3>
                <p className="t1">
                  <span className="c-blue">3,000CP</span> /月
                </p>
                <p className="t2">
                  ひと月だけでも嬉しいです！タイムラプスや未統合
                  その他限定記事が見れます。更新は不定期ですが、
                  なるべく沢山更新できるよう頑張ります。
                </p>
                <div className="t_dot1">
                  <p>・差分が見れます</p>
                  <p>
                    ・ダイヤモンドプランの内容＋psdファイルを公開しています。
                  </p>
                </div>
                <a href="#" className="btn-pk b blue w100p">
                  <span>編集する</span>
                </a>
              </div>
            </div>
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

export default Plan;
