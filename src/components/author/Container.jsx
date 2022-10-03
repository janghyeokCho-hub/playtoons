import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer";

/**
 *
 */
const Container = ({ menus, children, type, contentType }) => {
  const location = useLocation();
  const isRegister = location.pathname === "/author/register";
  let className = `container dashboard ${type}`;
  if (isRegister === true) {
    className = `container author_main`;
  }
  return (
    <>
      <Header isMenus={!isRegister} />
      <div id="container" className={className}>
        {isRegister === false && (
          <aside className="sidebar">
            {Object.entries(menus).map(([key, value]) => {
              return (
                <div key={key}>
                  <h2 className="tit">{key}</h2>
                  <nav className="menu">
                    <ul>
                      {value.map((item) => {
                        return (
                          <li className="on s1" key={item.code}>
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
        )}

        {children}
        {isRegister === true && <Footer />}
      </div>
    </>
  );
};

export default Container;
