import MenuTabs from "@/components/dashboard/MenuTabs";
import { setContainer } from "@/modules/redux/ducks/container";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Page404 from "@/components/Page404";
import PostList from "@CONTAINERS/dashboard/post/DashboardPostList";
import PostMain from "@CONTAINERS/dashboard/post/DashboardPostMain";
import PostTempList from "@CONTAINERS/dashboard/post/DashboardPostTempList";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetail";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

/**
   DashboardPostMain Component
* @date 2023.01.10 10:01
* @version 1.0.0
* @author 2hyunkook
*/
export default function DashboardPostMain(props) {
  const [ stateIsShowMenu, setStateShowMenu ] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const TAB_MENU = [
    {
      name: "投稿リスト",
      path: "/dashboard/post/1",
    },
    {
      name: "一時保存",
      path: "/dashboard/post/temp/1",
    },
  ];
  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    dispatch(
      setContainer({
        headerClass: "header",
        containerClass: "container post",
        isHeaderShow: true,
        isMenuShow: true,
        headerType: null,
        menuType: "DASHBOARD",
        isDetailView: false,
        activeMenu: "post",
        isFooterShow: false,
      })
    );
  }, [dispatch]);

  //==============================================================================
  // hook
  //==============================================================================

  useEffect(() => {
    if( location ){
      //post detail 화면 sidebar, header 스타일 구분
      if( location.pathname.startsWith('/dashboard/post/detail/') ){
        setStateShowMenu(false);
      } else {
        setStateShowMenu(true);
        handleContainer();
      }
    } 
  }, [location]);

  //==============================================================================
  // render
  //==============================================================================

  return (
    <div className="contents">
      {
        stateIsShowMenu && 
          <MenuTabs tabMenu={TAB_MENU} />
      }

      <Routes>    
        <Route 
          index 
          element={<PostMain />} 
        />
        
        <Route 
          path="/:page" 
          element={<PostList />} 
        />
        <Route 
          path="/:page&:search" 
          element={<PostList />} 
        />
        <Route
          path="/detail/:id"
          element={<PostDetail />}
        />

        <Route 
          path="/temp/:page" 
          element={<PostTempList />}    
        />
        <Route 
          path="/*" 
          element={<Page404 />}    
        />
      </Routes>

    </div>
  );
}
