import React from "react";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSideMenu from "@/hook/useSideMenu";
import { useRef } from "react";

/**
 *
 */
const Container = ({ menus, children }) => {
  const wrapRef = useRef(null);
  const { handleChange } = useSideMenu(wrapRef);

  return (
    <div id="wrap" ref={wrapRef}>
      <Header isMenus={true} onSideMenu={() => handleChange()} />
      <div id="container" className="container dashboard webtoon">
        <aside className="sidebar">
          {Object.entries(menus).map(([key, value]) => {
            return (
              <div key={key}>
                <h2 className="tit">{key}</h2>
                <nav className="menu">
                  <ul>
                    {value.map((item) => {
                      return (
                        <li className=" s1" key={item.code}>
                          <a href="#">
                            <span className="ico">
                              <FontAwesomeIcon icon={item.icon.on} />
                            </span>
                            <span>{item.name}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            );
          })}
        </aside>

        {children}
      </div>
    </div>
  );
};

export default Container;
