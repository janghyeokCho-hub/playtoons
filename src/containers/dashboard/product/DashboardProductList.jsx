import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";
import ProductTab from "@/components/dashboard/ProductTab";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Search from "@/components/dashboard/Search";

const text = {
  see_product: "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review: "レビュ一覧",
  product_name: "商品名",
  number: "番号",
  product: "商品",
  title: "タイトル",
  price: "価格",
  date: "販売開始日",
  status: "状態",
  detail: "詳細",
  modify: "修正",
  category: "カテゴリ",
  dont_see: "非表示",
};

const tempData = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  list: [
    {
      number: "1",
      id: 23,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "sales",
        name: "販売中",
      },
    },
    {
      number: "2",
      id: 256,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "audit",
        name: "審査中",
      },
    },
    {
      number: "3",
      id: 2,
      image: tempImg1,
      title: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      date: "2022/06/11",
      status: {
        code: "not_for_sale",
        name: "販売不可",
      },
    },
  ],
};

const STATUS_TYPE = [
  {
    code: "sales",
    name: "販売中",
    color: "#2B9429",
  },
  {
    code: "audit",
    name: "審査中",
    color: "#ED8812",
  },
  {
    code: "not_for_sale",
    name: "販売不可",
    color: "#F11C0E",
  },
];

export default function DashboardProductList(props) {
  const [stateData, setStateData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const refInput = useRef();

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container dashboard typ1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "product",
    };
    dispatch(setContainer(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================
  const getStatusColor = (status) => {
    let className = "";

    switch (status.code) {
      default:
        className = "cl-sell";
        break;
      case "audit":
        className = "cl-ing";
        break;
      case "not_for_sale":
        className = "cl-non";
        break;
    } //switch

    return className;
  };
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
  const handleSearch = (page) => {
    console.log("handleChange", page);
  };

  const handleItemClick = (e) => {
    const no = e.target.getAttribute("data-id");

    // navigate("/dashboard/series/detail/" + no);
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderProductList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs2">
            <div className="cx_thumb ">
              <span>
                <Image hash={item.image} alt={"cover iamge"} />
              </span>
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number3">{item.price}</td>
          <td className="td_text1">
            <span className="view-m">{text.category}：</span>
            {item.date}
          </td>
          <td className={`td_txt3 cl-sell ${getStatusColor(item.status)}`}>
            <span className="view-m">{text.status}</span>
            {item.status.name}
          </td>
          <td className="td_btns2 ty1">
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/detail/${item.id}`}
            >
              {text.detail}
            </Link>
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/edit/${item.id}`}
            >
              {text.modify}
            </Link>
            <div
              className="btn-pk s blue2"
              data-id={item.id}
              onClick={handleItemClick}
            >
              {text.dont_see}
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
    // refInput.current.setStatusInInput({type: INPUT_STATUS.DEFAULT, error: "error"});
  }, []);

  return (
    <div className="contents">
      <ProductTab pathname={"/dashboard/product"} />

      <div className="inr-c">
        <div className="hd_titbox2">
          <Search
            className={"inp_txt sch"}
            placeholder={text.product_name}
            onClick={handleSearch}
          />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderProductList()}</tbody>
          </table>
        </div>

        <Pagination className={""} meta={stateData?.meta} callback={() => {}} />
      </div>
    </div>
  );
}
