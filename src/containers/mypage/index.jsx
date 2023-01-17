import MenuTabs from "@/components/dashboard/MenuTabs";
import { setContainer } from "@/modules/redux/ducks/container";
import InquiryItems from "@COMPONENTS/mypage/inquiry/InquiryItems";
import PurchaseItems from "@COMPONENTS/mypage/purchase/PurchaseItems";
import ReviewItems from "@COMPONENTS/mypage/review/ReviewItems";
import Page404 from "@COMPONENTS/Page404";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setContainer({
      headerClass: "header",
      containerClass: "container list",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    }));
  }, [dispatch]);

  return (
    <>
      <MenuTabs 
        ulClassName={"inr-c"}
        barClassName={"product_bar mypage"}
        pcTop={86}
        mobileTop={39}
        tabMenu={[
          {
            name: "購入一覧",
            path: "/mypage/purchase",
          },
          {
            name: "レビューリスト",
            path: "/mypage/review",
          },
          {
            name: "お問合せ一覧",
            path: "/mypage/inquiry",
          },
        ]} />

      <Routes>
        <Route path="purchase" element={<PurchaseItems />} />
        <Route path="purchase/:page" element={<PurchaseItems />} />
        <Route path="purchase/:startAt/:endAt/:page" element={<PurchaseItems />} />
        <Route path="review" element={<ReviewItems />} />
        <Route path="review/:page" element={<ReviewItems />} />
        <Route path="review/:startAt/:endAt/:page" element={<ReviewItems />} />
        <Route path="inquiry" element={<InquiryItems />} />
        <Route path="inquiry/:page" element={<InquiryItems />} />
        <Route path="inquiry/:startAt/:endAt/:page" element={<InquiryItems />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
