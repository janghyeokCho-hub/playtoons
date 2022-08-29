import React from 'react';
import { Route, Routes } from "react-router-dom";
import Series from "@CONTAINERS/dashboard/series/DashboardSeriesMobile";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetailMobile";
import UploadSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import EditSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetailMobile";

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
        path="/post/detail/:id"
        element={<PostDetail />}
      />
    </Routes>
  )
}
