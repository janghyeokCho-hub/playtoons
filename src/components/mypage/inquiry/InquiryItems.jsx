import { getFormattedDateForUrl, getInitDateObject, showOneButtonPopup } from "@/common/common";
import { DATE_FORMAT_ON_URL } from "@/common/constant";
import CalendarView from "@/components/dashboard/CalendarView";
import EmptyTr from "@/components/dashboard/EmptyTr";
import MyPagination from "@/components/dashboard/MyPagination";
import { getInquiryMine } from "@API/storeService";
import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Inquiry from "./Inquiry";

export default function InquiryItems(){
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
  const getInquiryList = useCallback(async (page) => {
    let json = {};
    if( stateStartAt ){
      json["startAt"] = stateStartAt;
    }
    if( stateEndAt ){
      json["endAt"] = stateEndAt;
    }
    if( params.id ){
      json["id"] =  params.id;
    }
    json["page"] =  page === undefined ? 1 : page;
    
    const {status, data} = await getInquiryMine(json);
    
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  }, [params]);

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

  const handleDeleteItem = (item) => {
    console.log('DeleteItem', item);
    getInquiryList(params.page);
  };

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    if( stateStartAt && stateEndAt ){
      getInquiryList(params.page);
    } else {
      setStateStartAt( params.startAt === undefined ? getInitDateObject('3month') : params.startAt );
      setStateEndAt( params.endAt === undefined ? getInitDateObject('now') : params.endAt );
    }
  }, [stateStartAt, stateEndAt, params]);
  
  //==============================================================================
  // render
  //==============================================================================

  const renderReviewList = () => {
    if( stateData === undefined || stateData?.inquiries?.length === 0 ){
      return <EmptyTr text={`お問合せがいません。`} />;
    }

    return stateData?.inquiries?.map((item, index) => {
      return (
        <Inquiry key={`review_${index}`} item={item} callback={handleDeleteItem} />
      );
    });
  };

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>お問合せ期限</strong>
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
            <col className="wid3" />
            <col className="wid5 hide-m" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>販売者</th>
              <th>作成日</th>
              <th></th>
              <th className="hide-m"></th>
            </tr>
          </thead>
          <tbody>
            {
              renderReviewList()
            }
          </tbody>
        </table>
      </div>

      <MyPagination
          meta={stateData?.meta}
          callback={(page) => navigate(`/mypage/inquiry/${params.id ? `${params.id}/` : '' }${getDateFromCalendar(stateStartAt)}/${getDateFromCalendar(stateEndAt)}/${page}`) }
          />
    </div>
  );
};

