import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setDim } from "@/modules/redux/ducks/dim";
import { setContainer } from "@/modules/redux/ducks/container";
import CurationItems from "@COMPONENTS/home/CurationItems";
import BannerItems from "./BannerItems";
import { Link } from "react-router-dom";

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
    </div>
  );
};

export default Home;
