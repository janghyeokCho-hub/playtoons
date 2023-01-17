import { getDateFormat, showOneButtonPopup } from "@/common/common";
import MyPagination from "@/components/dashboard/MyPagination";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import Purchase from "./Purchase";

import EmptyTr from "@/components/dashboard/EmptyTr";
import { getShopProductFromServer } from "@/services/mypageService";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";


export default function PurchaseItems() {
  const [ stateData, setStateData ] = useState(undefined);
  const [ stateIsload, setStateload ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const refStart = useRef();
  const refEnd = useRef();

  //==============================================================================
  // function
  //==============================================================================
  const onLoadCalendar = (name, date) => {
    // console.log(`${name} : ${date}`);
    console.log(`onLoadCalendar`);
    setStateload(true);
  };

  const getDateFromCalendar = (ref) => {
    return getDateFormat(ref.current.getDate(), "yyyyMMdd");
  };

  //==============================================================================
  // api
  //==============================================================================
  const getPruchaseList = async (page) => {
    const formData = new FormData();//get url 
    formData.append("startAt", refStart.current.getDate());
    if( refEnd.current.getDate() ){
      formData.append("endAt", refEnd.current.getDate());
    }
    formData.append("page", page === undefined ? 1 : page);
    
    const {status, data} = await getShopProductFromServer(formData);
    console.log('getPruchaseList', status, data);
    
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
    const startDate = name === "start" ? date : refStart.current.getDate();
    const endDate = name === "end" ? date : refEnd.current.getDate();

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  //==============================================================================
  // hook
  //==============================================================================
  useEffect(() => {
    const startAt = refStart.current.getDate();
    const endAt = refEnd.current.getDate();

    if(startAt && endAt){
      getPruchaseList(params.page);
    }
  }, [stateIsload, params]);
  
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
            <Calendar
              ref={refStart}
              name={"start"}
              className={""}
              value={new Date('2022/12/01')}
              onLoadState={onLoadCalendar}
              callback={handleClickCalendar}
              type="1month"
              isMaxDate={false}
              />
          </div>
          <div>
            <label htmlFor="calendar_last1">終了日</label>
            <Calendar
              ref={refEnd}
              name={"end"}
              className={""}
              // onLoadState={onLoadCalendar}
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
          callback={(page) => navigate(`/mypage/purchase/${getDateFromCalendar(refStart)}/${getDateFromCalendar(refEnd)}/${page}`) }
          // callback={(page) => getPruchaseList(page) }
          />
    </div>
  );
};

