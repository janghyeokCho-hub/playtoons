import { getFormattedDateForDateObject, getFormattedDateForUrl, getInitDateObject, showOneButtonPopup } from "@/common/common";
import MyPagination from "@/components/dashboard/MyPagination";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import Purchase from "./Purchase";

import { DATE_FORMAT_ON_URL, MILLISECONDS_OF_1_YEAR } from "@/common/constant";
import CalendarView from "@/components/dashboard/CalendarView";
import EmptyTr from "@/components/dashboard/EmptyTr";
import { getShopPurchaseFromServer } from "@/services/mypageService";
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
    
    const {status, data} = await getShopPurchaseFromServer(formData);
    
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
    const startDate = (name === "start" ? date : stateStartAt).getTime();
    const endDate = (name === "end" ? date : stateEndAt).getTime();

    if (startDate >= endDate) {
      showOneButtonPopup(dispatch, "??????????????????????????????????????????????????????");
      return;
    }
    
    //?????? 1????????? ?????? ??????
    if ( (endDate - startDate) > MILLISECONDS_OF_1_YEAR ) {
      showOneButtonPopup(dispatch, "???????????????1????????????");
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
    if( stateData?.purchases?.length === 0 ){
      return <EmptyTr text={`??????????????????????????????`} />;
    }

    return stateData?.purchases?.map((item, index) => {
      return (
        <Purchase item={item} key={index} />
      );
    });
  };

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>????????????</strong>
        </h2>

        <div className="inp_cal">
          <div>
            <label htmlFor="calendar_first1">?????????</label>
            <CalendarView 
              name={"start"}
              className={""} 
              value={stateStartAt} 
              onChange={handleClickCalendar} />
          </div>
          <div>
            <label htmlFor="calendar_last1">?????????</label>
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
          <caption>??????</caption>
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
              <th className="hide-m">??????</th>
              <th>??????</th>
              <th>????????????</th>
              <th>??????</th>
              <th>??????</th>
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

