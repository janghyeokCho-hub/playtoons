import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDim } from "@/modules/redux/ducks/dim";
import { setContainer } from "@/modules/redux/ducks/container";
import CurationItems from "@COMPONENTS/home/CurationItems";
import BannerItems from "@COMPONENTS/home/BannerItems";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import BestWebtoonItems from "@/components/home/webtoon/BestWebtoonItems";

const Home = (props) => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: true,
      containerClass: "container dashboard landing log_landing",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: "search",
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  return (
    <div className="contents">
      <div className="lst_banner long">
        <BannerItems curationNum={5} />
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="lst_card2">
            <div className="col">
              <Link to="">
                <div className="thumb wid1">
                  <img
                    src={require("@IMAGES/img_landing_main1_log.png")}
                    alt=""
                  />
                </div>
                <div className="txt" style={{ backgroundColor: "#fff" }}>
                  <p className="c-black">ウェブトゥーン</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link to="">
                <div className="thumb wid2">
                  <img
                    src={require("@IMAGES/img_landing_main2_log.png")}
                    alt=""
                  />
                </div>
                <div className="txt" style={{ backgroundColor: "#13161A" }}>
                  <p>ウェブ小説</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link to="">
                <div className="thumb wid3">
                  <img
                    src={require("@IMAGES/img_landing_main3_log.png")}
                    alt=""
                  />
                </div>
                <div className="txt" style={{ backgroundColor: "#424F58" }}>
                  <p>텍스트확인</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link to="">
                <div className="thumb wid4">
                  <img
                    src={require("@IMAGES/img_landing_main4_log.png")}
                    alt=""
                  />
                </div>
                <div className="txt" style={{ backgroundColor: "#596470" }}>
                  <p>텍스트확인</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
              <a href="#" className="btn-pk bdrs">
                詳しくみる
              </a>
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
