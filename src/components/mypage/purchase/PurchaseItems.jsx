import { getFormattedDateForDateObject, getFormattedDateForUrl, getInitDateObject, showOneButtonPopup } from "@/common/common";
import MyPagination from "@/components/dashboard/MyPagination";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import Purchase from "./Purchase";

import { DATE_FORMAT_ON_URL } from "@/common/constant";
import CalendarView from "@/components/dashboard/CalendarView";
import EmptyTr from "@/components/dashboard/EmptyTr";
import { getShopProductFromServer } from "@/services/mypageService";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function PurchaseItems() {
  const [ stateData, setStateData ] = useState(undefined);
  const [ stateStartAt, setStateStartAt ] = useState(undefined);
  const [ stateEndAt, setStateEndAt ] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  //==============================================================================
  // function
  //==============================================================================
  const getDateFromCalendar = (date) => {
    return getFormattedDateForUrl(date, DATE_FORMAT_ON_URL);
  };

  //==============================================================================
  // api
  //==============================================================================
  const getPruchaseList = async (page) => {
    const formData = new FormData();//get url 
    formData.append("startAt", stateStartAt);
    if( stateEndAt ){
      formData.append("endAt", stateEndAt);
    }
    formData.append("page", page === undefined ? 1 : page);
    
    const {status, data} = await getShopProductFromServer(formData);
    
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickCalendar = (name, date) => {
    const startDate = name === "start" ? date : stateStartAt;
    const endDate = name === "end" ? date : stateEndAt;

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return;
    }

    if( name === "start" ){
      setStateStartAt( date );
    } else if( name === "end" ){
      setStateEndAt( date );
    } 
  };

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    if( stateStartAt && stateEndAt ){
      getPruchaseList(params.page);
    } else {
      setStateStartAt( params.startAt === undefined ? getInitDateObject('3month') : getFormattedDateForDateObject(params.startAt) );
      setStateEndAt( params.endAt === undefined ? getInitDateObject('now') : getFormattedDateForDateObject(params.endAt) );
    }
  }, [stateStartAt, stateEndAt, params]);
  
  //==============================================================================
  // render
  //==============================================================================
  const renderPurchaseList = () => {
    if( stateData?.products?.length === 0 ){
      return <EmptyTr text={`購入一覧がいません。`} />;
    }

    return stateData?.products?.map((item, index) => {
      return (
        <Purchase item={item} key={index} />
      );
    });
  };

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>購入期限</strong>
        </h2>

        <div className="inp_cal">
          <div>
            <label htmlFor="calendar_first1">開始日</label>
            <CalendarView 
              name={"start"}
              className={""} 
              value={stateStartAt} 
              onChange={handleClickCalendar} />
          </div>
          <div>
            <label htmlFor="calendar_last1">終了日</label>
            <CalendarView 
              name={"end"}
              className={""} 
              value={stateEndAt} 
              onChange={handleClickCalendar} />
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
          callback={(page) => navigate(`/mypage/purchase/${getDateFromCalendar(stateStartAt)}/${getDateFromCalendar(stateEndAt)}/${page}`) }
          />
    </div>
  );
};

