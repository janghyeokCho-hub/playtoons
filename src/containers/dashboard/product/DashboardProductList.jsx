import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";

const size = {
  number: 5,
  product: 8,
  title: 22,
  price: 8,
  date: 8,
  status: 8,
  buttons: 12,
};

const text = {
  see_product : "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review : "レビュ一覧",
  product_name : "商品名",
  number : "番号",
  product: "商品",
  title: "タイトル",
  price : "価格",
  date : "販売開始日",
  status : "状態",
  detail : "詳細",
  modify: "修正",
  dont_see : "非表示"
};

const tempData = [
  {
    number : "1",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: "販売中",
  },
  {
    number : "2",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: "審査中",
  },
  {
    number : "3",
    image : tempImg1,
    title : "大学のリンゴ一個の重さで10メートルの素材",
    price : "1200000CP",
    date : "2022/06/11",
    status: "販売不可",
  },
];

const STATUS_TYPE = {
  sale : "販売中",
  audit : "審査中",
  not_for_sale : "販売不可"
};

const PRODUCT_PATH = {
  PRODUCT_LIST : "/dashboard/product/list",
  SALES_LIST : "/dashboard/sales/list",
  SALES_INQUIRY : "/dashboard/sales/inquiry",
  SALES_REVIEW : "/dashboard/sales/review",
};

export default function DashboardProductList(props) {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const refInput = useRef();

  const getProductList = async () => {
    // 시리즈 스토리 리스트
    const params = {
      email: "",
    };

    // const { status, data } = await getProductListFromServer(params);
    // 
    // if( status === 200 ){
    //   setList(handleGetSeriesStoryList(data));
    // }
    // 
    // setData(getProductListFromResultData(data));
  };

  const handleItemClick = (e) => {
    let no = e.target.getAttribute("data-id");

    navigate("/dashboard/series/detail/" + no);
  };

  const getSelectedTab = () => {
    const path = location.pathname;
    let selectedTab = text.see_product;

    switch(path){
      default:    //product
        selectedTab = text.see_product;
        break;
      case PRODUCT_PATH.SALES_LIST:
        selectedTab = text.sales_detail;
        break;
      case PRODUCT_PATH.SALES_INQUIRY:
        selectedTab = text.qna_product;
        break;
      case PRODUCT_PATH.SALES_REVIEW:
        selectedTab = text.see_review;
        break;
    }//swtich

    return selectedTab;
  };

  const getStatusColor = (status) => { 
    let color = "var(--vulcan)";

    switch(status){
      default:    //sale
        color = "var(--status-green)";
        break;
      case STATUS_TYPE.audit:
          color = "var(--status-orange)";
      break;
      case STATUS_TYPE.not_for_sale:
          color = "var(--status-red)";
      break;

    }//switch
    return color;
  };

  const getProductListFromResultData = (result) => {
    if( result !== undefined ){
      return result.map((item, index) => {
        return (
          <></>
        );
      });
    }
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setData(tempData);
    // refInput.current.setStatusInInput({type: INPUT_STATUS.DEFAULT, error: "error"});
  }, []);

  return (
    <Container 
      type={"bg profile"} >


    </Container>
  );
}
