import React, { useState, useEffect, useRef, useCallback } from "react";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import Container from "@/components/dashboard/Container";
import Calendar from "@/components/dashboard/Calendar";
import Select from "@/components/dashboard/Select";
import Pagination from "@/components/dashboard/Pagination";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { showModal } from "@/modules/redux/ducks/modal";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";

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
      image: tempImg1,
      title: "ロマンスファンタジーアセット１",
      price: "1200000CP",
      date: "2022/06/11",
      amount: "32",
    },
    {
      number: "2",
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      amount: "33",
    },
    {
      number: "3",
      image: tempImg1,
      title: "ロマンスファンタジーアセット１",
      price: "1200000CP",
      date: "2022/06/11",
      amount: "23",
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

export default function DashboardSalesList(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateStartDate, setStateStartDate] = useState(undefined);
  const [stateEndDate, setStateEndDate] = useState(undefined);
  const dispatch = useDispatch();
  const refCalendarStart = useRef();
  const refCalendarEnd = useRef();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container series",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "postUpload",
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "シリーズ詳細",
      activeMenu: "dashboard",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

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
    const startDate =
      name === "start" ? date : refCalendarStart.current.getDate();
    const endDate = name === "end" ? date : refCalendarEnd.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      dispatch(
        showModal({
          title: text.error_title,
          contents: (
            <ErrorPopup
              message={"시작일은 종료일보다 클 수 없습니다."}
              buttonTitle={"確認"}
            />
          ),
        })
      );
      return false;
    }

    return true;
  };

  const handleChange = (page) => {
    console.log("handleChange", page);
  };

  const handleItemSearch = (value) => {
    console.log("ItemSearch", value.getAttribute("value"));

    setStateStartDate(value.getAttribute("value"));
    setStateEndDate("none");
  };

  const handleItemClick = (event) => {
    console.log("handleItemClick", event);
  };

  const renderSalesList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.date}</td>
          <td className="td_subject">{item.title}</td>
          <td className="td_group">{item.price}</td>
          <td className="td_txt float-right">
            <div
              className="btn-pk s blue2 w124 mt10"
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
        <div className="col flex mt2">
          <div className="dsd_search_label mr24">{text.search_period}</div>
          <Select
            name={"typeId"}
            className={"select1 dsd_search_select"}
            dataList={SEARCH_LIST}
            handleItemClick={handleItemSearch}
          />
        </div>

        <div className="col mt24 saleslist-data-col">
          <div className="mr24">
            <div className="calendar-label">{text.start_date}</div>
            <Calendar
              ref={refCalendarStart}
              name={"start"}
              type={stateStartDate}
              callback={handleClickCalendar}
            />
          </div>
          <div className="mr24">
            <div className="calendar-label">{text.end_date}</div>
            <Calendar
              ref={refCalendarEnd}
              name={"end"}
              type={stateEndDate}
              callback={handleClickCalendar}
            />
          </div>
        </div>

        {/* TODO  */}
        <div className="col mt67 ">
          <div className="dsd_sales_detail">{text.sales_detail}</div>
          <div className="dsd_date mt24">{stateData?.date}</div>
        </div>

        <div className="tbl_basic mtbl_ty1 mt24">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="" />
              <col className="" />
              <col className="" />
              <col className="" />
            </colgroup>
            <thead>
              <tr>
                <th>{text.date}</th>
                <th>{text.title}</th>
                <th>{text.money}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderSalesList()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          page={stateData?.meta.currentPage}
          itemsCountPerPage={stateData?.meta.itemsPerPage}
          totalItemsCount={stateData?.meta.totalItems}
          callback={handleChange}
        />
      </div>
    </div>
  );
}
