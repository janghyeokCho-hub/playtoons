import React, { useState, useEffect, useRef, useCallback } from "react";

import Calendar from "@/components/dashboard/Calendar";
import Select from "@/components/dashboard/Select";
import Pagination from "@/components/dashboard/MyPagination";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { showModal } from "@/modules/redux/ducks/modal";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import { showOneButtonPopup } from "@/common/common";

const text = {
  search_period: "検索期限",
  start_date: "開始日",
  end_date: "終了日",
  sales_detail: "売り上げ 詳細",
  product_name: "商品名",
  date: "日付",
  title: "項目",
  money: "金額",
  refund: "返金",
};

const tempData = {
  date: "2022/05",
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  list: [
    {
      number: "1",
      title: "ロマンスファンタジーアセット１",
      price: "1200000CP",
      date: "2022/06/11",
      amount: "32",
    },
    {
      number: "2",
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      amount: "33",
    },
  ],
};

const SEARCH_LIST = [
  {
    id: "direct",
    name: "直接入力",
  },
  {
    id: "3month",
    name: "3月",
  },
  {
    id: "1month",
    name: "1月",
  },
  {
    id: "1week",
    name: "1週",
  },
  {
    id: "1day",
    name: "1日",
  },
];

export default function DashboardSalesDetail() {
  const [stateData, setStateData] = useState(undefined);
  const [stateStartDate, setStateStartDate] = useState(undefined);
  const [stateEndDate, setStateEndDate] = useState(undefined);
  const dispatch = useDispatch();
  const refCalendarStart = useRef();
  const refCalendarEnd = useRef();

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard typ1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "product",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================

  //==============================================================================
  // api
  //==============================================================================
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
  //==============================================================================
  // event
  //==============================================================================
  const handleClickCalendar = (name, date) => {
    const startDate =
      name === "start" ? date : refCalendarStart.current.getDate();
    const endDate = name === "end" ? date : refCalendarEnd.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, '開始日は終了日より大きくできません。' );
      return false;
    }

    return true;
  };


  const handleItemSearch = (value) => {
    console.log("ItemSearch", value.getAttribute("value"));

    setStateStartDate(value.getAttribute("value"));
    setStateEndDate("none");
  };

  const handleItemClick = (event) => {
    console.log("handleItemClick", event);
  };
  //==============================================================================
  // hook & render
  //==============================================================================
  const renderSalesList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="td_txt1 ty1">{item.date}</td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number3">{item.price}</td>
          <td className="hide-m"></td>
          <td className="td_btns3">
            <div
              className="btn-pk s blue2 w124"
              data-id={item.number}
              onClick={handleItemClick}
            >
              <span>{text.refund}</span>
            </div>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    //리스트 불러오기
    // getProductList();
    setStateData(tempData);
    setStateStartDate("1month");
    setStateEndDate("none");
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        {/* mobile */}
        <div className="hd_titbox hd_mst1 bdb0 view-m">
          <h2 className="h_tit1"><span>{text.sales_detail}</span></h2>
        </div>

        <div className="hd_titbox4 pdty1">
          <div className="mb">
            <p className="h_tit3 d-ib c-black">{text.search_period}</p>
            <Select
              name={"typeId"}
              className={"select1 dsd_search_select"}
              dataList={SEARCH_LIST}
              handleItemClick={handleItemSearch}
            />
          </div>

          <div className="inp_cal">
            <div>
              <label htmlFor="calendar_first1">{text.start_date}</label>
              <Calendar
                ref={refCalendarStart}
                name={"start"}
                className={'inp_txt calendar datepicker_first'}
                popupClassName={'l_0'}
                type={stateStartDate}
                callback={handleClickCalendar}
                />
            </div>
            <div>
              <label htmlFor="calendar_last1">{text.end_date}</label>
              <Calendar
                ref={refCalendarEnd}
                name={"end"}
                className={'inp_txt calendar datepicker_last'}
                popupClassName={'r_0'}
                type={stateEndDate}
                callback={handleClickCalendar}
              />
            </div>
          </div>
          
          <h2 className="h_tit1">{text.sales_detail}</h2>
          <p className="t1">{stateData?.date}</p>
          
        </div>

        <div className="tbl_basic mtbl_ty1 mt24">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid2" />
              <col className="" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th>{text.date}</th>
                <th>{text.title}</th>
                <th>{text.money}</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderSalesList()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          meta={stateData?.meta}
          callback={() => {  }}
        />
      </div>
    </div>
  );
}
