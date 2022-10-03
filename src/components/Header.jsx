import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/pro-light-svg-icons";
import { faAngleLeft, faBars, faHeart } from "@fortawesome/pro-solid-svg-icons";
import tempProfile from "@IMAGES/img_profile.png";

const Header = ({
  type,
  className,
  handleLeftMenu,
  backTitle,
  handleBack,
  isMenus = true,
}) => {
  const navigate = useNavigate();
  const isLogined = useSelector(({ login }) => login.isLogined);
  const [renderType, setRenderType] = useState("login");

  useEffect(() => {
    if (type) {
      setRenderType(type);
    } else {
      setRenderType(isLogined ? "login" : "logout");
    }
  }, [type, isLogined]);

  return (
    <header id="header" className={`header ${className}`}>
      {/* logout */}
      {renderType === "logout" && (
        <div className="inr-c">
          <h1 className="logo">
            <Link to="/">
              <span className="ico_logo">PlayToons</span>
            </Link>
          </h1>

          <div className="rgh">
            <div className="box_hd_sch">
              <input
                type="text"
                className="inp_txt"
                placeholder="検索キーワードを入力"
              />
              <button type="button" className="btns">
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </button>
            </div>
            {/* mobile button */}
            <button type="button" className="mo_btns view-m">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <a href="/account" className="btn_tugo btn-pk n blue bdrs">
              ログイン
            </a>
          </div>
        </div>
      )}

      {/* login */}
      {renderType === "login" && (
        <div className="inr-c">
          {/* Left Menus */}
          {isMenus && (
            <button type="button" className="btn_gnb" title="메뉴">
              <span>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </button>
          )}
          <h1 className="logo">
            <Link to="/">
              <span className="ico_logo">PlayToons</span>
            </Link>
          </h1>

          <div className="rgh">
            <div className="box_hd_sch">
              <input
                type="text"
                className="inp_txt"
                placeholder="検索キーワードを入力"
              />
              <button type="button" className="btns">
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </button>
            </div>
            {/* mobile button */}
            <button type="button" className="mo_btns view-m">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <a href="/dashboard/post" className="btn_tugo btn-pk n blue bdrs">
              <span>投稿</span>
            </a>
            <span className="view-m">
              <FontAwesomeIcon icon={faSquarePlus} />
            </span>
            <a href="#" className="btn_profile">
              <span style={{ backgroundImage: `url(${tempProfile})` }}></span>
            </a>
          </div>
        </div>
      )}

      {/* post */}
      {renderType === "post" && (
        <>
          <div className="inr-c view-m">
            <h1 className="logo">
              <Link to="/">
                <span className="ico_logo">PlayToons</span>
              </Link>
            </h1>
            <div className="rgh">
              <div className="box_hd_sch">
                <input
                  type="text"
                  className="inp_txt"
                  placeholder="検索キーワードを入力"
                />
                <button type="button" className="btns">
                  <span>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                </button>
              </div>
              <button type="button" className="mo_btns view-m">
                {" "}
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              {/*<!-- 모바일 검색 버튼 -->*/}
              <a href="#" className="btn_tugo btn-pk n blue bdrs">
                <span>投稿</span>
              </a>
              <a href="#" className="btn_profile">
                <ImgProfileSpan bgImg={require("@IMAGES/img_profile.png")}>
                  마이페이지
                </ImgProfileSpan>
              </a>
            </div>
          </div>
          <div className="inr-c view-m">
            <nav className="gnb">
              <ul>
                <li>
                  <a href="#">ホーム</a>
                </li>
                <li>
                  <a href="#">タイムライン</a>
                </li>
                <li>
                  <a href="#">クリエイター</a>
                </li>
                <li>
                  <a href="#">クリエイター</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="inr-c">
            <button type="button" className="btn_back">
              <span className="icon">
                <FontAwesomeIcon icon={faAngleLeft} />
                投稿する
              </span>
            </button>
            <div className="rgh">
              <button
                type="button"
                className="btn_top_heart"
                onClick={() => console.log("this.classList.toggle('on');")}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* set back button and title  */}
      {backTitle && (
        <div className="head_con">
          <button
            type="button"
            className="btn_back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faAngleLeft} />
              {backTitle}
            </span>
          </button>
        </div>
      )}
    </header>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Header;
