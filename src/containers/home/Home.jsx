import React from "react";
import styled from "styled-components";
import CurationItems from "@COMPONENTS/home/CurationItems";
import BannerItems from "@COMPONENTS/home/BannerItems";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import TypeItems from "@/components/home/TypeItems";
import BestWebtoonItems from "@/components/home/webtoon/BestWebtoonItems";

const Home = (props) => {
  return (
    <div className="contents">
      <div className="lst_banner long">
        <BannerItems curationNum={5} />
      </div>

      <TypeItems />

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">⚡最新</h2>
          </div>
          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">ウェブトゥーン</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">🔥一押しウェブトゥーン</h2>
            <a href="#" className="rgh btn-pk n blue2 view-m">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_adcomic1">
            <BestWebtoonItems />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">📝ウェブ小説</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">📷写真集</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">📝一押しウェブ小説</h2>
            <a href="#" className="rgh btn-pk n blue2 view-m">
              <span className="ico_arr_link">
                すべてみる <i className="fa-solid fa-angle-right"></i>
              </span>
            </a>
          </div>

          <div className="lst_novel1">
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#">
                <div className="thumb">
                  <ImgBgSpan
                    bgImg={require("@IMAGES/tmp_novel_s.jpg")}
                  ></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">戦略的ドリンク注文 </p>
                  <p className="t1">
                    ショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまいショートショート3作目。
                    朝から電車で乃木坂駅まで移動したさくちゃん。
                    マスクと帽子で顔を隠していたつもりが、
                    ほんのわずかな油断で人だかりが出来てしまい
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="main_area mb1">
        <div className="ad_longad1">
          <div className="inr-c">
            <div className="imgs">
              <ImgBgSpan bgImg={require("@IMAGES/longad_img.png")}></ImgBgSpan>
            </div>
            <div className="txt">
              <p className="h1">クリエイターになる</p>
              <p className="t1">自分の作品を世界に届けよう！</p>
              <Link to="/author/register" className="btn-pk bdrs">
                詳しくみる
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">完結ウェブトゥーン</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="hd_titbox">
            <h2 className="m_tit1">連載中のウェブトゥーン</h2>
            <a href="#" className="rgh btn-pk n blue2">
              <span className="ico_arr_link">
                すべてみる
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </a>
          </div>

          <div className="lst_comic1 long">
            <CurationItems curationNum={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Home;
