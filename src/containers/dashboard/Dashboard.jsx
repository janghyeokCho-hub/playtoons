import React from 'react';
import { Route, Routes } from "react-router-dom";
import Series from "@/containers/dashboard/series/DashboardSeries";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetail";
import SeriesUpload from "@/containers/dashboard/series/DashboardSeriesUpload";
import SeriesEdit from "@/containers/dashboard/series/DashboardSeriesEdit";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetail";
import PostList from "@CONTAINERS/dashboard/post/DashboardPostList";
import PostUpload from "@CONTAINERS/dashboard/post/DashboardPostUpload";
import ReactionList from "@CONTAINERS/dashboard/reaction/DashboardReactionList";
import Main from "@CONTAINERS/dashboard/DashboardMain";
import SalesDetail from "@CONTAINERS/dashboard/DashboardSalesDetail";
import ProductList from "@CONTAINERS/dashboard/product/DashboardProductList";
import SalesList from "@CONTAINERS/dashboard/product/DashboardSalesList";
import SalesInquiry from "@CONTAINERS/dashboard/product/DashboardSalesInquiry";
import SalesReview from "@CONTAINERS/dashboard/product/DashboardSalesReview";
import UploadProfile from "@/containers/dashboard/profile/DashboardUploadProfile";
import Plan from "@/containers/dashboard/plan/DashboardPlan";
import PlanUpload from "@/containers/dashboard/plan/DashboardPlanUpload";
import PlanEdit from "@/containers/dashboard/plan/DashboardPlanEdit";
import PlanSubsciber from "@/containers/dashboard/plan/DashboardPlanSubsciber";
import Page404 from "@/containers/dashboard/Page404";
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
          path="/sales/detail" 
          element={<SalesDetail />} 
        />
        <Route 
          path="/product" 
          element={<ProductList />} 
        />
        <Route 
          path="/product/sales/list" 
          element={<SalesList />} 
        />
        <Route 
          path="/product/sales/inquiry" 
          element={<SalesInquiry />} 
        />
        <Route 
          path="/product/sales/review" 
          element={<SalesReview />} 
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
          path="/series/:page" 
          element={<Series />} 
        />
        <Route
          path="/series/detail/:id"
          element={<SeriesDetail />}
        >
        </Route>
        <Route
          path="/series/upload"
          element={<SeriesUpload />}
        />
        <Route
          path="/series/edit/:id"
          element={<SeriesEdit />}
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
          path="/post/upload"
          element={<PostUpload />}
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
          path="/plan/upload" 
          element={<PlanUpload />} 
        />
        <Route 
          path="/plan/edit/:id" 
          element={<PlanEdit />} 
        />
        <Route 
          path="/plan/subscriber" 
          element={<PlanSubsciber />} 
        />
        <Route 
          path="/*" 
          element={<Page404 />}    //TODO 404
        />
      </Routes>
      {/* //TODO 모달기능 */}
      {/* <Modal show={false} /> */}
    </>
  )
}
