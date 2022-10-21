import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
  faSquarePen,
  faSquarePlus,
} from "@fortawesome/pro-light-svg-icons";
import { faCartCirclePlus } from "@fortawesome/pro-regular-svg-icons";
import { faXmarkLarge, faGlobe } from "@fortawesome/pro-solid-svg-icons";
import { faAngleLeft, faBars, faHeart } from "@fortawesome/pro-solid-svg-icons";
import tempProfile from "@IMAGES/img_profile.png";
import { getAccount } from "@API/accountService";
import { setUserInfo, getTempTokenRequest } from "@/modules/redux/ducks/login";
import { logoutRequest } from "@/modules/redux/ducks/login";
import { clearUserData } from "@/utils/localStorageUtil";
import { setPostLike } from "@API/postService";
import useFilePath from "@/hook/useFilePath";

const Header = ({
  type,
  className,
  handleLeftMenu,
  backTitle,
  handleBack,
  isMenus = true,
  onSideMenu,
  isDetailView,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector(({ login }) => login.userInfo);
  const accessToken = useSelector(({ login }) => login.accessToken);
  const isLogined = useSelector(({ login }) => login.isLogined);
  const [renderType, setRenderType] = useState(null);
  const [isLikeShow, setIsLikeShow] = useState(false);
  const [isProfileShow, setIsProfileShow] = useState(false);
  const [isUserBoxShow, setIsUserBoxShow] = useState(false);
  const [isLanguageShow, setIsLanguageShow] = useState(false);
  const profileImgURL = useFilePath(userInfo?.profileImage);

  /**
   * 게시글 좋아요 관련이 헤더에 있기 때문에, post는 꼭 리덕스 사용해야함.
   */
  const post = useSelector(({ post }) => post.post);

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

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

  const handleLogout = useCallback(() => {
    clearUserData();
    dispatch(logoutRequest());
  }, [dispatch]);

  useEffect(() => {
    setRenderType( isLogined ? type : 'logout' );
  }, [isLogined]);

  useEffect(() => {}, []);

  return (
    <div className="open">
      <header id="header" className={`header ${className}`}>
        {/* logout, login, author */}
        {renderType === undefined && (            //post detail, post upload 에서 중복되도록 나오기때문에 변경
          <div className="inr-c">
            {isMenus && (
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
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
             
              <div
                className="pos_to"
                onMouseEnter={() => {
                  setIsUserBoxShow(true);
                }}
                onMouseLeave={() => {
                  setIsUserBoxShow(false);
                }}
              >
                <button type="button" className="btn_tugo btn-pk n blue bdrs">
                  <span>投稿</span>
                </button>
                {isUserBoxShow && (
                  <div className="box_drop">
                    <ul>
                      <li>
                        <Link to="/post/upload">
                          <FontAwesomeIcon icon={faSquarePen} />
                          投稿する
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <FontAwesomeIcon icon={faCartCirclePlus} />
                          マケットに登録
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
                  <ImgProfileSpan bgImg={profileImgURL}></ImgProfileSpan>
                </button>

                {isProfileShow && (
                  <div className="box_drop">
                    <div className="top">
                      <button type="button" className="btn_box_close">
                        <FontAwesomeIcon icon={faXmarkLarge} />
                        プロフィール
                      </button>
                    </div>
                    <div className="bt">
                      <p className="t2">{userInfo?.name || ""}</p>
                      <p className="t1">保有ポイント</p>
                      <p className="c1">
                        <span className="c-blue">100,324,394</span>
                        <a href="#" className="btn-pk s blue bdrs">
                          チャージ
                        </a>
                      </p>
                    </div>
                    <ul>
                      <li>
                        <Link to="/author/register">クリエイター登録</Link>
                      </li>
                      <li>
                        <Link to="/dashboard/main">ダッシュボード</Link>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="#">支援中のクリエイター</a>
                      </li>
                      <li>
                        <a href="#">フォロー中のクリエイター</a>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <a href="#">設定</a>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <Link to="/">ログアウト</Link>
                      </li>
                    </ul>
                    <div>
                      <button
                        type="button"
                        className="btn-pk n gray bdrs"
                        onClick={() => setIsLanguageShow(true)}
                      >
                        <FontAwesomeIcon icon={faGlobe} />
                        日本語
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* logout */}
        {renderType === 'logout' && (
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
              <button type="button" className="mo_btns view-m">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            
              <Link to="/account" className="btn_log btn-pk n blue bdrs">
                <span>ログイン</span>
              </Link>
            </div>
          </div>
        )}


        {renderType === "post" && (
          <>
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
                    <a href="#">マケット</a>
                  </li>
                </ul>
              </nav>
            </div>
            {isDetailView && (
              <div className="inr-c">
                <button 
                  type="button" 
                  className="btn_back"
                  onClick={() => {
                    navigate(-1);
                  }}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faAngleLeft} fontSize={24} />
                  </span>
                </button>
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
              </div>
            )}
          </>
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
          <div className="popup_dim">
            <div id="popGlobal" className="layerPopup pop_global">
              <div className="popup">
                <div className="pop_head">
                  <h2 className="title">言語</h2>
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
                    <li className="on">
                      <a href="#">日本語</a>
                    </li>
                    <li>
                      <a href="#">한국어</a>
                    </li>
                    <li>
                      <a href="#">ENGLISH</a>
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

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Header;
