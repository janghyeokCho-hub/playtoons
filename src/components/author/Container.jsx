import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import useSideMenu from "@/hook/useSideMenu";
import { useWindowSize } from "@/hook/useWindowSize";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const SideBar = ({ menus, handleChange }) => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
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
                    <li
                      className={`s1 ${item?.link === pathname ? "on" : ""}`}
                      key={item.code}
                    >
                      {(item?.link !== "" && (
                        <Link
                          to={item?.link}
                          onClick={() =>
                            !item?.link && alert(`${item?.link} 준비중입니다.1`)
                          }
                        >
                          <span className="ico">
                            <FontAwesomeIcon icon={item.icon.on} />
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      )) || (
                        <Link
                          to="#"
                          onClick={() =>
                            !item?.link && alert(`${item?.link} 준비중입니다.`)
                          }
                        >
                          <span className="ico">
                            <FontAwesomeIcon icon={item.icon.on} />
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      )}
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
const Container = ({ menus, children, type, activeMenu }) => {
  //wrap_tophd
  const isLogined = useSelector(({ login }) => login.isLogined);
  const { isSideMenuShow, handleChange } = useSideMenu();
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const isRegister = location.pathname === "/author/register";
  let className = `container dashboard ${type}`;
  if (isRegister === true) {
    className = `container author_main`;
  }

  useEffect(() => {
    setIsMobile(windowSize.width < 961);
  }, [windowSize]);

  return (
    <div
      id="wrap"
      className={`${isLogined ? "wrap_tophd" : ""} ${
        isSideMenuShow ? "open" : ""
      }`}
    >
      <Header
        // type="post"          //author는 header type이 없어도 되도록 변경
        isMenus={!isRegister}
        onSideMenu={() => handleChange()}
      />
      <div id="container" className={className}>
        {!isRegister && (
          <>
            {(isSideMenuShow && isMobile && (
              <div className="popup_dim" onClick={() => handleChange()}>
                <SideBar menus={menus} handleChange={handleChange} />
              </div>
            )) || <SideBar menus={menus} handleChange={handleChange} />}
          </>
        )}

        {children}
        {isRegister === true && <Footer />}
      </div>
    </div>
  );
};

export default Container;
