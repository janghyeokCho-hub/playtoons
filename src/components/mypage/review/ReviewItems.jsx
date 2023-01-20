import { getFormattedDateForDateObject, getFormattedDateForUrl, getInitDateObject, showOneButtonPopup } from "@/common/common";
import { DATE_FORMAT_ON_URL } from "@/common/constant";
import CalendarView from "@/components/dashboard/CalendarView";
import EmptyTr from "@/components/dashboard/EmptyTr";
import MyPagination from "@/components/dashboard/MyPagination";
import { getShopReviewMineFromServer } from "@/services/mypageService";
import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Review from "./Review";

export default function ReviewItems(){
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
  const getReviewList = useCallback(async (page) => {
    const formData = new FormData();//get url 
    if( stateStartAt ){
      formData.append("startAt", stateStartAt);
    }
    if( stateEndAt ){
      formData.append("endAt", stateEndAt);
    }
    if( params.id ){
      formData.append("id", params.id);
    }
    formData.append("page", page === undefined ? 1 : page);
    
    const {status, data} = await getShopReviewMineFromServer(formData);
    
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
    getReviewList(params.page);
  };

  //==============================================================================
  // hook
  //==============================================================================
  useLayoutEffect(() => {
    if( stateStartAt && stateEndAt ){
      getReviewList(params.page);
    } else {
      setStateStartAt( params.startAt === undefined ? getInitDateObject('3month') : getFormattedDateForDateObject(params.startAt) );
      setStateEndAt( params.endAt === undefined ? getInitDateObject('now') : getFormattedDateForDateObject(params.endAt) );
    }
  }, [stateStartAt, stateEndAt, params]);
  
  //==============================================================================
  // render
  //==============================================================================

  const renderReviewList = () => {
    if( stateData === undefined || stateData?.reviews?.length === 0 ){
      return <EmptyTr text={`レビューがいません。`} />;
    }

    
    return stateData?.reviews?.map((item, index) => {
      return (
        <Review key={`review_${index}`} item={item} callback={handleDeleteItem} />
      );
    });
  };

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>レビュー期限</strong>
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
            <col className="wid5 hide-m" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>評価</th>
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
          callback={(page) => navigate(`/mypage/review/${params.id ? `${params.id}/` : '' }${getDateFromCalendar(stateStartAt)}/${getDateFromCalendar(stateEndAt)}/${page}`) }
          />
    </div>
  );
};

