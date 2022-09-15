import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title1, Body3, Border1pxMercury, Body1 } from "@/styledMixins";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import {BROWSER_CONTENTS_AREA_TYPE, INPUT_STATUS} from '@COMMON/constant';
import BrowserContainer from "@/components/dashboard/BrowserContainer";
import Button from '@COMPONENTS/dashboard/ButtonOutline';
import ProductTab from "@/components/dashboard/ProductTab";
import Input from "@/components/dashboard/TextInputSearch";

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
          <Tr key={index}>
            <Td width={size.number}>{item.number}</Td>
            <Td width={size.product}>
              <Image src={item.image} />
            </Td>
            <Td width={size.title}>{item.title}</Td>
            <Td width={size.price}>{item.price}</Td>
            <Td width={size.date}>{item.date}</Td>
            <Td width={size.status} color={getStatusColor(item.status)}>{item.status}</Td>
            <Td width={size.buttons}>
              <Button
                width={"6.458333333vw"}
                height={"3.703703704vh"}
                marginLeft={"auto"}
                marginBottom={"10px"}
                borderRadius={"4px"}
                text={text.detail}
                dataId={item.number}
                handleClick={handleItemClick}
                />
              <Button
                width={"6.458333333vw"}
                height={"3.703703704vh"}
                marginLeft={"auto"}
                marginBottom={"10px"}
                borderRadius={"4px"}
                text={text.modify}
                dataId={item.number}
                handleClick={handleItemClick}
                />
              <Button
                width={"6.458333333vw"}
                height={"3.703703704vh"}
                marginLeft={"auto"}
                borderRadius={"4px"}
                text={text.dont_see}
                dataId={item.number}
                handleClick={handleItemClick}
                />
            </Td>
          </Tr>
        );
      });
    }
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setData(tempData);
    refInput.current.setStatusInInput({type: INPUT_STATUS.DEFAULT, error: "error"});
  }, []);

  return (
    <BrowserContainer
      type={BROWSER_CONTENTS_AREA_TYPE.DASHBOARD_WITHOUT_PADDING}
      display={"block"}
      >
        <ProductTab 
          marginBottom={"69px"}
          tabs={{
            see_product : text.see_product, 
            sales_detail : text.sales_detail, 
            qna_product : text.qna_product, 
            see_review : text.see_review}}
          path={getSelectedTab()}
          />
        <Input 
          width={"300px"}
          height={"45px"}
          marginLeft={"49px"}
          marginBottom={"39px"}
          borderRadius={"4px"}
          placeholder={text.product_name}
          ref={refInput}
          />
        <Table>
          <Header>
            <tr>
              <HeaderCell width={size.number}>{text.number}</HeaderCell>
              <HeaderCell width={size.product}>{text.product}</HeaderCell>
              <HeaderCell width={size.title}>{text.title}</HeaderCell>
              <HeaderCell width={size.price}>{text.price}</HeaderCell>
              <HeaderCell width={size.date}>{text.date}</HeaderCell>
              <HeaderCell width={size.status}>{text.status}</HeaderCell>
              <HeaderCell width={size.buttons}>{""}</HeaderCell>
            </tr>
          </Header>
          <Tbody>{getProductListFromResultData(data)}</Tbody>
        </Table>
    </BrowserContainer>
  );
}

const Table = styled.table`
  height: auto;
  margin: 0 48px;
  border-collapse: collapse;
  border-spacing: 0 20px;
`;

const Header = styled.thead`
  ${Border1pxMercury}
  width: 100%;
  height: 6.389776357827476vh;
  background-color: var(--desert-storm);
`;

const HeaderCell = styled.th`
  ${Body1}
  width : ${(props) => props.width}%;
  min-width: ${(props) => props.minWidth}%;
  font-weight: 700;
  font-size: 1.6em;
  color: var(--vulcan);
  white-space: nowrap;
  text-align: center;
  padding: 1.5vh;
  vertical-align: middle;
`;

const Tbody = styled.tbody`
  width: 100%;
  height: auto;
`;

const Tr = styled.tr`
  width: 100%;
  height: 21.299254526091588vh; /* 200px */
  border-bottom: 1px solid var(--mercury);
  background-color: var(--white);

  :hover{
    background-color: var(--desert-storm);
  }
`;

const Td = styled.td`
  ${Body3}
  width : ${(props) => props.width}%;
  min-width: ${(props) => props.minWidth}%;
  font-size: 1.6em;
  color: ${(props) => props.color ? props.color : "var(--vulcan)"};
  text-align: center;
  vertical-align: middle;
`;

const Image = styled.img`
  width: 6.822916667vw;
  /* height: 130px; */
  border-radius: 5px;
  object-fit: cover;
`;

