import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";

const SideBar = ({ handleChange }) => {
  const menus = useSelector(({ container }) => container.menus);
  const activeMenu = useSelector(({ container }) => container.activeMenu);

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
      {menus &&
        Object.entries(menus).map(([key, value]) => {
          return (
            <div key={key}>
              <h2 className="tit">{key}</h2>
              <nav className="menu">
                <ul>
                  {value.map((item) => {
                    console.log(activeMenu, item.code);
                    return (
                      <li
                        className={`s1 ${activeMenu === item.code ? "on" : ""}`}
                        key={item.code}
                      >
                        <Link
                          to={`${item.link}`}
                          onClick={() =>
                            !item?.link &&
                            alert(`${item?.link} 링크 준비중입니다.`)
                          }
                        >
                          <span className="ico">
                            {(activeMenu === item.code && (
                              <FontAwesomeIcon icon={item.icon.on} />
                            )) || <FontAwesomeIcon icon={item.icon.off} />}
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

export default SideBar;
