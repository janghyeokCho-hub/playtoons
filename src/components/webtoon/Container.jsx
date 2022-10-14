import React from "react";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *
 */
const Container = ({ menus, children, type, contentType }) => {
  const className = `container dashboard webtoon`;
  return (
    <>
      <Header />
      <div id="container" className={className}>
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
    </>
  );
};

export default Container;
