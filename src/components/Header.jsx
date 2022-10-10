import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSquarePlus,
} from "@fortawesome/pro-light-svg-icons";
import { faAngleLeft, faBars, faHeart } from "@fortawesome/pro-solid-svg-icons";
import tempProfile from "@IMAGES/img_profile.png";
import { getUserInfo as getUserInfoAPI } from "@API/loginService";
import { setUserInfo } from "@/modules/redux/ducks/login";

const Header = ({
  type,
  className,
  handleLeftMenu,
  backTitle,
  handleBack,
  isMenus = true,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(({ login }) => login.userInfo);
  const accessToken = useSelector(({ login }) => login.accessToken);
  const isLogined = useSelector(({ login }) => login.isLogined);
  const [renderType, setRenderType] = useState("login");
  const [like, setLike] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const response = await getUserInfoAPI(accessToken);
      if (response.status === 200) {
        dispatch(setUserInfo(response.data));
      }
    }

    if (accessToken && !userInfo) {
      getUserInfo();
    }
  }, [dispatch, userInfo, accessToken]);

  useEffect(() => {
    if (type) {
      setRenderType(type);
    } else {
      setRenderType(isLogined ? "login" : "logout");
    }
  }, [type, isLogined]);

  const handleLikeChange = useCallback(() => {
    if (like) {
      // like 해제
    } else {
      // like 등록
    }
    setLike(!like);
  }, [like]);

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

            <Link
              to="/dashboard/post"
              className="btn_tugo btn-pk n blue bdrs hide-m"
            >
              <span>投稿</span>
            </Link>
            <FontAwesomeIcon className="view-m ml24" icon={faSquarePlus} />

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
            <button
              type="button"
              className="btn_back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faAngleLeft} fontSize="24px" />
                投稿する
              </span>
            </button>
            <div className="rgh">
              <button
                type="button"
                className={`btn_top_heart ${like ? "on" : ""}`}
                onClick={handleLikeChange}
              >
                <FontAwesomeIcon icon={faHeart} fontSize="24px" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* post upload */}
      {renderType === "postUpload" && (
        <>
          <div className="inr-c">
            <button
              type="button"
              className="btn_back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="icon">
                <i className="fa-solid fa-angle-left">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </i>
              </span>
            </button>
          </div>
        </>
      )}

      {/* set back button and title  */}
      {backTitle && (
        <div className="head_con l349">
          <button
            type="button"
            className="btn_back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <span className="icon flex">
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
