import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Purchase from "./Purchase";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { showOneButtonPopup } from "@/common/common";
import { useDispatch } from "react-redux";
import MyPagination from "@/components/dashboard/MyPagination";
import { useLayoutEffect } from "react";
import { getAuthorMineFromServer } from "@/services/postService";

import tempImg1 from "@IMAGES/tmp_comic1.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const TEMP_DATA = {
  meta: {
    currentPage: 1,
    itemCount: 3,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 3
  },
  list: [
    {
      id : "1",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "32",
    },
    {
      id : "2",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "330000",
    },
    {
      id : "3",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "2300",
    },
  ]
};


export default function PurchaseItems() {
  const dispatch = useDispatch();
  const [ stateData, setStateData ] = useState(undefined);
  const params = useParams();
  const startRef = useRef(null);
  const endRef = useRef(null);

  //==============================================================================
  // api
  //==============================================================================
  const getPruchaseList = async (page) => {
    const formData = new FormData();//get url 
    formData.append("page", page === undefined ? 1 : page);
    
    const {status, data} = await getAuthorMineFromServer(formData);
    console.log('getPruchaseList', status, data);
    
    if( status === 200 ){
      setStateData(TEMP_DATA);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickCalendar = (name, date) => {
    const startDate = name === "start" ? date : startRef.current.getDate();
    const endDate = name === "end" ? date : endRef.current.getDate();

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    if( params ){
      getPruchaseList(params.page);
    }
  }, [params]);


  //==============================================================================
  // render
  //==============================================================================
  const renderPurchaseList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <Purchase item={item} key={index} />
      );
    });
  };

  return (
    // TODO /shop/review productId가 필수인데 탭을 통해서 사용자가 진입하면 어떻게 처리해야할까요?
    // TODO productId를 필수제외하면 지금 상태, 필수라면 검색조건은 상단으로 옮기기
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>購入期限</strong>
        </h2>

        <div className="inp_cal">
          <div>
            <label htmlFor="calendar_first1">開始日</label>
            <Calendar
              ref={startRef}
              name={"start"}
              className={""}
              callback={handleClickCalendar}
              type="1month"
              isMaxDate={false}
            />
          </div>
          <div>
            <label htmlFor="calendar_last1">終了日</label>
            <Calendar
              ref={endRef}
              name={"end"}
              className={""}
              callback={handleClickCalendar}
              type="now"
              isMaxDate={true}
            />
          </div>
        </div>
      </div>

      <div className="tbl_basic mtbl_ty1">
        <table className="list">
          <caption>목록</caption>
          <colgroup>
            <col className="num" />
            <col className="imgs2" />
            <col />
            <col className="wid4" />
            <col className="wid4" />
            <col className="wid4" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>価格</th>
              <th>日時</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              renderPurchaseList()
            }
          </tbody>
        </table>
      </div>

      <MyPagination
          meta={stateData?.meta}
          callback={(page) => getPruchaseList(page) }
          />
    </div>
  );
};

