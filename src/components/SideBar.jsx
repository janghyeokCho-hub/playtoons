import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";

const SideBar = ({ handleChange }) => {
  const menus = useSelector(({ container }) => container.menus);
  console.log("menus : ", menus);
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

export default SideBar;
