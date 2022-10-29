import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import useSideMenu from "@/hook/useSideMenu";
import { useWindowSize } from "@/hook/useWindowSize";
import Header from "../Header";
import { setDim } from "@/modules/redux/ducks/dim";

const SideBar = ({ menus, handleChange }) => {
  return (
    <aside className="sidebar">
      <div className="top view-m">
        <button
          type="button"
          className="btn_gnb"
          title="메뉴"
          onClick={() => handleChange()}
        >
          <span>
            <FontAwesomeIcon icon={faBars} />
          </span>
        </button>
        <h1 className="logo">
          <Link to="/">
            <span className="ico_logo">PlayToons</span>
          </Link>
        </h1>
      </div>
      {Object.entries(menus).map(([key, value]) => {
        return (
          <div key={key}>
            <h2 className="tit">{key}</h2>
            <nav className="menu">
              <ul>
                {value.map((item) => {
                  return (
                    <li className="s1" key={item.code}>
                      <Link
                        to={`${item.link}`}
                        onClick={() =>
                          !item?.link &&
                          alert(`${item?.link} 링크 준비중입니다.`)
                        }
                      >
                        <span className="ico">
                          <FontAwesomeIcon icon={item.icon.on} />
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        );
      })}
    </aside>
  );
};

const Container = ({ menus, children }) => {
  const dispatch = useDispatch();
  const { dimType, isShow } = useSelector(({ dim }) => dim);
  const { isSideMenuShow, handleChange } = useSideMenu();
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(setDim({ dimType: null, isShow: false }));
  }, []);

  useEffect(() => {
    setIsMobile(windowSize.width < 961);
  }, [windowSize]);

  const handleDimClose = useCallback(() => {
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  return (
    <div id="wrap" className="wrap_tophd">
      <Header isMenus={true} onSideMenu={() => handleChange()} />{" "}
      {/* type 제거 */}
      <div id="container" className="container dashboard webtoon">
        {(isSideMenuShow && isMobile && (
          <div className="popup_dim" onClick={handleChange}>
            <SideBar menus={menus} handleChange={handleChange} />
          </div>
        )) || <SideBar menus={menus} handleChange={handleChange} />}

        {children}
      </div>
      {isShow && dimType === "SEARCH" && (
        <div className="sch_dim" onClick={handleDimClose}></div>
      )}
    </div>
  );
};

export default Container;
