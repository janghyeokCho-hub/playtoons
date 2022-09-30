import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";

//temp data
import '@/css/test.css';
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";
import ProductTab from "@/components/dashboard/ProductTab";
import Image from "@/components/dashboard/Image";
import Calendar from "@/components/dashboard/Calendar";

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
  amount : "数量",
  start_date : "開始日",
  end_date: "終了日",
  during_sales : "期間内の売上総額"
};

const tempData = {
  sales: "144,232 PC",
  list: [
    {
      number : "1",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "32",
    },
    {
      number : "2",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "33",
    },
    {
      number : "3",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "23",
    },
  ]
};



export default function DashboardSalesList(props) {
  const [stateData, setStateData] = useState(undefined);
  const refCalendarStart = useRef();
  const refCalendarEnd = useRef();

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

  const handleClickCalendar = (name, date) => {
    const startDate = name === 'start' ? date : refCalendarStart.current.getDate();
    const endDate = name === 'end' ? date : refCalendarEnd.current.getDate();
    
    if( endDate === undefined ){
      return true;
    }

    if( startDate.getTime() >= endDate.getTime() ){
      alert('시작일은 종료일보다 클 수 없습니다.');
      return false;
    }

    return true;
  };

  const renderSalesList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs">
            <div className="cx_thumb w131h81"><span><Image hash={item.image} alt={"cover iamge"} /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_group">{item.price}</td>
          <td className="td_gray"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className={`td_txt`}><span className="view-m">{text.amount}</span>{item.amount}</td>
          <td className="td_txt float-right">
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setStateData(tempData);

  }, []);
  //TODO calendar 달기, reaction component 만들기
  return (
    <Container 
      type={"series"} >

      <ProductTab />

      <div className="inr-c">
        <div className="col mt2 saleslist-data-col">
          <div className="mr24">
            <div className="calendar-label">{text.start_date}</div>
            <Calendar 
              ref={refCalendarStart}
              name={"start"}
              type={"-1month"} 
              callback={handleClickCalendar} />
          </div>
          <div className="mr24">
            <div className="calendar-label">{text.end_date}</div>
            <Calendar 
              ref={refCalendarEnd}
              name={"end"}
              type={"none"} 
              callback={handleClickCalendar} />
          </div>
        </div>

        <div className="col mt41 saleslist-data-col">
          <div className="saleslist-during-label mr50">{text.during_sales}</div>
          <div className="saleslist-during-text">{stateData?.sales}</div>
        </div>

        <div className="tbl_basic mtbl_ty1 mt50">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="wid1" />
              <col className="wid4" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.amount}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesList()
              }
            </tbody>
          </table>
        </div>


      </div>

    </Container>
  );
}
