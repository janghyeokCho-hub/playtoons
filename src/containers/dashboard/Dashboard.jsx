import React from 'react';
import { Route, Routes } from "react-router-dom";
import Series from "@/containers/dashboard/series/DashboardSeries";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetail";
import UploadSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import EditSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetail";

/**
* Dashboard url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function Dashboard() {
  return (
    <Routes>
      <Route path="/series" element={<Series />} />
      <Route
        path="/series/detail/:id"
        element={<SeriesDetail />}
      >
      </Route>
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