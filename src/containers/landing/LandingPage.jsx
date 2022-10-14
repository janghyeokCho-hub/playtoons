import React from "react";
import Header from "@/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import Footer from "@COMPONENTS/Footer";
import CurationItems from "@COMPONENTS/landingPage/CurationItems";
import AuthorItems from "@COMPONENTS/landingPage/AuthorItems";
import PostTypeItems from "@COMPONENTS/landingPage/PostTypeItems";

const LandingPage = () => {
  return (
    <>
      <Header isMenus={false} />
      <div id="container" className="container landing">
        <div className="main_notice">
          <p>
            クレジットカードのメンテナンスお知らせ <br className="view-m" />
            2022年6月14日 07時00分
          </p>
          <button type="button" className="btn_del">
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>

        <div className="main_visual">
          <div className="inr-c">
            <div className="thumb">
              <span>
                <img src={require("@IMAGES/main_visual_img.png")} alt="사진" />
              </span>
              <p className="copy">&copy;Studio reBorn</p>
            </div>
            {/*<!-- 202210 수정 -->*/}
            <div className="txt ta-c">
              <p className="h1">あなたの好きなことが見つかる。</p>
              <p className="t1">
                PlayToons「プレイトゥーンズ」は、
                <br />
                クリエイターと支援者を繋ぐコミュニティです。
                <br />
                イラスト、ウェブトゥーン、小説など、
                <br />
                数えきれない作品をご覧にいただけます。
              </p>
              <div className="btn-bot">
                <a href="#" className="btn-pk b blue2 bdrs">
                  <span>はじめる</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🔥人気</h2>
            <div className="lst_comic1 long">
              <CurationItems curationNum={1} />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">⚡最新</h2>
            <div className="lst_comic1 long">
              <CurationItems curationNum={2} />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🎨クリエーター</h2>

            <div className="slider_profile">
              <AuthorItems />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">カテゴリー</h2>

            <div className="lst_card">
              <PostTypeItems />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">🌈おすすめウェブトゥーン</h2>
            <div className="lst_comic1 long">
              <CurationItems curationNum={4} />
            </div>
          </div>
        </div>

        <div className="main_area">
          <div className="inr-c">
            <h2 className="m_tit1">📝おすすめウェブ小説</h2>
            <div className="lst_comic1 long">
              <CurationItems curationNum={5} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
