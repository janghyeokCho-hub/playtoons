import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBarDashboard from "./NavBarDashboard";
import Header from "@/components/Header";
import { useWindowSize } from "@/hook/useWindowSize";
import { setDim } from "@/modules/redux/ducks/dim";

/**
*
  <Container
      type={"series"}
      backTitle={"シリーズ詳細"}
      >
      .....
  </Container>
*
* @version 1.0.0
* @author 2hyunkook
* @param type dashboard, series 등 container div 스타일
* @param backTitle back button text
* @return
*/
export default function Container(props) {
  const dispatch = useDispatch();
  const isLogined = useSelector(({ login }) => login.isLogined);
  const [stateIsOpen, setStateIsOpen] = useState(false);
  const { type, backTitle, children } = props;
  const windowSize = useWindowSize();
  const [stateIsMobile, setStateIsMobile] = useState(false);
  const { dimType, isShow } = useSelector(({ dim }) => dim);

  const getWrapClassName = () => {
    const classList = [];
    if (stateIsOpen) {
      classList.push("open");
    }
    if (isLogined) {
      classList.push("wrap_tophd");
    }
    return classList;
  };

  const getNavClassName = () => {
    return stateIsOpen ? "w100p" : "w0";
  };

  const handleClickMenu = (event) => {
    setStateIsOpen(!stateIsOpen);
  };

  const handleDimClose = useCallback(() => {
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  useEffect(() => {
    setStateIsMobile(windowSize.width < 961);
  }, [windowSize]);

  useEffect(() => {
    if (stateIsMobile && stateIsOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }, [stateIsOpen, stateIsMobile]);

  return stateIsMobile ? (
    <>
      <div id="wrap" className={getWrapClassName().join(" ")}>
        <Header backTitle={backTitle} onSideMenu={() => handleClickMenu()} />
        <div id="container" className={`container ${type}`}>
          <div className="contents">{children}</div>
        </div>

        <div
          className={`popup_dim ${getNavClassName()}`}
          onClick={() => handleClickMenu()}
        >
          <NavBarDashboard className={`transition ${getNavClassName()}`} />
        </div>
        {/* 모바일에서 헤더 검색시 dim */}
        {isShow && dimType === "SEARCH" && (
          <div className="sch_dim" onClick={handleDimClose}></div>
        )}
      </div>
    </>
  ) : (
    <>
      <div id="wrap" className={getWrapClassName()}>
        <Header backTitle={backTitle} onSideMenu={() => handleClickMenu()} />

        <div id="container" className={`container ${type}`}>
          <NavBarDashboard />
          <div className="contents">{children}</div>
        </div>
      </div>
    </>
  );
}
