import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Charge from "./Charge";
import Checking from "./Checking";
import CompletedCharge from "./CompletedCharge";
import CompletedPlan from "./CompletedPlan";
import CompletedProduct from "./CompletedProduct";
import Failed from "./Failed";
import Product from "./Product";
import Plan from "./Plan";
import ProductDetail from "./ProductDetail";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard payment bgw",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };

    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route path="/product/:id"  element={<Product />} />
      <Route path="/plan/:id" element={<Plan />} />
      <Route path="/checking/:id" element={<Checking />} />
      <Route path="/failed/:id" element={<Failed />} />
      <Route path="/charge" element={<Charge />} />
      <Route path="/completed/product/:id" element={<CompletedProduct />} />
      <Route path="/completed/charge/:id" element={<CompletedCharge />} />
      <Route path="/completed/plan/:id" element={<CompletedPlan />} />
      <Route path="/product/detail/:id" element={<ProductDetail />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
