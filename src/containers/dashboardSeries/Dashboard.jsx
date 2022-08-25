import React from 'react';
import { Route, Routes } from "react-router-dom";
import DashboardSeries from "@CONTAINERS/dashboardSeries/DashboardSeries";
import DashboardSeriesDetail from "@CONTAINERS/dashboardSeries/DashboardSeriesDetail";
import DashboardUploadSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";
import DashboardEditSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";

/**
* Dashboard url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function Dashboard() {
  return (
    <Routes>
      <Route path="/series" element={<DashboardSeries />} />
      <Route
        path="/series/detail/:id"
        element={<DashboardSeriesDetail />}
      >
        {" "}
      </Route>
      <Route
        path="/series/upload"
        element={<DashboardUploadSeries />}
      />
      <Route
        path="/series/edit/:id"
        element={<DashboardEditSeries />}
      />
    </Routes>
  )
}
