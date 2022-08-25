import React from 'react';
import { Route, Routes } from "react-router-dom";
import DashboardSeriesMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesMobile";
import DashboardSeriesDetailMobile from "@CONTAINERS/dashboardSeries/DashboardSeriesDetailMobile";
import DashboardUploadSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";
import DashboardEditSeries from "@CONTAINERS/dashboardSeries/DashboardUploadSeries";

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
        element={<DashboardSeriesMobile />}
      />
      <Route
        path="/series/detail/:id"
        element={<DashboardSeriesDetailMobile />}
      />
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
