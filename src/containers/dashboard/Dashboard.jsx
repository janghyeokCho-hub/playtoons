import React from 'react';
import { Route, Routes } from "react-router-dom";
import Series from "@/containers/dashboard/series/DashboardSeries";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetail";
import UploadSeries from "@CONTAINERS/dashboard/series/DashboardUploadSeries";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetail";
import PostList from "@CONTAINERS/dashboard/post/DashboardPostList";
import ReactionList from "@CONTAINERS/dashboard/reaction/DashboardReactionList";
import Main from "@CONTAINERS/dashboard/DashboardMain";
import ProductList from "@CONTAINERS/dashboard/product/DashboardProductList";
import UploadProfile from "@/containers/dashboard/profile/DashboardUploadProfile";
import Plan from "@/containers/dashboard/plan/DashboardPlan";
import Modal from '@/components/Modal';

/**
* Dashboard url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function Dashboard() {
  return (
    <>
      <Routes>
        <Route 
          path="/main" 
          element={<Main />} 
        />
        <Route 
          path="/product/list" 
          element={<ProductList />} 
        />
        <Route 
          path="/profile/upload" 
          element={<UploadProfile />} 
        />
        <Route 
          path="/series" 
          element={<Series />} 
        />
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
          element={<UploadSeries />}
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
          path="/plan" 
          element={<Plan />} 
        />
        <Route 
          path="/*" 
          element={<Series />}    //404
        />
      </Routes>
      //TODO 모달 기능 살리기
      {/* <Modal show={false} /> */}
    </>
  )
}
