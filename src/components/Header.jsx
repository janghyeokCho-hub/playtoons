import React, { useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSquarePlus } from "@fortawesome/pro-light-svg-icons";
import { faAngleLeft, faBars } from "@fortawesome/pro-solid-svg-icons";

import { getToken } from "@/common/common";
import { useNavigate } from "react-router-dom";

import tempProfile from "@IMAGES/img_profile.png";

const Header = ({ type, className, handleLeftMenu, backTitle, handleBack }) => {
  // login 구현 후 redux store에서 값 받아와야함
  const token = getToken();
  const navigate = useNavigate();

  let renderType = "";
  const isLogin = token !== null;
  if( type === undefined || type === null ){
    renderType = isLogin ? "login" : "logout";
  }
  else{
    renderType = type;
  }

  return (
    <header id="header" className={`header ${className}`}>
      
        {/* logout */}
        {
          renderType === "logout" && 
          <div className="inr-c">
            <h1 className="logo"><a href="/"><span className="ico_logo">PlayToons</span></a></h1>
            
            <div className="rgh">
              <div className="box_hd_sch">
                <input type="text" className="inp_txt" placeholder="検索キーワードを入力" />
                <button type="button" className="btns"><span><FontAwesomeIcon icon={faMagnifyingGlass} /></span></button>
              </div>
              {/* mobile button */}
              <button type="button" className="mo_btns view-m"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              
              <a href="/account" className="btn_tugo btn-pk n blue bdrs">ログイン</a>
            </div>
          </div>
        }

        {/* login */}
        {
          renderType === "login" && 
          <div className="inr-c">
            <button type="button" className="btn_gnb" title="메뉴"><span><FontAwesomeIcon icon={faBars} /></span></button>
            <h1 className="logo"><a href="/"><span className="ico_logo">PlayToons</span></a></h1>
            
            <div className="rgh">
              <div className="box_hd_sch">
                <input type="text" className="inp_txt" placeholder="検索キーワードを入力" />
                <button type="button" className="btns"><span><FontAwesomeIcon icon={faMagnifyingGlass} /></span></button>
              </div>
              {/* mobile button */}
              <button type="button" className="mo_btns view-m"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              
              <a href="/dashboard/post" className="btn_tugo btn-pk n blue bdrs"><span>投稿</span></a>
              <span className="view-m"><FontAwesomeIcon icon={faSquarePlus} /></span>
              <a href="#" className="btn_profile"><span style={{backgroundImage: `url(${tempProfile})`}}></span></a>
            </div>
          </div>
        }

        {/* post */}
        {
          renderType === "post" && 
          <div className="inr-c">
            <button type="button" className="btn_back" onClick={() => {navigate(-1)}}><span className="icon"><FontAwesomeIcon icon={faAngleLeft} /></span></button>
          </div>
        }

    {/* set back button and title  */}  
    {
      backTitle && 
        <div className="head_con">
          <button type="button" className="btn_back" onClick={() => {navigate(-1)}}><span className="icon"><FontAwesomeIcon icon={faAngleLeft} />{backTitle}</span></button>
        </div>
    }
    </header>
  );
};

export default Header;
