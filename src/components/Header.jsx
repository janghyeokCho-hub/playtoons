import { showOneButtonPopup } from "@/common/common";
import { useWindowSize } from "@/hook/useWindowSize";
import { setMenuShow } from "@/modules/redux/ducks/container";
import { getTempTokenRequest, logoutRequest, setUserInfo } from "@/modules/redux/ducks/login";
import { getAuthorMineAction } from "@/modules/redux/ducks/post";
import { clearUserData } from "@/utils/localStorageUtil";
import { getAccount } from "@API/accountService";
import {
  faSquarePen,
  faSquarePlus
} from "@fortawesome/pro-light-svg-icons";
import { faCartCirclePlus } from "@fortawesome/pro-regular-svg-icons";
import { faAngleLeft, faBars, faGlobe, faHeart, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useCallback, useEffect, useLayoutEffect, useState
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageBackground from "./dashboard/ImageBackground";
import HeaderProfile from "./HeaderProfile";
import HeaderSearchComponent from "./HeaderSearchComponent";


const Header = ({ className, onSideMenu }) => {
  const { t, i18n } = useTranslation();
  /** 헤더 통합하면서 추가됨 */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMenuShow = useSelector(({ container }) => container.isMenuShow);
  const type = useSelector(({ container }) => container.headerType);
  const isDetailView =
    useSelector(({ container }) => container.isDetailView) || false;
  const headerClass = useSelector(({ container }) => container.headerClass);
  const backTitle = useSelector(({ container }) => container.backTitle);
  /** */

  const userInfo = useSelector(({ login }) => login.userInfo);
  const accessToken = useSelector(({ login }) => login.accessToken);
  const isLogined = useSelector(({ login }) => login.isLogined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const [renderType, setRenderType] = useState(null);
  const [isLikeShow, setIsLikeShow] = useState(false);
  const [isProfileShow, setIsProfileShow] = useState(false);
  const [isUserBoxShow, setIsUserBoxShow] = useState(false);
  const [isLanguageShow, setIsLanguageShow] = useState(false);
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  /**
   * 게시글 좋아요 관련이 헤더에 있기 때문에, post는 꼭 리덕스 사용해야함.
   */
  const currentPost = useSelector(({ post }) => post.currentPost);

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const homeURL = isLogined ? "/home" : "/";

  //==============================================================================
  // hook
  //==============================================================================

  useEffect(() => {
    if (isMenuShow === undefined) {
      dispatch(setMenuShow(true));
    }
  }, [dispatch, isMenuShow]);

  useEffect(() => {
    setIsMobile(windowSize.width < 961);
  }, [windowSize]);

  useEffect(() => {
    if (!accessToken && code) {
      dispatch(getTempTokenRequest({ code: code }));
    }
  }, [dispatch, code, accessToken]);

  useEffect(() => {
    async function getUserInfo(token) {
      const response = await getAccount(token);
      if (response.status === 200) {
        dispatch(setUserInfo(response.data));
      }
    }

    if (accessToken && !userInfo) {
      getUserInfo(accessToken);
    }
  }, [dispatch, userInfo, accessToken]);

  useEffect(() => {
    setRenderType(type);
    return () => {
      setRenderType(null);
    };
  }, [type]);

  useLayoutEffect(() => {
    if (userInfo && !reduxAuthors) {
      //accessToken 이 없는 상태로 api 호출을 하는 경우가 있으니 userInfo 필요
      dispatch(getAuthorMineAction());
    }
  }, [userInfo, reduxAuthors]);

  useEffect(() => {
    let tempType = type;
    if (type !== "post") {
      tempType = isLogined ? type : "logout";
    }
    setRenderType(tempType);
  }, [isLogined, type]);

  //==============================================================================
  // function
  //==============================================================================

  const handleLogout = useCallback(() => {
    clearUserData();
    dispatch(logoutRequest());
    navigate("/");
  }, [dispatch, navigate]);

  const handleUploadPost = useCallback(() => {
    if (reduxAuthors && reduxAuthors?.length > 0) {
      setIsUserBoxShow(false);
      navigate("/post/upload");
    } else {
      showOneButtonPopup(
        dispatch,
        t(`popup.doNotRegisterCreatorCanNotPost`),
        () => navigate("/author/register")
      );
    }
  }, [reduxAuthors]);

  const handleDashboard = useCallback(() => {
    if (reduxAuthors && reduxAuthors?.length > 0) {
      navigate("/dashboard/main");
    } else {
      showOneButtonPopup(
        dispatch,
        t(`popup.doNotRegisterCreatorCanNotEnterDashboard`),
        () => navigate("/author/register")
      );
    }
  }, [reduxAuthors]);
  

  const handleLanguage = (id) => {
    i18n.changeLanguage(id);
  };

  //==============================================================================
  // render
  //==============================================================================

  return (
    <div className="open">
      <header id="header" className={headerClass}>
        {/* logout, login, author, webtoon, novel */}

        <>
          {((isMobile && isDetailView && renderType === "post") ||
            !isDetailView) && (
            <>
              {isLogined && (
                <div className={`inr-c ${isMobile && "view-m"}`}>
                  {isMenuShow && (
                    <button
                      type="button"
                      className="btn_gnb"
                      title=""
                      onClick={() => onSideMenu?.()}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBars} />
                      </span>
                    </button>
                  )}
                  <h1 className="logo">
                    <Link to={homeURL}>
                      <span className="ico_logo">{t(`header.logo`)}</span>
                    </Link>
                  </h1>

                  <div className="rgh">
                    <HeaderSearchComponent
                      isMobile={isMobile}
                      windowSize={windowSize}
                    />
                    {/*<!-- 모바일 검색 버튼 -->*/}

                    <div
                      className="pos_to"
                      onMouseEnter={() => {
                        setIsUserBoxShow(true);
                      }}
                      onMouseLeave={() => {
                        setIsUserBoxShow(false);
                      }}
                    >
                      <button
                        type="button"
                        className="btn_tugo btn-pk n blue bdrs"
                      >
                        <span>{t(`header.post`)}</span>
                        <FontAwesomeIcon
                          icon={faSquarePlus}
                          className="view-m"
                        />
                      </button>
                      {isUserBoxShow && (
                        <div className="box_drop">
                          <ul>
                            <li>
                              <a className="pointer" onClick={handleUploadPost}>
                                <FontAwesomeIcon icon={faSquarePen} />
                                {` ${t(`header.doPost`)}`}
                              </a>
                            </li>
                            <li>
                              <Link to="/product/upload">
                                <FontAwesomeIcon icon={faCartCirclePlus} />
                                {` ${t(`header.registerMarket`)}`}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div
                      className="pos_profile"
                      onMouseEnter={() => {
                        setIsProfileShow(true);
                      }}
                      onMouseLeave={() => {
                        setIsProfileShow(false);
                      }}
                    >
                      <button type="button" className="btn_profile">
                        <ImageBackground type={"span"} hash={userInfo?.profileImage || reduxAuthors?.[0]?.profileImage} />
                      </button>

                      {isProfileShow && (
                        <HeaderProfile 
                        userInfo={userInfo} 
                        homeURL={homeURL} 
                        onClickShowProfile={(flag) => setIsProfileShow(flag)} 
                        onClickDashboard={() => handleDashboard()} 
                        onClickLogout={() => handleLogout()} 
                        onClickLanguage={(flag) => setIsLanguageShow(flag)}
                          />
                      )}
                    </div>
                  </div>
                </div>
              )}
              {!isLogined && (
                <div className={`inr-c ${isMobile && "view-m"}`}>
                  {isMenuShow && (
                    <button
                      type="button"
                      className="btn_gnb"
                      title="메뉴"
                      onClick={() => onSideMenu?.()}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBars} />
                      </span>
                    </button>
                  )}
                  <h1 className="logo">
                    <Link to={homeURL}>
                      <span className="ico_logo">{t(`header.logo`)}</span>
                    </Link>
                  </h1>

                  <div className="rgh">
                    <HeaderSearchComponent isMobile={isMobile} />

                    <Link to="/account" className="btn_log btn-pk n blue bdrs">
                      <span>{t(`header.login`)}</span>
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </>

        {renderType === "post" && (
          <>
            <div className="inr-c view-m">
              <nav className="gnb">
                <ul>
                  <li
                    className={location.pathname.includes("/home") ? "on" : ""}
                  >
                    <Link to="/home">{t(`sidebar.home`)}</Link>
                  </li>
                  <li
                    className={
                      location.pathname.includes("/timeline") ? "on" : ""
                    }
                  >
                    <Link to="/timeline">{t(`sidebar.timeline`)}</Link>
                  </li>
                  <li
                    className={
                      location.pathname.includes("/author/") ? "on" : ""
                    }
                  >
                    <Link to="/author/list">{t(`sidebar.creator`)}</Link>
                  </li>
                  <li
                    className={location.pathname.includes("/store") ? "on" : ""}
                  >
                    <Link to="/store">{t(`sidebar.market`)}</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
        {isDetailView && (renderType === "post" || renderType === "product") && (
          <div className="inr-c">
            <button
              type="button"
              className="btn_back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faAngleLeft} fontSize={24} />
              </span>
            </button>
            {renderType === "post" && (
              <div className="rgh">
                <button
                  type="button"
                  className="btn_top_heart on"
                  onClick={() => setIsLikeShow(!isLikeShow)}
                >
                  {/*<!-- 이미 누른것엔 on 추가 -->*/}
                  <FontAwesomeIcon icon={faHeart} fontSize={24} />
                </button>

                {isLikeShow && (
                  <div className="box_drop box_favorit">
                    <ul>
                      {/* TODO post 좋아요 api */}
                      {/* <!-- 이미 누른것엔 on 추가 --> */}
                      <li className="on">
                        <button type="button">
                          <span className="i_favorit1">313</span>
                        </button>
                      </li>

                      <li>
                        <button type="button">
                          <span className="i_favorit2">414</span>
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <span className="i_favorit3">1.2k</span>
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <span className="i_favorit4">512</span>
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <span className="i_favorit5">512</span>
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <span className="i_favorit6">0</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* post upload */}
        {renderType === "postUpload" && (
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
        )}

        {/* 다국어 팝업 */}
        {isLanguageShow && (
          <div className="popup_dim" onClick={() => setIsLanguageShow(false)}>
            <div id="popGlobal" className="layerPopup pop_global">
              <div className="popup">
                <div className="pop_head">
                  <h2 className="title">{t(`header.language`)}</h2>
                  <button
                    type="button"
                    className="btn_pop_close b-close"
                    onClick={() => setIsLanguageShow(false)}
                  >
                    <FontAwesomeIcon icon={faXmarkLarge} />
                  </button>
                </div>
                <div className="pop_cont">
                  <ul>
                    <li className={`${i18n.language === "ja-JP" ? "on" : ""}`}>
                      <a onClick={() => handleLanguage("ja-JP")}>
                        {t(`header.ja-JP`)}
                      </a>
                    </li>
                    <li className={`${i18n.language === "ko-KR" ? "on" : ""}`}>
                      <a onClick={() => handleLanguage("ko-KR")}>
                        {t(`header.ko-KR`)}
                      </a>
                    </li>
                    <li className={`${i18n.language === "en-US" ? "on" : ""}`}>
                      <a onClick={() => handleLanguage("en-US")}>
                        {t(`header.en-US`)}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default Header;
