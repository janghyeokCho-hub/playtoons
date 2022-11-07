import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import CurationItems from "@COMPONENTS/landingPage/CurationItems";
import AuthorItems from "@COMPONENTS/landingPage/AuthorItems";
import PostTypeItems from "@COMPONENTS/landingPage/PostTypeItems";
import { Link } from "react-router-dom";
import { getEmergencyNotice } from "@/services/noticeService";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setDim } from "@/modules/redux/ducks/dim";
import { setContainer, setFooterShow } from "@/modules/redux/ducks/container";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const [notice, setNotice] = useState(null);
  const [isNoticeShow, setIsNoticeShow] = useState(false);

  const getNotice = useCallback(async () => {
    const response = await getEmergencyNotice();
    if (response?.status === 200) {
      setNotice(response.data?.notice);
      if (response.data?.notice) {
        setIsNoticeShow(true);
      } else {
        setIsNoticeShow(false);
      }
    }
  }, []);

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: false,
      containerClass: "container landing",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: null,
      isDetailView: false,
      isFooterShow: true,
    };
    dispatch(setContainer(container));
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
    getNotice();
  }, []);

  return (
    <>
      {notice && isNoticeShow && (
        <div className="main_notice">
          <p>
            {notice.content} <br className="view-m" />{" "}
            {moment(notice?.startAt || "2022/06/14 07:00").format(
              "YYYY年MM月DD日 HH時mm分"
            )}
          </p>
          <button
            type="button"
            className="btn_del"
            onClick={() => setIsNoticeShow(false)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
      )}
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
              <Link to="/home" className="btn-pk b blue2 bdrs">
                <span>はじめる</span>
              </Link>
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
    </>
  );
};

export default LandingPage;
