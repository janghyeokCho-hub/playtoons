import React from 'react';
import { Route, Routes } from "react-router-dom";
import Series from "@CONTAINERS/dashboard/series/DashboardSeriesMobile";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetailMobile";
import UploadSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import EditSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetailMobile";
import PostList from "@CONTAINERS/dashboard/post/DashboardPostListMobile";
import ReactionList from "@CONTAINERS/dashboard/reaction/DashboardReactionListMobile";
import Main from "@CONTAINERS/dashboard/DashboardMain";

/**
* Dashboard mobile url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function DashboardMobile() {
  return (
    <Routes>
      <Route 
        path="/main" 
        element={<Main />} 
      />
      <Route
        path="/series"
        element={<Series />}
      />
      <Route
        path="/series/detail/:id"
        element={<SeriesDetail />}
      />
      <Route
        path="/series/upload"
        element={<UploadSeries />}
      />
      <Route
        path="/series/edit/:id"
        element={<EditSeries />}
      />
      <Route 
        path="/post" 
        element={<PostList />} 
      />
      <Route
        path="/post/detail/:id"
        element={<PostDetail />}
      />
      <Route 
        path="/reaction" 
        element={<ReactionList />} 
      />
      <Route
        path="/*"
        element={<Series />}
      />
    </Routes>
  )
}
