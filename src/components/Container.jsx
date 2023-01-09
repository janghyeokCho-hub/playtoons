import { MOBILE_WIDTH } from "@/common/constant";
import { useWindowSize } from "@/hook/useWindowSize";
import { setHeaderShow } from "@/modules/redux/ducks/container";
import { setDim } from "@/modules/redux/ducks/dim";
import Header from "@COMPONENTS/Header";
import SideBar from "@COMPONENTS/SideBar";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

const Container = ({ children }) => {
  const isHeaderShow = useSelector(({ container }) => container.isHeaderShow);
  const isMenuShow = useSelector(({ container }) => container.isMenuShow);
  const isFooterShow = useSelector(({ container }) => container.isFooterShow);
  const containerClass = useSelector(({ container }) => container.containerClass);
  const { dimType, isShow } = useSelector(({ dim }) => dim);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isSideMenuShow, setSideMenuShow] = useState(false);
  // const { isSideMenuShow, handleChange } = ();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  //==============================================================================
  // hook
  //==============================================================================
  
  useEffect(() => {
    if (isHeaderShow === undefined) {
      dispatch(setHeaderShow(true));
    }
  }, [dispatch, isHeaderShow]);

  useEffect(() => {
    dispatch(setDim({ dimType: null, isShow: false }));
  }, []);

  useEffect(() => {
  }, [isSideMenuShow]);

  useEffect(() => {
    setIsMobile(windowSize.width <= MOBILE_WIDTH);
    if (windowSize?.width <= MOBILE_WIDTH) {
      setSideMenuShow(false);
    }
  }, [windowSize.width]);
  
  //==============================================================================
  // handler
  //==============================================================================
  const handleDimClose = useCallback(() => {
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);
  
  const handleChange = useCallback(() => {
    setSideMenuShow(!isSideMenuShow);
  }, [isSideMenuShow]);

  //==============================================================================
  // render
  //==============================================================================

  return (
    <>
      <div
        id="wrap"
        className={`${isMobile ? "wrap_tophd" : ""} ${
          isSideMenuShow ? "open" : ""
        }`}
      >
        {isHeaderShow && <Header onSideMenu={() => handleChange()} />}
        {/* type 제거 */}
        <div id="container" className={containerClass}>
          {isMenuShow && (
            <>
              {/*  2022.11.02 lhk- 애니메이션 효과를 위해서 변경 popup_dim은 없어져야하지만 sidebar는 css로 자동 사라짐. */}
              {(isMobile && (
                <>
                  {isSideMenuShow && (
                    <div className="popup_dim" onClick={handleChange}></div>
                  )}
                  <SideBar handleChange={handleChange} />
                </>
              )) || <SideBar handleChange={handleChange} />}

              {/* 원본 */}
              {/* {(isMobile && isSideMenuShow && (
                <div className="popup_dim" onClick={handleChange}>
                  <SideBar handleChange={handleChange} />
                </div>
              )) || <SideBar handleChange={handleChange} />} */}
            </>
          )}

          {children}
        </div>
        {isShow && dimType === "SEARCH" && isMobile && (
          <div className="sch_dim" onClick={handleDimClose}></div>
        )}
        {isFooterShow && <Footer />}
      </div>
    </>
  );
};

export default Container;
